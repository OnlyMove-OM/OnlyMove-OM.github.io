let startTime = null;
let currentSnippet = null;

async function loadSnippet() {
  const response = await fetch("snippets.json");
  const snippets = await response.json();

  // 랜덤 선택
  const randomIndex = Math.floor(Math.random() * snippets.length);
  currentSnippet = snippets[randomIndex];

  document.getElementById("snippet").textContent = currentSnippet.code;
  document.getElementById("input").value = "";
  document.getElementById("result").innerHTML = "";

  startTime = null;
}

function checkTyping() {
  const input = document.getElementById("input").value;

  if (!startTime) {
    alert("먼저 입력을 시작해야 합니다!");
    return;
  }

  // 정확도 계산
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === currentSnippet.code[i]) correct++;
  }
  const accuracy = ((correct / currentSnippet.code.length) * 100).toFixed(2);

  // 시간 (초)
  const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

  // 결과 문자열 (색상 강조)
  let highlighted = "";
  for (let i = 0; i < currentSnippet.code.length; i++) {
    const char = currentSnippet.code[i];
    if (i < input.length) {
      if (input[i] === char) {
        highlighted += `<span style="color:green">${char}</span>`;
      } else {
        highlighted += `<span style="color:red">${char}</span>`;
      }
    } else {
      highlighted += char; // 아직 안 친 부분
    }
  }

  document.getElementById("result").innerHTML =
    `걸린 시간: ${timeTaken}초<br>` +
    `정확도: ${accuracy}%<br>` +
    `<strong>설명:</strong> ${currentSnippet.desc}<br><br>` +
    `<strong>정답 코드:</strong><br><pre>${highlighted}</pre>`;
}

// 입력창 이벤트
const inputBox = document.getElementById("input");

inputBox.addEventListener("keydown", function(e) {
  // 엔터 → 오타 체크
  if (e.key === "Enter") {
    e.preventDefault();
    checkTyping();
    return;
  }

  // 입력 시작 시간 기록
  if (!startTime) startTime = Date.now();

  // 괄호/따옴표 자동완성
  const start = this.selectionStart;
  const end = this.selectionEnd;

  let insertChar = "";
  if (e.key === "(") insertChar = ")";
  else if (e.key === "[") insertChar = "]";
  else if (e.key === "{") insertChar = "}";
  else if (e.key === "'") insertChar = "'";
  else if (e.key === '"') insertChar = '"';

  if (insertChar) {
    e.preventDefault();
    const value = this.value;
    this.value = value.slice(0, start) + e.key + insertChar + value.slice(end);
    this.selectionStart = this.selectionEnd = start + 1;
  }
});

// 첫 로딩 시 구문 불러오기
window.onload = loadSnippet;
