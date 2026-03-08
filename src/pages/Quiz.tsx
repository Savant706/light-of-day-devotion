import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { getRandomQuestions, QuizQuestion } from "@/data/quizQuestions";
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function Quiz() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => getRandomQuestions(10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const current = questions[currentIndex];

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === current.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setFinished(true);
      if (user) {
        await supabase.from("quiz_scores").insert({
          user_id: user.id,
          score: score + (selectedAnswer === current.correctIndex ? 1 : 0),
          total_questions: questions.length,
        });
      }
    }
  };

  const restart = () => {
    setQuestions(getRandomQuestions(10));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  if (finished) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    return (
      <Layout>
        <section className="page-container py-16 md:py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground mb-8">You scored {finalScore} out of {questions.length}</p>

            <div className="bg-card border border-border/50 rounded-2xl p-6 mb-8">
              <div className="text-5xl font-bold text-primary mb-2">{percentage}%</div>
              <p className="text-sm text-muted-foreground">
                {percentage >= 80 ? "Excellent! You know your Bible well! 🎉" :
                 percentage >= 60 ? "Great job! Keep studying God's Word! 📖" :
                 "Keep reading your Bible — you'll get there! 💪"}
              </p>
            </div>

            <button
              onClick={restart}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="page-container py-8 md:py-16">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Brain className="h-4 w-4" />
              Bible Quiz
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Test Your Knowledge
            </h1>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full h-2 bg-secondary/30 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="font-serif text-xl font-semibold text-foreground">{current.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {current.options.map((option, i) => {
              const isCorrect = i === current.correctIndex;
              const isSelected = i === selectedAnswer;
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={cn(
                    "w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center gap-3",
                    !answered && "hover:border-primary/50 hover:bg-primary/5 border-border bg-card",
                    answered && isCorrect && "border-green-500 bg-green-50 dark:bg-green-950/30",
                    answered && isSelected && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-950/30",
                    answered && !isCorrect && !isSelected && "opacity-50 border-border bg-card"
                  )}
                >
                  <span className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border shrink-0",
                    !answered && "border-border text-muted-foreground",
                    answered && isCorrect && "border-green-500 text-green-600 bg-green-100 dark:bg-green-900/50",
                    answered && isSelected && !isCorrect && "border-red-500 text-red-600 bg-red-100 dark:bg-red-900/50"
                  )}>
                    {answered && isCorrect ? <CheckCircle className="h-4 w-4" /> :
                     answered && isSelected ? <XCircle className="h-4 w-4" /> :
                     String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-foreground font-medium">{option}</span>
                </button>
              );
            })}
          </div>

          {answered && (
            <button
              onClick={handleNext}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
            </button>
          )}
        </div>
      </section>
    </Layout>
  );
}
