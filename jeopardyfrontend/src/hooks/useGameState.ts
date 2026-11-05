import { useState } from "react";
import { GameState, GameQuestion } from "../types/game.types";
import { Contestant } from "../data/contestants.data";

export function useGameState() {
    const [gameState, setGameState] = useState<GameState | null>(null);

    function updateGameState(newState: GameState) {
        setGameState(newState);
    }

    function selectQuestion(question: GameQuestion | null) {
        setGameState(current => {
            if (!current) return current;

            return {
                ...current,
                selectedQuestionId: question?.id ?? null
            };
        });
    }

    function updateContestantScore(contestantId: string, score: number) {
        setGameState(current => {
            if (!current) return current;

            return {
                ...current,
                contestants: current.contestants.map((contestant: Contestant) =>
                    contestant.id === contestantId
                        ? {
                            ...contestant,
                            score: contestant.score + score,
                            nIncorrect: score < 0
                                ? contestant.nIncorrect + 1
                                : contestant.nIncorrect,
                            nCorrect: score > 0
                                ? contestant.nCorrect + 1
                                : contestant.nCorrect
                        }
                        : contestant
                )
            };
        });
    }

    function markQuestionAnswered(questionId: string) {
        setGameState(current => {
            if (!current) return current;

            return {
                ...current,
                gameQuestions: current.gameQuestions.map(question =>
                    question.id === questionId
                        ? { ...question, answered: true }
                        : question
                ),
                selectedQuestionId: null
            };
        });
    }

    const selectedQuestion = gameState?.gameQuestions.find(
        question => question.id === gameState.selectedQuestionId
    ) ?? null;

    return {
        gameState,
        selectedQuestion,
        updateGameState,
        selectQuestion,
        updateContestantScore,
        markQuestionAnswered
    };
}