import React, { useState } from 'react';
import ProgressRing from '../ui/ProgressRing';

const Question = ({ question, onNext, onAnswer, totalQuestions, currentQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === question.answer;
    setIsCorrect(correct);
    setIsAnswered(true);
    onAnswer(correct);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    onNext();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
      {/* Header với tiến trình */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold text-gray-700">
          Câu hỏi {currentQuestion} / {totalQuestions}
        </div>
        <ProgressRing 
          radius={30} 
          stroke={6} 
          progress={(currentQuestion / totalQuestions) * 100} 
        />
      </div>

      {/* Nội dung câu hỏi */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {question.question}
        </h2>
        
        {/* Các lựa chọn trả lời */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectOption(option)}
              disabled={isAnswered}
              className={`
                p-4 rounded-xl border-2 text-left transition-all duration-300
                ${!isAnswered 
                  ? selectedOption === option
                    ? 'border-blue-500 bg-blue-50 transform scale-105'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  : option === question.answer
                    ? 'border-green-500 bg-green-50'
                    : selectedOption === option
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200'
                }
              `}
            >
              <div className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center mr-3
                  ${!isAnswered 
                    ? selectedOption === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                    : option === question.answer
                      ? 'bg-green-500 text-white'
                      : selectedOption === option
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100'
                  }
                `}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Phản hồi sau khi trả lời */}
      {isAnswered && (
        <div className={`
          p-4 rounded-xl mb-6 text-center
          ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
        `}>
          <p className="font-bold text-lg">
            {isCorrect ? '🎉 Chính xác! Tốt lắm!' : '😅 Không đúng rồi, hãy thử lại!'}
          </p>
          {question.explanation && (
            <p className="mt-2">{question.explanation}</p>
          )}
        </div>
      )}

      {/* Nút hành động */}
      <div className="text-center">
        {!isAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`
              bg-blue-500 text-white font-bold py-3 px-8 rounded-full
              ${selectedOption === null 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-600 transform hover:scale-105 transition duration-300'
              }
            `}
          >
            Kiểm Tra
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition duration-300"
          >
            {currentQuestion < totalQuestions ? 'Câu tiếp theo' : 'Hoàn thành'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;