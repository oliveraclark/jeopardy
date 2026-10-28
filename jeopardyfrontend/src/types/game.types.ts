export enum QuestionType {
    History = 'History',
    Geography = 'Geography',
    Film = 'Film',
}

export interface GameQuestion {
    questionType: QuestionType;
    value: number;
    hint: string;
    answer: string;
    answered: boolean
}
