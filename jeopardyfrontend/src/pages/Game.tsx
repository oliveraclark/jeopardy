import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import GameBoard from '../componants/common/GameBoard';
import QuestionDialogue from '../componants/common/QuestionDialogue';
import { GameQuestion } from "../types/game.types";

function Game() {

    const [selectedQuestion, setSelectedQuestion] = useState<GameQuestion | null>(null);

    return (
        <div>
            <GameBoard onSelectQuestion={setSelectedQuestion} />
            {selectedQuestion !== null && (
                <QuestionDialogue
                    selectedTile={selectedQuestion}
                    open={true}
                    setSelectedTile={setSelectedQuestion}
                />
            )}
        </div>
        
    );
}
export default Game