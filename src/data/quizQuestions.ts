export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { question: "Who built the ark?", options: ["Moses", "Noah", "David", "Abraham"], correctIndex: 1 },
  { question: "How many days did God take to create the world?", options: ["5", "6", "7", "10"], correctIndex: 1 },
  { question: "Who was swallowed by a great fish?", options: ["Jonah", "Peter", "Paul", "Daniel"], correctIndex: 0 },
  { question: "What is the first book of the Bible?", options: ["Exodus", "Genesis", "Leviticus", "Psalms"], correctIndex: 1 },
  { question: "Who killed Goliath?", options: ["Saul", "Jonathan", "David", "Samuel"], correctIndex: 2 },
  { question: "How many apostles did Jesus have?", options: ["10", "11", "12", "14"], correctIndex: 2 },
  { question: "Who was the first man created by God?", options: ["Noah", "Adam", "Moses", "Abraham"], correctIndex: 1 },
  { question: "What did Jesus turn water into?", options: ["Milk", "Oil", "Wine", "Honey"], correctIndex: 2 },
  { question: "Who led the Israelites out of Egypt?", options: ["Joshua", "Aaron", "Moses", "David"], correctIndex: 2 },
  { question: "Where was Jesus born?", options: ["Nazareth", "Jerusalem", "Bethlehem", "Galilee"], correctIndex: 2 },
  { question: "Who betrayed Jesus?", options: ["Peter", "Judas", "Thomas", "John"], correctIndex: 1 },
  { question: "How many books are in the Bible?", options: ["39", "52", "66", "73"], correctIndex: 2 },
  { question: "What was the name of Moses' brother?", options: ["Aaron", "Levi", "Caleb", "Joshua"], correctIndex: 0 },
  { question: "Who wrote most of the Psalms?", options: ["Solomon", "Moses", "David", "Samuel"], correctIndex: 2 },
  { question: "What is the last book of the Bible?", options: ["Jude", "Revelation", "Malachi", "Acts"], correctIndex: 1 },
  { question: "Who was thrown into the lion's den?", options: ["David", "Elijah", "Daniel", "Samson"], correctIndex: 2 },
  { question: "What are the Ten Commandments also known as?", options: ["The Decalogue", "The Torah", "The Beatitudes", "The Covenant"], correctIndex: 0 },
  { question: "Who was the mother of Jesus?", options: ["Martha", "Mary", "Elizabeth", "Ruth"], correctIndex: 1 },
  { question: "What river was Jesus baptized in?", options: ["Nile", "Euphrates", "Jordan", "Tigris"], correctIndex: 2 },
  { question: "How many plagues were sent on Egypt?", options: ["7", "9", "10", "12"], correctIndex: 2 },
];

export function getRandomQuestions(count: number = 10): QuizQuestion[] {
  const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
