
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import GameBoard from '../components/common/GameBoard';
import QuestionDialogue from '../components/common/QuestionDialogue';
import Leaderboard from '../components/common/Leaderboard';

import { gameTiles } from '../data/question.data';
import { Contestant } from '../data/contestants.data';
import { GameQuestion, GameState } from '../types/game.types';

import { addScore } from '../services/contestantService';
import { getGame } from '../services/gameService';
import { useGameState } from '../hooks/useGameState';

function Game() {
    const { pin } = useParams<{ pin: string }>();
    const navigate = useNavigate();

    const {
        selectedQuestion,
        gameState,
        updateGameState,
        selectQuestion,
        updateContestantScore,
        markQuestionAnswered
    } = useGameState();

    useEffect(() => {
        async function loadGame() {
            const contestantID = localStorage.getItem('contestantID');
            const isHost = localStorage.getItem('isHost') === 'true';

            if (!pin || (!isHost && !contestantID)) {
                navigate('/', { replace: true });
                return;
            }

            try {
                const fetchedGame = await getGame(pin);

                if (!isHost) {
                    const joined = fetchedGame.contestants.some(
                        (contestant: Contestant) =>
                            contestant.id === contestantID
                    );

                    if (!joined) {
                        navigate('/', { replace: true });
                        return;
                    }
                }

                const loadedGameState: GameState = {
                    id: fetchedGame.gameId,
                    pin,
                    contestants: fetchedGame.contestants,
                    gameQuestions: gameTiles,
                    selectedQuestionId: null
                };

                updateGameState(loadedGameState);

            } catch (error) {
                console.error('Failed to load game:', error);
                navigate('/', { replace: true });
            }
        }

        loadGame();
    }, [pin, navigate, updateGameState]);

    async function submitAnswer(
        contestant: Contestant,
        score: number,
        answeredQuestion: GameQuestion
    ) {
        if (!pin) return;

        try {
            await addScore({
                gamePin: pin,
                id: contestant.id,
                score
            });

            updateContestantScore(contestant.id, score);

            if (score > 0) {
                markQuestionAnswered(answeredQuestion.id);
            }

        } catch (error) {
            console.error('Failed to update game state:', error);
        }
    }

    if (!gameState) {
        return <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <h1>Loading game...</h1>
        </Box>
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <Leaderboard contestants={gameState.contestants} />

            <GameBoard
                questions={gameState.gameQuestions}
                onSelectQuestion={selectQuestion}
            />

            {selectedQuestion && (
                <QuestionDialogue
                    question={selectedQuestion}
                    setQuestion={selectQuestion}
                    onSubmit={submitAnswer}
                    contestants={gameState.contestants}
                />
            )}
        </Box>
    );
}

export default Game;
