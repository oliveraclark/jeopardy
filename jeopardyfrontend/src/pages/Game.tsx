
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import GameBoard from '../components/common/GameBoard';
import QuestionDialogue from '../components/common/QuestionDialogue';
import Leaderboard from '../components/common/Leaderboard';
import Buzzer from '../components/common/Buzzer';

import { gameTiles } from '../data/question.data';
import { Contestant } from '../data/contestants.data';
import { GameQuestion, GameState } from '../types/game.types';

import { recordAnsweredQuestion } from '../services/contestantService';
import { getGame } from '../services/gameService';
import { useGameState } from '../hooks/useGameState';
import * as signalR from "@microsoft/signalr";

function Game() {
    const { pin } = useParams<{ pin: string }>();
    const isHost = localStorage.getItem('isHost') === 'true';
    const navigate = useNavigate();

    const {
        selectedQuestion,
        gameState,
        updateGameState,
        selectQuestion,
        updateContestantScore,
        markQuestionAnswered,
        addContestantToState
    } = useGameState();

    useEffect(() => {
    let connection: signalR.HubConnection | null = null;
    let cancelled = false;

    async function loadGame() {
            const contestantID = localStorage.getItem('contestantID');
            

            if (!pin || (!isHost && !contestantID)) {
                navigate('/', { replace: true });
                return;
            }

            try {
                const fetchedGame = await getGame(pin);

                if (cancelled) return;

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
                    gameQuestions: gameTiles.map(question => ({
                        ...question,
                        answered: fetchedGame.answeredQuestionIds.includes(question.id)
                    })),
                    selectedQuestionId: null
                };

                updateGameState(loadedGameState);

                // Create SignalR connection
                connection = new signalR.HubConnectionBuilder()
                    .withUrl('http://localhost:5238/gameHub')
                    .withAutomaticReconnect()
                    .build();

                // Listen for contestants joining
                connection.on(
                    'ContestantJoined',
                    (contestant: Contestant) => {
                        if (!cancelled) {
                            addContestantToState(contestant);
                        }
                    }
                );

                if(!isHost) {
                    // Listen for score changes
                    connection.on(
                        'ScoreChange',
                        (contestantId: string, score: number, questionId: string) => {
                            if (cancelled) return;

                            updateContestantScore(contestantId, score);
                            if (score > 0) markQuestionAnswered(questionId);
                        }
                    );
                }
                

                connection.onreconnected(async () => {
                    if (cancelled) return;

                    console.log('SignalR reconnected. Rejoining game:', pin);

                    try {
                        await connection?.invoke('JoinGame', pin);
                        console.log('Successfully rejoined game:', pin);
                    } catch (error) {
                        console.error('Failed to rejoin game:', error);
                    }
                });

                // Connect and join the game group
                await connection.start();

                if (cancelled) {
                    await connection.stop();
                    return;
                }

                await connection.invoke('JoinGame', pin);

                console.log('Connected to SignalR game:', pin);

            } catch (error) {
                console.error('Failed to load game:', error);

                if (!cancelled) {
                    navigate('/', { replace: true });
                }
            }
        }

        loadGame();

        return () => {
            cancelled = true;

            if (connection) {
                connection.stop();
            }
        };
    }, [pin, navigate, updateGameState, addContestantToState]);

    async function submitAnswer(
        contestant: Contestant,
        score: number,
        answeredQuestion: GameQuestion
    ) {
        if (!pin) return;

        try {
            await recordAnsweredQuestion({
                gamePin: pin,
                id: contestant.id,
                score,
                questionId: answeredQuestion.id
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

    // if(!isHost) {
    //     return (
    //         <Box
    //         sx={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             gap: 10,
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             height: '100vh'
    //         }}
    //     >
    //         <Buzzer></Buzzer>
    //     </Box>
    //     )
    // }

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
