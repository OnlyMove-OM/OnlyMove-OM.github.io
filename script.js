let startTime = null;
let currentSnippet = "";

async function loadSnippet() {
  const response = await fetch("snippets.json");
  const snippets = await response.json();

  // 랜덤 선택
  const randomIndex = Math.floor(Math.random() * snippets.length);
  currentSnippet = snippets[randomIndex];

  document.getElementById("snippet").textContent = currentSnippet;
  document.getElementById("input").value = "";
  document.getElementById("result").textContent = "";

  startTime = null;
}

function checkTyping() {
  const input = document.getElementById("input").value;

  // 시간 측정 시작
  if (!startTime) startTime = Date.now();

  // 정확도 계산
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === currentSnippet[i]) correct++;
  }
  const accuracy = ((correct / currentSnippet.length) * 100).toFixed(2);

  // 속도 (WPM) 계산
  const timeTaken = (Date.now() - startTime) / 60000; // 분 단위
  const wpm = ((input.length / 5) / timeTaken).toFixed(2);

  document.getElementById("result").textContent =
    `속도: ${wpm} WPM | 정확도: ${accuracy}%`;
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
