import React, { useState } from 'react';
import Question from '../components/exercise/Question';
import questions from '../utils/Question.json';

const ExercisePage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState({});

  const handleAnswerSelect = (optionIndex) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitAnswer = () => {
    setShowResults({
      ...showResults,
      [currentQuestionIndex]: true
    });
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = selectedOptions[currentQuestionIndex];
  const showResult = showResults[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Math Exercise</h1>
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>

        <div className="flex justify-center mb-8">
          <Question
            questionData={currentQuestion}
            onAnswerSelect={handleAnswerSelect}
            selectedOption={selectedOption}
            showResult={showResult}
          />
        </div>

        <div className="flex justify-between max-w-2xl mx-auto">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-medium ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Previous
          </button>

          {!showResult ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === undefined}
              className={`px-6 py-3 rounded-lg font-medium ${
                selectedOption === undefined
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className={`px-6 py-3 rounded-lg font-medium ${
                currentQuestionIndex === questions.length - 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
