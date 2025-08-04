<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user = Auth::user();
        return view('game.index', compact('user'));
    }

    public function startGame(Request $request)
    {
        $level = $request->get('level', 'easy');
        $operation = $request->get('operation', 'addition');
        
        $gameData = $this->generateGameData($level, $operation);
        
        return response()->json($gameData);
    }

    public function checkAnswer(Request $request)
    {
        $userAnswer = $request->input('answer');
        $correctAnswer = $request->input('correct_answer');
        $score = $request->input('score', 0);
        
        $isCorrect = (int)$userAnswer === (int)$correctAnswer;
        
        if ($isCorrect) {
            $score += 10;
        }
        
        return response()->json([
            'correct' => $isCorrect,
            'score' => $score,
            'message' => $isCorrect ? 'Chính xác! +10 điểm' : 'Sai rồi, hãy thử lại!'
        ]);
    }

    private function generateGameData($level, $operation)
    {
        $difficulty = [
            'easy' => ['min' => 1, 'max' => 10],
            'medium' => ['min' => 10, 'max' => 50],
            'hard' => ['min' => 50, 'max' => 100]
        ];

        $range = $difficulty[$level];
        $num1 = rand($range['min'], $range['max']);
        $num2 = rand($range['min'], $range['max']);

        switch ($operation) {
            case 'addition':
                $question = "$num1 + $num2 = ?";
                $answer = $num1 + $num2;
                break;
            case 'subtraction':
                $question = "$num1 - $num2 = ?";
                $answer = $num1 - $num2;
                break;
            case 'multiplication':
                $question = "$num1 × $num2 = ?";
                $answer = $num1 * $num2;
                break;
            case 'division':
                // Đảm bảo phép chia có kết quả nguyên
                $answer = rand(1, 10);
                $num1 = $num2 * $answer;
                $question = "$num1 ÷ $num2 = ?";
                break;
            default:
                $question = "$num1 + $num2 = ?";
                $answer = $num1 + $num2;
        }

        return [
            'question' => $question,
            'answer' => $answer,
            'level' => $level,
            'operation' => $operation
        ];
    }
} 