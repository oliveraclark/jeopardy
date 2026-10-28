import { GameQuestion } from "../../types/game.types";
import { Card, CardContent, Dialog, DialogTitle, FormHelperText, Select, SelectChangeEvent } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Dispatch, SetStateAction } from "react";
import { useState } from 'react';


export interface QuestionDialogueProps {
  selectedTile: GameQuestion
  open: boolean;
  setSelectedTile: Dispatch<SetStateAction<GameQuestion | null>>;
}

function QuestionDialogue({
    selectedTile,
    open,
    setSelectedTile
}: QuestionDialogueProps) {

    const [correct, setCorrect] = useState<boolean | null>(null);
    const [validationError, setValidationError] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const textToShow: string = showHint ? selectedTile.hint : selectedTile.answer

    const handleAnswerSelection = (e: SelectChangeEvent) => {
        setCorrect(e.target.value === 'true');
    }

    const handleClickOff = () => {
        if(correct !== null) {
            selectedTile.answered = true
            if(correct) {
                // TODO assign money to buzzed in client
                console.log(selectedTile.value + " dollars given to client")
            };
            // TODO add in validation from last line
        } else {
            setValidationError(true);
        }
        setSelectedTile(null)
    }

    return (
        <Dialog fullWidth maxWidth="md" onClose={handleClickOff} open={open}>
            <DialogTitle sx={{fontSize: "4em", m: 1}}>{selectedTile.questionType} for ${selectedTile.value}</DialogTitle>
            <Card onClick={() => setShowHint(!showHint)} variant="outlined" sx={{m: 2, cursor: 'pointer'}}>
                <CardContent sx={{fontSize: "6em"}}>
                    {textToShow}
                </CardContent>
            </Card>
            <FormControl
            fullWidth
                sx={{ maxWidth: '500px', m: 2 }}
                error={validationError}
                required
            >
                <InputLabel id="correctness-select">
                    Answer
                </InputLabel>

                <Select
                    labelId="correctness-select"
                    id="correctness-select-dialog"
                    label="Answer"
                    value={correct === null ? '' : String(correct)}
                    onChange={handleAnswerSelection}
                    sx={{fontSize: '2rem', '& .MuiSelect-select': { py: 2 },}}
                >
                    <MenuItem value="true">Correct</MenuItem>
                    <MenuItem value="false">Incorrect</MenuItem>
                </Select>

                {validationError && (
                    <FormHelperText sx={{fontSize: '1rem'}}>Please select Correct or Incorrect.</FormHelperText>
                )}
            </FormControl>
        </Dialog>
    )
}
export default QuestionDialogue