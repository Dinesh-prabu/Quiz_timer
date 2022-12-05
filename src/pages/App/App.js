import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from './Header/Header';
import ResultScreen from "./ResultScreen/ResultScreen";
import { question_json } from '../../config/data';
import "./App.css";
import QuestionCard from './QuestionCard/QuestionCard';


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
            <Header />
            <QuestionCard
                form={form}
                timer={timer}
                currentIndex={currentIndex}
                question_json={question_json}
                total_question={total_question}
                handleOnChangeOption={handleOnChangeOption}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleFirst={handleFirst}
                handleLast={handleLast}
                handleSubmit={handleSubmit}
            />
            <div>
                {result && <ResultScreen score={userScore} total={total_question} />}
            </div>
        </div>
    );
}
