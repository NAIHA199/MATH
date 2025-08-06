import React, { useState, useEffect } from 'react';

const Question = ({ questionData, onAnswerSelect, selectedOption, showResult }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {questionData.question}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && onAnswerSelect(index)}
            className={`p-4 rounded-lg border-2 text-lg font-medium transition-all duration-200 ${
              showResult
                ? index === questionData.correctAnswer
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : selectedOption === index
                  ? 'bg-red-100 border-red-500 text-red-700'
                  : 'bg-gray-100 border-gray-300 text-gray-700'
                : selectedOption === index
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
            disabled={showResult}
          >
            <div className="flex items-center">
              <div className="mr-3 flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>
      
      {showResult && (
        <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-blue-800 font-medium">
            {selectedOption === questionData.correctAnswer 
              ? "Correct! Well done." 
              : `Incorrect. The correct answer is ${String.fromCharCode(65 + questionData.correctAnswer)}.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Question;