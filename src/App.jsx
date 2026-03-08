const fetchQuestions = async () => {
  try {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple"
    );
    const data = await res.json();
    setQuestions(data.results);
  } catch (err) {
    console.error("Failed to fetch questions:", err);
    setQuestions([
      {
        question: "Sample Question: 2 + 2 = ?",
        correct_answer: "4",
        incorrect_answers: ["3", "5", "22"],
      },
      {
        question: "Sample Question: Capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["London", "Berlin", "Madrid"],
      },
    ]);
  }
};
