import { GameQuestion, QuestionType } from "../types/game.types";

function createGameTile(
    questionType: QuestionType,
    value: number,
    hint: string,
    answer: string,
    ): GameQuestion {
    return { questionType, value, hint, answer, answered: false };
};

export const gameTiles: GameQuestion[] = [
    // History
    createGameTile(
        QuestionType.History,
        100,
        "This ancient civilisation built the pyramids at Giza.",
        "What is ancient Egypt?"
    ),
    createGameTile(
        QuestionType.History,
        200,
        "This ship sank on its maiden voyage in April 1912.",
        "What is the Titanic?"
    ),
    createGameTile(
        QuestionType.History,
        300,
        "This wall divided a European capital from 1961 until 1989.",
        "What is the Berlin Wall?"
    ),
    createGameTile(
        QuestionType.History,
        400,
        "This French military leader became emperor in 1804.",
        "Who was Napoleon Bonaparte?"
    ),
    createGameTile(
        QuestionType.History,
        500,
        "This New Zealand treaty was signed in 1840 between Māori chiefs and the British Crown.",
        "What is the Treaty of Waitangi?"
    ),

    // Geography
    createGameTile(
        QuestionType.Geography,
        100,
        "This is the largest ocean on Earth.",
        "What is the Pacific Ocean?"
    ),
    createGameTile(
        QuestionType.Geography,
        200,
        "This country is home to the cities of Sydney and Melbourne.",
        "What is Australia?"
    ),
    createGameTile(
        QuestionType.Geography,
        300,
        "This river flows through Egypt and is one of the world's longest rivers.",
        "What is the Nile?"
    ),
    createGameTile(
        QuestionType.Geography,
        400,
        "This South American country is home to the city of Rio de Janeiro.",
        "What is Brazil?"
    ),
    createGameTile(
        QuestionType.Geography,
        500,
        "This landlocked country lies between China and Russia and has Ulaanbaatar as its capital.",
        "What is Mongolia?"
    ),

    // Film
    createGameTile(
        QuestionType.Film,
        100,
        "This 1994 Disney film features a lion cub named Simba.",
        "What is The Lion King?"
    ),
    createGameTile(
        QuestionType.Film,
        200,
        "In this film series, a young wizard attends Hogwarts School of Witchcraft and Wizardry.",
        "What is Harry Potter?"
    ),
    createGameTile(
        QuestionType.Film,
        300,
        "This 1997 romantic disaster film features Jack and Rose aboard a famous ocean liner.",
        "What is Titanic?"
    ),
    createGameTile(
        QuestionType.Film,
        400,
        "In this science-fiction film franchise, Darth Vader is the father of Luke Skywalker.",
        "What is Star Wars?"
    ),
    createGameTile(
        QuestionType.Film,
        500,
        "This 2010 Christopher Nolan film explores dreams within dreams and stars Leonardo DiCaprio.",
        "What is Inception?"
    ),
];