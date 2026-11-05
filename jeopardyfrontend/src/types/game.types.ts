import { Contestant } from "../data/contestants.data";

export enum QuestionType {
    History = 'History',
    Geography = 'Geography',
    Film = 'Film',
}

export interface GameQuestion {
    id: string;
    questionType: QuestionType;
    value: number;
    hint: string;
    answer: string;
    answered: boolean
}

export interface GameState {
    id: string,
    pin: string,
    contestants: Contestant[]
    gameQuestions: GameQuestion[]
    selectedQuestionId: string | null
}
