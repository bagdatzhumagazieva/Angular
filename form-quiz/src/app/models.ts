export type QuizType = 'multiple' | 'single';

export type AnswerOption = {
  id: number;
  text: string;
  isCorrect: boolean;
};

export type Quiz = {
  id: number;
  text: string;
  type: QuizType;
  answerOptions: AnswerOption[];
};

export type FillAnswer = {
  questionId: number;
  answerIds: {
    id: number;
    isCorrect: boolean;
  }[];
};
