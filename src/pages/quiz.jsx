import React, { useState } from "react";
import "./quiz.css";

const quizData = [
  {
    question: "What is a simple way to reduce stress?",
    options: ["Deep breathing", "Ignoring it", "Overthinking", "Avoiding sleep"],
    answer: "Deep breathing",
  },
  {
    question: "Which activity helps improve mental health?",
    options: ["Regular exercise", "Overworking", "Skipping meals", "Staying indoors all day"],
    answer: "Regular exercise",
  },
  {
    question: "How many hours of sleep are recommended for a healthy mind?",
    options: ["4-5 hours", "6-8 hours", "9-10 hours", "2-3 hours"],
    answer: "6-8 hours",
  },
  {
    question: "What is a good way to cope with anxiety?",
    options: ["Meditation", "Caffeine", "Suppressing emotions", "Isolating yourself"],
    answer: "Meditation",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption("");
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Mental Health Quiz</h1>
      {!showResult ? (
        <div className="quiz-question-container">
          <h2>{quizData[currentQuestion].question}</h2>
          <ul className="quiz-options">
            {quizData[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                className={`quiz-option ${selectedOption === option ? "selected" : ""}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <button className="quiz-next-button" onClick={handleNext} disabled={!selectedOption}>
            {currentQuestion === quizData.length - 1 ? "See Results" : "Next"}
          </button>
        </div>
      ) : (
        <div className="quiz-result">
          <h2>Your Score: {score} / {quizData.length}</h2>
          <p>{score >= 3 ? "Great job! Keep prioritizing your mental health. 😊" : "Keep learning and take care of yourself! 💙"}</p>
          <h3>
            {score < 2 ? "You might benefit from speaking with a therapist. Seeking support is a strong and positive step! 💙" : ""}
          </h3>
          <button className="quiz-restart-button" onClick={restartQuiz}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;