import { useState } from 'react';
import GameBoard from '../componants/common/GameBoard';
import QuestionDialogue from '../componants/common/QuestionDialogue';
import { GameQuestion } from "../types/game.types";
import { gameTiles } from '../data/question.data';
import { Box } from '@mui/material';
import { dummyUsers } from '../data/contestants.data';
import { Contestant } from '../data/contestants.data';
import Leaderboard from '../componants/common/Leaderboard';


function Game() {

    const [selectedQuestion, setSelectedQuestion] = useState<GameQuestion | null>(null);
    const [contestants, setContestants] = useState(dummyUsers)
    const [gameQuestions, setGameQuestions] = useState(gameTiles)

    function updateContestantScore(contestant: Contestant, score: number, answeredQuestion: GameQuestion) {
        const newContestants = contestants.map((c: Contestant) => {
            if(c.id == contestant.id) {
                return {
                    ...c,
                    score: c.score + score,
                    nIncorrect: score < 0 ? c.nIncorrect + 1 : c.nIncorrect,
                    nCorrect: score > 0 ? c.nCorrect + 1 : c.nCorrect,
                }
            } else {
                return c
            }
        });
        setContestants(newContestants);

        if(score > 0) {
            const newQuestions = gameQuestions.map((q: GameQuestion) => {
                if(q.value == answeredQuestion.value && q.questionType == answeredQuestion.questionType) {
                    return {
                        ...q,
                        answered: true
                    }
                } else {
                    return q
                }
            });
            setGameQuestions(newQuestions)
        }
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Leaderboard contestants={contestants} />
            <GameBoard questions={gameQuestions} onSelectQuestion={setSelectedQuestion} />
            {selectedQuestion !== null && (
                <QuestionDialogue
                    question={selectedQuestion}
                    setQuestion={setSelectedQuestion}
                    onSubmit={updateContestantScore}
                    contestants={contestants}

                />
            )}
        </Box>
        
    );
}
export default Game