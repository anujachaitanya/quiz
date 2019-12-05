let { stdin, stdout } = process;
let questions = require("../questions.json");
let totalCorrectAnswers = 0;

const setTimerForCurrentQue = () => {
  return setTimeout(() => {
    stdout.write("TIME UP...\n");
    stdin.emit("data");
  }, 15000);
};

const displayQuestion = questions => {
  stdout.write(`\nQuestion:  ${questions.question}\n`);
  stdout.write(`a. ${questions.options[0]}\n`);
  stdout.write(`b. ${questions.options[1]}\n`);
  stdout.write(`c. ${questions.options[2]}\n`);
  stdout.write(`d. ${questions.options[3]}\n`);
};

const validateAnswer = function(question, answer) {
  const correctAnswer = `${question["answer"]}\n`;
  return answer == correctAnswer;
};

const setQuestion = function(count) {
  displayQuestion(questions[count]);
  let timer = setTimerForCurrentQue();
  return timer;
};

function resultForLastQuestion(answer, count) {
  let result = "Oops ! Next Question";
  if (validateAnswer(questions[count], answer)) {
    result = "GREAT...!";
    totalCorrectAnswers += 1;
  }
  stdout.write(`\n${result}\n`);
}

const main = function() {
  let count = 0;
  let timerForQuestion = setQuestion(count);
  stdin.on("data", answer => {
    answer && resultForLastQuestion(answer, count);
    clearTimeout(timerForQuestion);
    count += 1;
    timerForQuestion = setQuestion(count);
  });
};

process.on("uncaughtException", () => {
  stdout.write("QUIZ OVER..\n");
  process.exit(0);
});

process.on("exit", () => {
  stdout.write(`YOUR SCORE : ${totalCorrectAnswers * 5}/30 \n`);
});

main();
