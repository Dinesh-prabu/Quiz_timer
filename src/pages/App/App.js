import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ResultScreen from "./ResultScreen/ResultScreen";
import { question_json } from '../../config/data';
import "./App.css";

export default function App() {
    const form = useForm();
    const total_question = question_json.length;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [userScore, setUserScore] = useState(0);
    const [result, setResult] = useState(false);
    const [timer, setTimer] = useState(60);

    const handleNext = () => {
        if (total_question > currentIndex + 1) {
            setCurrentIndex(currentIndex + 1);
            setTimer(60);
            setStart(true);
        } else {
            alert("no more question");
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            alert("no more question");
        }
    };

    const handleFirst = () => {
        setCurrentIndex(0);
    };

    const handleLast = () => {
        console.log(currentIndex, total_question);
        setCurrentIndex(total_question - 1);
    };

    const handleOnChangeOption = (e, value, index) => {
        form.setValue(`answer[qstn_${currentIndex}]`, value);
        console.log(value, index, "option", e);
        setAnswers([
            ...answers,
            ...[{ qstn_no: index + 1, selected_option: value }]
        ]);
        setStart(false);
    };

    const handleSubmit = () => {
        const values = form.getValues();

        let score = 0;
        if (values.answer) {
            question_json.forEach((qstn, index) => {
                if (
                    values.answer[`qstn_${index}`] &&
                    values.answer[`qstn_${index}`].toString() ===
                    question_json[index].answer &&
                    question_json[index].answer.toString()
                ) {
                    console.log(values, "val", qstn.answer);
                    score = score + 1;
                }
            });
        }
        console.log(score, "score");
        setUserScore(score);
        setResult(true);
    };

    const [start, setStart] = useState(true);

    useEffect(() => {
        if (start && timer > 0) {
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        } else {
            setStart(false);
        }
    }, [timer]);

    return (
        <div className="App">
            <div className="quiz-title">Quiz Application</div>
            <div className="quiz-header">ASP .NET QuiZ</div>
            <div className="question-section">
                <div>{timer}sec</div>
                <div className="question-tag">Question no: {currentIndex + 1}</div>
                <div className="question-card">
                    <div>{question_json[currentIndex].question}</div>

                    {question_json[currentIndex].option.map((f) => {
                        return (
                            <div className="option-render" key={f}>
                                <div className="options">
                                    <input
                                        type="checkbox"
                                        checked={
                                            form.getValues(`answer[qstn_${currentIndex}]`) === f
                                        }
                                        {...form.register(`answer[qstn_${currentIndex}]`)}
                                        value={f}
                                        onChange={(e) => handleOnChangeOption(e, f, currentIndex)}
                                    />
                                    <span className="option-text">{f}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="end-line"></div>
                <div className="action-cta">
                    <button onClick={() => handleFirst()}>First</button>
                    <button
                        disabled={form.getValues(`answer[qstn_${currentIndex}]`)}
                        onClick={() => handlePrev()}
                    >
                        Prev
                    </button>
                    <button onClick={() => handleNext()}>Next</button>
                    <button onClick={() => handleLast()}>Last</button>
                </div>
                <div className="pagination">
                    {[...Array(total_question)].map((x, i) => (
                        <button
                            disabled={form.getValues(`answer[qstn_${i}]`)}
                            onClick={() => setCurrentIndex(i)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <div className="end-line"></div>
                <div className="submit-quiz">
                    <button>QuiZ</button>
                    <button>Review</button>
                    <button onClick={() => handleSubmit()}>Submit Quiz</button>
                </div>
                <div>
                    {result && <ResultScreen score={userScore} total={total_question} />}
                </div>
            </div>
        </div>
    );
}
