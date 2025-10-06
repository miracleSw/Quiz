import React, { useState } from "react";
import { useEffect } from "react";
import Result from "./Result";

const quiz = [
  {
    question: "Con gì đập thì sống, để yên thì chết?",
    options: ["Con tim", "Con cá", "Con ếch", "Con ngựa"],
    answer: "Con tim"
  },
  {
    question: "Cây gì không lá, không hoa, không quả, không cành?",
    options: ["Cây cột điện", "Cây chổi", "Cây gậy", "Cây cầu"],
    answer: "Cây cột điện"
  },
  {
    question: "Da trắng mịn màng, ruột trong lại đỏ. Là quả gì?",
    options: ["Quả mận", "Quả thanh long", "Quả đào", "Quả dưa hấu"],
    answer: "Quả dưa hấu"
  },
  {
    question: "Con gì ăn lửa với nước, đẻ trứng bằng sắt?",
    options: ["Tàu hỏa", "Ô tô", "Máy bay", "Xe máy"],
    answer: "Tàu hỏa"
  },
  {
    question: "Vừa bằng hạt gạo, đi khắp thế gian là gì?",
    options: ["Cái đầu", "Con mắt", "Cái tai", "Cái mũi"],
    answer: "Con mắt"
  },
  {
    question: "Càng kéo càng ngắn là gì?",
    options: ["Cái dây thun", "Điếu thuốc lá", "Cây nến", "Sợi chỉ"],
    answer: "Điếu thuốc lá"
  },
  {
    question: "Không ai cắt mà ngắn, không ai gọt mà tròn. Là gì?",
    options: ["Cái bóng", "Mặt trăng", "Cái bánh", "Cái nồi"],
    answer: "Mặt trăng"
  },
  {
    question: "Không chân mà đi, không miệng mà nói, không tai mà nghe?",
    options: ["Điện thoại", "Ti vi", "Sóng radio", "Gió"],
    answer: "Điện thoại"
  },
  {
    question: "Càng vo càng nhỏ là gì?",
    options: ["Cục đất", "Hạt gạo", "Quả bóng", "Cục bông"],
    answer: "Hạt gạo"
  },
  {
    question: "Càng đông càng lạnh là gì?",
    options: ["Băng", "Nước", "Gió mùa", "Tủ lạnh"],
    answer: "Băng"
  },
  {
    question: "Không ăn, không uống mà lớn nhanh như thổi là gì?",
    options: ["Bóng bay", "Cây tre", "Em bé", "Cái bánh"],
    answer: "Bóng bay"
  },
  {
    question: "Trên hang dưới nước, cánh đỏ đuôi xanh, là con gì?",
    options: ["Con chuồn chuồn", "Con cá chép", "Con chim én", "Con bướm"],
    answer: "Con chuồn chuồn"
  },
  {
    question: "Đầu tròn, mình thẳng, ruột rỗng, mồm kêu, tay múa. Là gì?",
    options: ["Cái sáo", "Cây nến", "Cái ống hút", "Cái chai"],
    answer: "Cái sáo"
  },
  {
    question: "Vừa bằng hạt đỗ, ăn giỗ cả làng. Là gì?",
    options: ["Con muỗi", "Con rệp", "Con ruồi", "Con kiến"],
    answer: "Con muỗi"
  },
  {
    question: "Bốn chân chụm lại một chỗ, đầu đội mâm đồng. Là gì?",
    options: ["Cái bàn", "Cái ghế", "Cái kiềng", "Cái nồi"],
    answer: "Cái kiềng"
  }
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

  if(isQuizEnded) return <Result score={score} restartQuiz={restartQuiz} lookBack={lookBack} length={quiz.length}/>

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
