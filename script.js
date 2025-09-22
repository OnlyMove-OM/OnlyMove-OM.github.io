// 키워드 설명 사전
const TOKEN_DICT = {
  "for": "반복문 시작 키워드",
  "in": "멤버십/반복 연산자",
  "if": "조건문 시작 키워드",
  "else": "조건이 거짓일 때 실행되는 블록",
  "def": "함수 정의 키워드",
  "class": "클래스 정의 키워드",
  "try": "예외 처리 블록 시작",
  "except": "예외 발생 시 실행 블록",
  "with": "컨텍스트 관리 블록",
  "as": "별칭 지정 키워드",
  "return": "함수 결과 반환 키워드",
  "print": "출력 함수",
  "range": "연속된 정수 시퀀스 생성 함수",
  "int": "정수형 변환 함수",
  "open": "파일 열기 함수",
  "(": "괄호 시작",
  ")": "괄호 끝",
  "[": "리스트 시작",
  "]": "리스트 끝",
  "{": "딕셔너리/집합 시작",
  "}": "딕셔너리/집합 끝",
  ":": "블록 시작 구분자",
  "=": "값 할당 연산자",
  "+": "덧셈 연산자"
};

// 토큰 분석
function tokenize(code) {
  const tokens = {};
  const words = code
    .replace(/\n/g, " ")
    .replace(/([\(\)\[\]\{\}\:\=])/g, " $1 ")
    .split(/\s+/);

  words.forEach(word => {
    if (TOKEN_DICT[word]) {
      tokens[word] = TOKEN_DICT[word];
    }
  });
  return tokens;
}

// 랜덤 정수
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// grammar.json 불러오기
async function loadSnippets() {
  const res = await fetch("grammar.json");
  const data = await res.json();

  const tplObj = data.templates[Math.floor(Math.random() * data.templates.length)];
  const snippet = tplObj.code
    .replace("{n}", randInt(2, 10))
    .replace("{x}", randInt(1, 50))
    .replace("{y}", randInt(1, 50))
    .replace("{val}", "abc")
    .replace("{name}", "Alice");
  const desc = tplObj.desc
    .replace("{n}", randInt(2, 10))
    .replace("{x}", randInt(1, 50))
    .replace("{y}", randInt(1, 50));

  return {
    code: snippet,
    desc: desc,
    tokens: tokenize(snippet)
  };
}

// UI 동작
let targetCode = "";
let startTime = 0;

async function newPractice() {
  const snippet = await loadSnippets();
  targetCode = snippet.code;

  const targetEl = document.getElementById("target");
  targetEl.textContent = targetCode;
  hljs.highlightElement(targetEl);

  document.getElementById("result").innerHTML = "";
  document.getElementById("input").value = "";

  startTime = Date.now();
  return snippet;
}

document.getElementById("check").addEventListener("click", async () => {
  const input = document.getElementById("input").value;
  const endTime = Date.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // 초 단위

  let resultEl = document.getElementById("result");

  if (input.trim() === targetCode.trim()) {
    resultEl.innerHTML = `
      ✅ 정답! <br>
      ⏱️ 걸린 시간: ${timeTaken}초
    `;
  } else {
    resultEl.innerHTML = `
      ❌ 오타 발생! 다시 시도하세요.
    `;
  }
});

// 시작 시 문제 로드
newPractice();
