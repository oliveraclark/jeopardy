export enum QuestionType {
    History = 'history',
    Geography = 'geography',
    Film = 'film',
}

export interface GameQuestion {
    questionType: QuestionType;
    value: number;
    hint: string;
    answer: string;
}
