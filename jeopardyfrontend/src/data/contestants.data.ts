export interface Contestant {
    id: string;
    name: string;
    score: number;
    nCorrect: number;
    nIncorrect: number;
}

export const dummyUsers: Contestant[] = [
    {
        id: 'contestant-1',
        name: 'Alex',
        score: 0,
        nCorrect: 0,
        nIncorrect: 0,
    },
    {
        id: 'contestant-2',
        name: 'Jordan',
        score: 0,
        nCorrect: 0,
        nIncorrect: 0,
    },
    {
        id: 'contestant-3',
        name: 'Sam',
        score: 0,
        nCorrect: 0,
        nIncorrect: 0,
    },
];