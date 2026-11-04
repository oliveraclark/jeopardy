import { useState } from 'react';
import GameBoard from '../components/common/GameBoard';
import QuestionDialogue from '../components/common/QuestionDialogue';
import { GameQuestion } from "../types/game.types";
import { gameTiles } from '../data/question.data';
import { Box } from '@mui/material';
import { Contestant } from '../data/contestants.data';
import Leaderboard from '../components/common/Leaderboard';
import { useEffect } from 'react';
import { getContestantsByPin, addScore } from '../services/contestantService';
import { useParams } from 'react-router-dom';



function Game() {

    const { pin } = useParams<{ pin: string }>();
    const [selectedQuestion, setSelectedQuestion] = useState<GameQuestion | null>(null);
    const [contestants, setContestants] = useState<Contestant[]>([]);
    const [gameQuestions, setGameQuestions] = useState(gameTiles)

    useEffect(() => {
        async function fetchContestants() {
            if (!pin) return;
            try {
                const data = await getContestantsByPin({ gamePin: pin });
                setContestants(data.contestants);
            } catch (error) {
                console.error(error);
            }
        }

        fetchContestants();
    }, [pin]);


    async function updateGameState(
        contestant: Contestant,
        score: number,
        answeredQuestion: GameQuestion
    ) {
        if (!pin) return;

        try {
            await addScore({
                gamePin: pin,
                id: contestant.id,
                score: score
            });

            // Update local contestant state after backend succeeds
            setContestants(prev =>
                prev.map((c: Contestant) => {
                    if (c.id === contestant.id) {
                        return {
                            ...c,
                            score: c.score + score,
                            nIncorrect: score < 0 ? c.nIncorrect + 1 : c.nIncorrect,
                            nCorrect: score > 0 ? c.nCorrect + 1 : c.nCorrect,
                        };
                    }

                    return c;
                })
            );

            // Mark question as answered if correct
            if (score > 0) {
                setGameQuestions(prev =>
                    prev.map((q: GameQuestion) => {
                        if (
                            q.value === answeredQuestion.value &&
                            q.questionType === answeredQuestion.questionType
                        ) {
                            return {
                                ...q,
                                answered: true
                            };
                        }

                        return q;
                    })
                );
            }

        } catch (error) {
            console.error("Failed to update game state:", error);
        }
    }

    return (
        
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <title>Jeoprady!</title>
            <Leaderboard contestants={contestants} />
            <GameBoard questions={gameQuestions} onSelectQuestion={setSelectedQuestion} />
            {selectedQuestion !== null && (
                <QuestionDialogue
                    question={selectedQuestion}
                    setQuestion={setSelectedQuestion}
                    onSubmit={updateGameState}
                    contestants={contestants}

                />
            )}
        </Box>
        
    );
}
export default Game