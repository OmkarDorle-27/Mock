import { Question } from "@shared/schema";

export interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  currentSubject: 'physics' | 'chemistry' | 'maths';
  answers: Record<number, string | number | string[]>; // Support arrays for multi-correct
  markedForReview: Set<number>;
  timeRemaining: number; // in milliseconds
  testStarted: boolean;
  testCompleted: boolean;
  questionStartTimes: Record<number, number>; // Track when each question was started
  timeSpentPerQuestion: Record<number, number>; // Total time spent on each question in milliseconds
  currentQuestionStartTime: number; // When current question viewing started
}

export interface QuestionResult {
  questionId: number;
  questionNumber: number;
  subject: string;
  type: string;
  attempted: boolean;
  correct: boolean;
  partialMarks: number;
  maxMarks: number;
  timeSpent: number; // in seconds
  userAnswer: string | number | string[] | null;
  correctAnswer: string | number | string[];
}

export interface SubjectWiseResult {
  subject: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  partialCorrect: number;
  totalMarks: number;
  maxPossibleMarks: number;
}

export interface TestResults {
  overall: {
    totalQuestions: number;
    attempted: number;
    correct: number;
    incorrect: number;
    partialCorrect: number;
    unanswered: number;
    totalMarks: number;
    maxPossibleMarks: number;
    percentage: number;
    totalTimeSpent: number; // in minutes
  };
  subjectWise: SubjectWiseResult[];
  questionWise: QuestionResult[];
}

export const initialTestState: TestState = {
  questions: [],
  currentQuestionIndex: 0,
  currentSubject: 'physics',
  answers: {},
  markedForReview: new Set(),
  timeRemaining: 3 * 60 * 60 * 1000, // 3 hours
  testStarted: false,
  testCompleted: false,
  questionStartTimes: {},
  timeSpentPerQuestion: {},
  currentQuestionStartTime: Date.now(),
};

export const saveTestState = (state: TestState) => {
  const stateToSave = {
    ...state,
    markedForReview: Array.from(state.markedForReview),
  };
  localStorage.setItem('mockTestState', JSON.stringify(stateToSave));
};

export const loadTestState = (): TestState | null => {
  try {
    const saved = localStorage.getItem('mockTestState');
    if (!saved) return null;
    
    const parsed = JSON.parse(saved);
    return {
      ...parsed,
      markedForReview: new Set(parsed.markedForReview),
    };
  } catch (error) {
    console.error('Error loading test state:', error);
    return null;
  }
};

export const clearTestState = () => {
  localStorage.removeItem('mockTestState');
};

// Calculate partial marks for multi-correct questions
const calculatePartialMarks = (userAnswer: string[], correctAnswer: string[], maxMarks: number, negativeMark: number): number => {
  if (!userAnswer || userAnswer.length === 0) return 0;
  
  const correctSelected = userAnswer.filter(ans => correctAnswer.includes(ans));
  const incorrectSelected = userAnswer.filter(ans => !correctAnswer.includes(ans));
  
  // If any incorrect option is selected, apply negative marking
  if (incorrectSelected.length > 0) {
    return negativeMark; // negativeMark is already negative (e.g., -2)
  }
  
  // Calculate partial marks based on correct selections
  const totalCorrect = correctAnswer.length;
  const userCorrect = correctSelected.length;
  
  if (userCorrect === totalCorrect) {
    return maxMarks; // Full marks
  } else if (userCorrect > 0) {
    return userCorrect; // +1 for each correct option selected
  }
  
  return 0;
};

export const calculateResults = (state: TestState): TestResults => {
  const questionResults: QuestionResult[] = [];
  const subjectWiseStats: Record<string, SubjectWiseResult> = {};
  
  let totalMarks = 0;
  let maxPossibleMarks = 0;
  let attempted = 0;
  let correct = 0;
  let incorrect = 0;
  let partialCorrect = 0;
  
  state.questions.forEach((question) => {
    const userAnswer = state.answers[question.id];
    const timeSpent = Math.floor((state.timeSpentPerQuestion[question.id] || 0) / 1000);
    const isAttempted = userAnswer !== undefined && userAnswer !== '' && userAnswer !== null;
    
    let questionMarks = 0;
    let isCorrect = false;
    let isPartial = false;
    
    maxPossibleMarks += question.marks || 4;
    
    if (isAttempted) {
      attempted++;
      
      if (question.type === 'numerical') {
        // Numerical questions: +4 for correct, 0 for wrong/unattempted
        const correctAnswer = typeof question.correctAnswer === 'number' ? question.correctAnswer : 0;
        const userNum = typeof userAnswer === 'number' ? userAnswer : parseFloat(userAnswer as string);
        
        if (Math.abs(userNum - correctAnswer) < 0.01) {
          questionMarks = question.marks || 4;
          isCorrect = true;
          correct++;
        } else {
          questionMarks = 0;
          incorrect++;
        }
      } else if (question.type === 'multi-correct') {
        // Multi-correct questions: partial marking system
        const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer as string];
        const correctAnswerArray = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer as string];
        
        questionMarks = calculatePartialMarks(
          userAnswerArray, 
          correctAnswerArray, 
          question.marks || 4, 
          question.negativeMark || 2
        );
        
        if (questionMarks === (question.marks || 4)) {
          isCorrect = true;
          correct++;
        } else if (questionMarks > 0) {
          isPartial = true;
          partialCorrect++;
        } else {
          incorrect++;
        }
      } else {
        // Single correct questions: +4 for correct, -1 for wrong
        if (userAnswer === question.correctAnswer) {
          questionMarks = question.marks || 4;
          isCorrect = true;
          correct++;
        } else {
          questionMarks = question.negativeMark || -1;
          incorrect++;
        }
      }
    }
    
    totalMarks += questionMarks;
    
    // Create question result
    const questionResult: QuestionResult = {
      questionId: question.id,
      questionNumber: question.number || question.id,
      subject: question.subject || 'unknown',
      type: question.type || 'mcq',
      attempted: isAttempted,
      correct: isCorrect,
      partialMarks: questionMarks,
      maxMarks: question.marks || 4,
      timeSpent,
      userAnswer: userAnswer || null,
      correctAnswer: question.correctAnswer,
    };
    
    questionResults.push(questionResult);
    
    // Update subject-wise stats
    const subject = question.subject || 'unknown';
    if (!subjectWiseStats[subject]) {
      subjectWiseStats[subject] = {
        subject,
        totalQuestions: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        partialCorrect: 0,
        totalMarks: 0,
        maxPossibleMarks: 0,
      };
    }
    
    const subjectStats = subjectWiseStats[subject];
    subjectStats.totalQuestions++;
    subjectStats.maxPossibleMarks += question.marks || 4;
    subjectStats.totalMarks += questionMarks;
    
    if (isAttempted) {
      subjectStats.attempted++;
      if (isCorrect) subjectStats.correct++;
      else if (isPartial) subjectStats.partialCorrect++;
      else subjectStats.incorrect++;
    }
  });
  
  const unanswered = state.questions.length - attempted;
  const percentage = maxPossibleMarks > 0 ? (totalMarks / maxPossibleMarks) * 100 : 0;
  const totalTimeSpent = Math.floor((state.questionStartTimes[1] ? Date.now() - state.questionStartTimes[1] : 0) / (1000 * 60)); // in minutes
  
  return {
    overall: {
      totalQuestions: state.questions.length,
      attempted,
      correct,
      incorrect,
      partialCorrect,
      unanswered,
      totalMarks,
      maxPossibleMarks,
      percentage: Math.max(0, percentage),
      totalTimeSpent,
    },
    subjectWise: Object.values(subjectWiseStats),
    questionWise: questionResults,
  };
};

export const getQuestionStatus = (questionId: number, state: TestState): string => {
  const hasAnswer = state.answers.hasOwnProperty(questionId);
  const isMarked = state.markedForReview.has(questionId);

  if (hasAnswer && isMarked) {
    return 'question-marked-answered';
  } else if (hasAnswer) {
    return 'question-answered';
  } else if (isMarked) {
    return 'question-marked';
  } else {
    return 'question-unanswered';
  }
};
