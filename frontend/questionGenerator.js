// ===============================================
//  MATH CALC GAME — QUESTION GENERATOR (FINAL)
//  Includes: +, -, ×, ÷, √ with your custom rules
// ===============================================

// -----------------------------------------------
// Random Integer Generator
// -----------------------------------------------
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// -----------------------------------------------
// Digit-based Random Generator  (for B in A×B)
// -----------------------------------------------
function randDigits(digits) {
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return randInt(min, max);
}

// -----------------------------------------------
// Truncate to 2 decimals (never round)
// -----------------------------------------------
function trunc2(x) {
  return Math.floor(x * 100) / 100;
}

// -----------------------------------------------
// Allowed denominator set for DIVISION
// (No 10 allowed)
// -----------------------------------------------
const DIV_DENOMS = [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19];

// -----------------------------------------------
// MODE CONFIGURATION (ranges only)
// Rules applied in generator below
// -----------------------------------------------
const MODE_RANGE = {
  easy: { min: 1, max: 10 },
  medium: { min: 10, max: 100 },
  hard: { min: 100, max: 1000 },
  pro: { min: 1000, max: 10000 },
  legend: { min: 10000, max: 100000 },
};

// -----------------------------------------------
// OPERATION SET (same for all modes)
// -----------------------------------------------
const OPERATIONS = ["+", "-", "*", "/", "sqrt"];

// -----------------------------------------------
// Perfect square generators for E, M, H
// -----------------------------------------------

// Easy sqrt → perfect squares → 1-digit answer (1–9)
function generateEasySqrt() {
  const answer = randInt(1, 9); // 1-digit
  return {
    question: `√${answer * answer}`,
    answer: answer,
  };
}

// Medium sqrt → perfect squares → 10–99
function generateMediumSqrt() {
  const answer = randInt(10, 99); // 2-digit
  return {
    question: `√${answer * answer}`,
    answer: answer,
  };
}

// Hard sqrt → perfect squares → 100–999
function generateHardSqrt() {
  const answer = randInt(100, 999); // 3-digit
  return {
    question: `√${answer * answer}`,
    answer: answer,
  };
}

// -----------------------------------------------
// Pro & Legend sqrt → decimal sqrt (truncate 2 d.p.)
// No perfect squares
// -----------------------------------------------
function generateDecimalSqrt(min, max) {
  let num;
  while (true) {
    num = randInt(min, max);
    let root = Math.sqrt(num);
    if (root % 1 !== 0) break; // ensure NOT perfect square
  }

  const ans = trunc2(Math.sqrt(num)); // truncate to 2 decimals

  return {
    question: `√${num}`,
    answer: ans,
  };
}

// -----------------------------------------------
// Division generator with custom denominator set
// -----------------------------------------------
function generateDivision(mode, modeRange) {
  const A = randInt(modeRange.min, modeRange.max);

  let denomSet;

  // E, M, H → small denominators only
  if (mode === "easy" || mode === "medium" || mode === "hard") {
    denomSet = [2, 3, 4, 5, 6, 7, 8, 9];
  }
  // Pro, Legend → full set
  else {
    denomSet = DIV_DENOMS;
  }

  const B = denomSet[randInt(0, denomSet.length - 1)];
  const ans = trunc2(A / B);

  return {
    question: `${A} ÷ ${B}`,
    answer: ans,
  };
}

// -----------------------------------------------
// Multiplication generator with special B rules
// -----------------------------------------------
function generateMultiplication(mode, modeRange) {
  const A = randInt(modeRange.min, modeRange.max);

  let digitsB = 1; // default

  if (mode === "easy") digitsB = 1;
  if (mode === "medium") digitsB = 1;
  if (mode === "hard") digitsB = 2;
  if (mode === "pro") digitsB = 3;
  if (mode === "legend") digitsB = 4;

  const B = randDigits(digitsB);

  return {
    question: `${A} × ${B}`,
    answer: A * B,
  };
}

// -----------------------------------------------
// +, -, mixed generators
// -----------------------------------------------
function generateAdd(modeRange) {
  const A = randInt(modeRange.min, modeRange.max);
  const B = randInt(modeRange.min, modeRange.max);
  return { question: `${A} + ${B}`, answer: A + B };
}

function generateSub(modeRange) {
  const A = randInt(modeRange.min, modeRange.max);
  const B = randInt(modeRange.min, modeRange.max);
  return { question: `${A} - ${B}`, answer: A - B };
}

// -----------------------------------------------
// √ generator wrapper (mode-based)
// -----------------------------------------------
function generateSqrt(mode) {
  if (mode === "easy") return generateEasySqrt();
  if (mode === "medium") return generateMediumSqrt();
  if (mode === "hard") return generateHardSqrt();
  if (mode === "pro") return generateDecimalSqrt(10000, 1000000);
  if (mode === "legend") return generateDecimalSqrt(1000000, 100000000);
}

// -----------------------------------------------
// MAIN: Generate One Question
// -----------------------------------------------
function generateQuestion(mode) {
  const range = MODE_RANGE[mode];
  const op = OPERATIONS[randInt(0, OPERATIONS.length - 1)];

  if (op === "+") return generateAdd(range);
  if (op === "-") return generateSub(range);
  if (op === "*") return generateMultiplication(mode, range);
  if (op === "/") return generateDivision(mode, range);
  if (op === "sqrt") return generateSqrt(mode);
}

// -----------------------------------------------
// DAILY PUZZLE (4 from each mode)
// -----------------------------------------------
function generateDailyPuzzle() {
  const MODES = ["easy", "medium", "hard", "pro", "legend"];
  const list = [];

  MODES.forEach((m) => {
    for (let i = 0; i < 4; i++) {
      list.push(generateQuestion(m));
    }
  });

  return list; // 20 questions
}

// -----------------------------------------------
window.questionGenerator = {
  generateQuestion,
  generateDailyPuzzle,
};
