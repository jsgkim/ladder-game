const $h1 = document.querySelector('#h1');
const $participantsNumForm = document.querySelector('#participantsNumForm');
const $participantsNum = document.querySelector('#participantsNum');
const $participantsNumButton = document.querySelector('#participantsNumButton');
const $getNamesForm = document.querySelector('#getNamesForm');
const $participantsWrapper = document.querySelector('#participantsWrapper');
const $legsWrapper = document.querySelector('#legsWrapper');
const $prizesWrapper = document.querySelector('#prizesWrapper');
const $startButton = document.querySelector('#startButton');
const $resultButton = document.querySelector('#resultButton');
const $backButton = document.querySelector('#backButton');
const $result = document.querySelector('.result');
const participants = [];
const prizes = [];
const participantsName = ['영수', '아인', '민지', '지은', '희원', '국진', '유경'];
const prizesName = ['딸기', '사과', '바나나', '블루베리', '파인애플', '체리', '망고'];
const rows = [];
let participantsNum;
let row = 5;
let col;

function onSubmit(event) {
  event.preventDefault();
  $participantsWrapper.innerHTML = '';
  $prizesWrapper.innerHTML = '';
  $legsWrapper.innerHTML = '';
  $result.innerHTML = '';
  $backButton.style.display = 'none';
  $resultButton.style.display = 'none';
  $startButton.style.display = 'block';
  participantsNum = parseInt(event.target.participantsNum.value); //event.target[''].value
  for (let i = 0; i < participantsNum; i++) {
    const participant = document.createElement('input');
    participant.value = participantsName[i];
    // console.log(participantsName[i]);
    participant.id = 'participant' + i;
    const prize = document.createElement('input');
    prize.value = prizesName[i];
    prize.id = 'prize' + i;
    $participantsWrapper.append(participant);
    $prizesWrapper.append(prize);
  }
  drawTable();
}
$participantsNumForm.addEventListener('submit', onSubmit);

function start(event) {
  event.preventDefault();
  const parInputs = $participantsWrapper.querySelectorAll('input');
  const priInputs = $prizesWrapper.querySelectorAll('input');
  parInputs.forEach((e, i) => {
    participants[i] = e.value;
  });
  priInputs.forEach((e, i) => {
    prizes[i] = e.value;
  });
  // console.log(participants);
  // console.log(prizes);
  if (prizes[0]) {
    $startButton.style.display = 'none';
    $resultButton.style.display = 'block';
    drawLegs();
    legFunc();
  }
}
$getNamesForm.addEventListener('submit', start);

function drawTable() {
  const $table = document.createElement('table');
  col = participantsNum * 2 - 1;
  for (let i = 0; i < row; i++) {
    const cells = [];
    const $tr = document.createElement('tr');
    for (let j = 0; j < col; j++) {
      const $td = document.createElement('td');
      $tr.append($td);
      cells.push($td);
    }
    $table.append($tr);
    rows.push(cells);
  }
  $legsWrapper.append($table);
  cleanLegs();
}

function drawLegs() {
  let percent = 0.7;
  rows.forEach((row) => {
    row.forEach((td) => {
      let cellIndex = td.cellIndex;
      if (cellIndex % 2 === 1) {
        if (Math.random() < percent) {
          td.classList.remove('empty');
          td.classList.add('showLeg');
        }
        if (cellIndex >= 3 && row[cellIndex - 2].className === 'showLeg') {
          td.classList.remove('showLeg');
          td.classList.add('empty');  
        }
      }
    })
  })
}

function legFunc() {
  const legTds = document.querySelectorAll('td.showLeg');
  legTds.forEach((td) => {
    const cellIndex = td.cellIndex;
    const inputIndex = (cellIndex - 1) / 2;
    prizes.splice(inputIndex, 2, prizes[inputIndex + 1], prizes[inputIndex]);
    // console.log(prizes);
  });
}

function showResult() {
  for (let i = 0; i < participantsNum; i++) {
    $result.append(
      document.createElement('br'),
      `${participants[i]} ﻿→ ${prizes[i]}`
    );
  }
  $resultButton.style.display = 'none';
  $backButton.style.display = 'block';
}
$resultButton.addEventListener('click', showResult);

function goBack() {
  const parInputs = $participantsWrapper.querySelectorAll('input');
  const priInputs = $prizesWrapper.querySelectorAll('input');
  // parInputs.forEach((e) => {
  //   e.value = '';
  // });
  // priInputs.forEach((e) => {
  //   e.value = '';
  // });
  $participantsNum.value = '';
  $result.textContent = '';
  $backButton.style.display = 'none';
  $startButton.style.display = 'block';
  cleanLegs();
}
$backButton.addEventListener('click', goBack);

function cleanLegs() {
  rows.forEach((row) => {
    row.forEach((td) => {
      let cellIndex = td.cellIndex;
      if (cellIndex % 2 === 1) {
        td.classList.remove('showLeg');
        td.classList.add('empty');
      }
    })
  })
}