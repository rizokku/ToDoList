import Chance from "chance";

const chance = new Chance();

const actions = [
  "do",
  "buy",
  "check",
  "meet with",
  "find out about",
  "schedule",
  "prepare",
  "complete",
  "send",
  "conduct",
];

const objects = [
  "report",
  "project",
  "meeting",
  "letter",
  "call",
  "order",
  "purchase",
  "document",
  "analysis",
  "testing",
];

const modifiers = ["today", "tomorrow", "this week", "soon", "next month"];

const getRandomEnglishSentence = (wordCount) => {
  const sentenceParts = [];
  for (let i = 0; i < wordCount; i++) {
    if (i % 2 === 0) {
      sentenceParts.push(chance.pickone(actions));
    } else {
      if (i < wordCount - 1) {
        sentenceParts.push(chance.pickone(objects));
      } else {
        sentenceParts.push(chance.pickone(modifiers));
      }
    }
  }
  return sentenceParts.join(" ");
};

export const generateTodos = (n = 1000) => {
  const todos = [];
  for (let i = 0; i < n; i++) {
    todos.push(generateTodo());
  }
  return todos;
};

const generateTodo = () => ({
  id: chance.guid(),
  done: chance.bool({ likelihood: 30 }),
  name: getRandomEnglishSentence(3),
  description: getRandomEnglishSentence(5),
  createdAt: new Date().toLocaleString(),
  severity: chance.pickone(["low", "middle", "high"]),
});
