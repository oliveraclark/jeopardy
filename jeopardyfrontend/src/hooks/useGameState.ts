
import { useCallback, useState } from "react";
import { GameState, GameQuestion } from "../types/game.types";
import { Contestant } from "../data/contestants.data";

export function useGameState() {
    const [gameState, setGameState] = useState<GameState | null>(null);

    const updateGameState = useCallback((newState: GameState) => {
        setGameState(newState);
    }, []);

    const selectQuestion = useCallback((question: GameQuestion | null) => {
        setGameState(current => {
            if (!current) return current;

            return {
                ...current,
                selectedQuestionId: question?.id ?? null
            };
        });
    }, []);

    const addContestantToState = useCallback((contestant: Contestant) => {
        setGameState(current => {
            if (!current) return current;

            const alreadyExists = current.contestants.some(
                existing => existing.id === contestant.id
            );

            if (alreadyExists) return current;

            return {
                ...current,
                contestants: [...current.contestants, contestant]
            };
        });
    }, []);

    const updateContestantScore = useCallback((
        contestantId: string,
        score: number
    ) => {
        setGameState(current => {
            if (!current) return current;

            return {
                ...current,
                contestants: current.contestants.map(contestant =>
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
    }, []);

    const markQuestionAnswered = useCallback((questionId: string) => {
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
    }, []);

    const selectedQuestion = gameState?.gameQuestions.find(
        question => question.id === gameState.selectedQuestionId
    ) ?? null;

    return {
        gameState,
        selectedQuestion,
        updateGameState,
        selectQuestion,
        updateContestantScore,
        markQuestionAnswered,
        addContestantToState
    };
}
