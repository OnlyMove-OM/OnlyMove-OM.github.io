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

// 토큰 분석 함수
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

  const snippets = [];
  for (let i = 0; i < 1000; i++) {
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

    snippets.push({
      code: snippet,
      desc: desc,
      tokens: tokenize(snippet)
    });
  }
  console.log("✅ 1000개 snippets 생성 완료", snippets);
  return snippets;
}

// 페이지 시작 시 호출
loadSnippets().then(snippets => {
  // 👉 여기서 연습 로직에 연결하면 됨
});
