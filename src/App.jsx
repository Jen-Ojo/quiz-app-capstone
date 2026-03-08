import { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const fetchQuestions = async () => {
    try {
      const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      const data = await res.json();
      setQuestions(data.results);
    } catch (err) {
      console.error("Fetch failed", err);
      setQuestions([
        {
          question: "Sample: 2 + 2 = ?",
          correct_answer: "4",
          incorrect_answers: ["3", "5", "22"],
        },
      ]);
    }
  };

  useEffect(() => {
    if (started) fetchQuestions();
  }, [started]);

  const handleAnswer = (answer) => {
    if (answer === questions[current].correct_answer) setScore(score + 1);
    if (current + 1 < questions.length) setCurrent(current + 1);
    else setFinished(true);
  };

  if (!started)
    return (
      <div>
        <h1>Quiz App 🎯</h1>
        <button onClick={() => setStarted(true)}>Start Quiz</button>
      </div>
    );

  if (finished)
    return (
      <div>
        <h1>Quiz Finished!</h1>
        <p>
          Score: {score} / {questions.length}
        </p>
        <button
          onClick={() => {
            setCurrent(0);
            setScore(0);
            setFinished(false);
            setStarted(false);
          }}
        >
          Restart
        </button>
      </div>
    );

  if (!questions.length) return <p>Loading...</p>;

  const question = questions[current];
  const answers = [...question.incorrect_answers, question.correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <div>
      <h2>
        Question {current + 1} of {questions.length}
      </h2>
      <h3 dangerouslySetInnerHTML={{ __html: question.question }} />
      {answers.map((ans, index) => (
        <button key={index} onClick={() => handleAnswer(ans)} dangerouslySetInnerHTML={{ __html: ans }} />
      ))}
    </div>
  );
}

export default App;
