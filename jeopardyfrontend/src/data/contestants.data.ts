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
        name: 'Maddie',
        score: 0,
        nCorrect: 0,
        nIncorrect: 0,
    },
    {
        id: 'contestant-2',
        name: 'Alana',
        score: 0,
        nCorrect: 0,
        nIncorrect: 0,
    },
    {
        id: 'contestant-4',
        name: 'Jack',
        score: 0,
        nCorrect: 0,
        nIncorrect: 0,
    },
    {
        id: 'contestant-5',
        name: 'Astrid',
        score: 0,
        nCorrect: 0,
        nIncorrect: 0,
    },
    {
        id: 'contestant-6',
        name: 'Allan',
        score: 0,
        nCorrect: 0,
        nIncorrect: 0,
    },
];