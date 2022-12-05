import react from 'react';

const QuestionCard = ({ form, timer, currentIndex, total_question, handleOnChangeOption, question_json, handlePrev, handleNext, handleFirst, handleLast, handleSubmit }) => {
    return (
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
        </div>

    )
}

export default QuestionCard;
