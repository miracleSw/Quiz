import React, { useState } from "react";
import { useEffect } from "react";
import Result from "./Result";

const quiz = [
  {
    question: "Thủ đô của Việt Nam là gì?",
    options: ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Huế"],
    answer: "Hà Nội",
  },
  {
    question: "Hệ điều hành nào sau đây được phát triển bởi Apple?",
    options: ["Windows", "Android", "iOS", "Linux"],
    answer: "iOS",
  },
  {
    question: "Trong toán học, π (pi) xấp xỉ bằng bao nhiêu?",
    options: ["2.14", "3.14", "4.13", "3.41"],
    answer: "3.14",
  },
  {
    question: "Nguyên tố hóa học nào có ký hiệu là O?",
    options: ["Oxy", "Vàng", "Bạc", "Sắt"],
    answer: "Oxy",
  },
  {
    question: "Ai là tác giả của truyện 'Dế Mèn phiêu lưu ký'?",
    options: ["Nam Cao", "Tô Hoài", "Ngô Tất Tố", "Nguyễn Nhật Ánh"],
    answer: "Tô Hoài",
  },
  {
    question: "Quốc gia nào có diện tích lớn nhất thế giới?",
    options: ["Trung Quốc", "Mỹ", "Nga", "Canada"],
    answer: "Nga",
  },
  {
    question: "Trái đất quay quanh Mặt Trời mất bao lâu?",
    options: ["24 giờ", "1 tháng", "365 ngày", "7 ngày"],
    answer: "365 ngày",
  },
  {
    question: "Ngôn ngữ lập trình nào sau đây chạy trên trình duyệt web?",
    options: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript",
  },
  {
    question: "Thành phần chính của nước là gì?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    answer: "H2O",
  },
  {
    question: "Facebook được sáng lập bởi ai?",
    options: ["Elon Musk", "Bill Gates", "Mark Zuckerberg", "Steve Jobs"],
    answer: "Mark Zuckerberg",
  },
  {
    question: "Loài vật nào được mệnh danh là chúa sơn lâm?",
    options: ["Sư tử", "Hổ", "Báo", "Gấu"],
    answer: "Hổ",
  },
  {
    question: "Trái tim con người có bao nhiêu ngăn?",
    options: ["2", "3", "4", "5"],
    answer: "4",
  },
];

const Quiz = () => {
  const [optionSelected, setOptionSelected] = useState("");

  const [userAnswer, setUserAnswer] = useState(
    new Array(quiz.length).fill(undefined)
  );

  const [score, setScore] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [isQuizEnded, setIsQuizEnded] = useState(false);

  const handleSelectedOption = (option, index) => {
    setOptionSelected(
      option === quiz[currentQuestion].answer ? ("chính xác", setScore((c) => c + 1)) : "không chính xác"
    );
    const newUser = [...userAnswer];
    newUser[currentQuestion] = index;
    setUserAnswer(newUser);
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((c) => c - 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion((c) => c + 1);
    }
    else{
      setIsQuizEnded(true);
    }
  };

  useEffect(() => {
    const answer = Number(userAnswer[currentQuestion]);
    const pastOptionSelected = quiz[currentQuestion].options[answer];
      if (pastOptionSelected !== undefined) {
        setOptionSelected(pastOptionSelected);
      } else {
        setOptionSelected("");
      }
  }, [currentQuestion, userAnswer])

  const restartQuiz = () => {
    setOptionSelected("");
    setUserAnswer(new Array(quiz.length).fill(undefined));
    setScore(0);
    setCurrentQuestion(0);
    setIsQuizEnded(false);
  }

  const lookBack = () => {
    setCurrentQuestion(0);
    setIsQuizEnded(false);
  }

  if(isQuizEnded) return <Result score={score} restartQuiz={restartQuiz} lookBack={lookBack}/>

  return (
    <div className="quiz-container">
      <h2>Câu {currentQuestion + 1}:</h2>
      <p className="question">{quiz[currentQuestion].question}</p>
      <div className="options-container">
        {quiz[currentQuestion].options.map((q, i) => (
        <button
          key={q}
          className={`option ${
            optionSelected && q === optionSelected
              ? q === quiz[currentQuestion].answer
                ? "correct"
                : "incorrect"
              : ""
          }`}
          disabled={!!optionSelected && q !== optionSelected}
          onClick={() => handleSelectedOption(q, i)}
        >
          {q}
        </button>
      ))}
      </div>

      {optionSelected ? (optionSelected === quiz[currentQuestion].answer ? (<p className="ans-correct">Câu trả lời chính xác</p>) : (<p className="ans-wrong">Câu trả lời không chính xác</p>)) : ""}

      <div className="nav-buttons">
        <button disabled={currentQuestion === 0} onClick={previousQuestion}>Quay lại</button>
        <button disabled={!optionSelected} onClick={nextQuestion}>{currentQuestion === length - 1 ? "Hoàn thành" : "Kế tiếp"}</button>
      </div>
    </div>
  );
};

export default Quiz;
