
import React from 'react'
import Quiz from './quiz'

const Result = (props) => {
  return (
    <div className='result-container'>
        <h2>Kết quả: </h2>
        <p className='result'>Bạn đã trả lời đúng {props.score}/{props.length} câu 👏👏👏</p>
        <div className='result-Btn-Container'>
            <button onClick={props.lookBack}>Xem lại</button>
            <button onClick={props.restartQuiz}>Làm lại</button>
        </div>
    </div>
  )
}

export default Result