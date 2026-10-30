import { GameQuestion } from "../../types/game.types";
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    FormHelperText,
    Select,
    SelectChangeEvent,
    MenuItem,
    FormControl,
    InputLabel
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Contestant } from "../../data/contestants.data";

export interface QuestionDialogueProps {
    question: GameQuestion;
    setQuestion: Dispatch<SetStateAction<GameQuestion | null>>;
    onSubmit: (contestant: Contestant, score: number, answeredQuestion: GameQuestion) => void;
    contestants: Contestant[];
}

function QuestionDialogue({
    question: selectedTile,
    setQuestion: setSelectedTile,
    onSubmit,
    contestants
}: QuestionDialogueProps) {

    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [selectedContestant, setSelectedContestant] = useState<string>("");
    const [validationError, setValidationError] = useState(false);
    const [showHint, setShowHint] = useState(true);

    const textToShow = showHint ? selectedTile.hint : selectedTile.answer;

    const handleAnswerSelection = (e: SelectChangeEvent) => {
        setIsCorrect(e.target.value === 'true');
    };

    const handleContestantSelection = (e: SelectChangeEvent) => {
        setSelectedContestant(e.target.value);
    };

    const handleSubmit = () => {
        if (isCorrect === null || selectedContestant === "") {
            setValidationError(true);
            return;
        }

        const contestant = contestants.find(c => c.id === selectedContestant);

        if (!contestant) return;

        const score = isCorrect ? selectedTile.value : -selectedTile.value;

        onSubmit(contestant, score, selectedTile);

        if(score > 0) setSelectedTile(null);
    };

    return (
        <Dialog fullWidth maxWidth="md" onClose={() => setSelectedTile(null)} open={true}>
            <DialogTitle sx={{ fontSize: "4em", m: 1 }}>
                {selectedTile.questionType} for ${selectedTile.value}
            </DialogTitle>

            <Card
                onClick={() => setShowHint(!showHint)}
                variant="outlined"
                sx={{ m: 2, cursor: 'pointer' }}
            >
                <CardContent sx={{ fontSize: "6em" }}>
                    {textToShow}
                </CardContent>
            </Card>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', m: 2, gap: 2 }}>

                <FormControl fullWidth error={validationError} required>
                    <InputLabel id="contestant-select">Contestant</InputLabel>
                    <Select
                        labelId="contestant-select"
                        label="Contestant"
                        value={selectedContestant}
                        onChange={handleContestantSelection}
                        sx={{ fontSize: '1.5rem' }}
                    >
                        {contestants.map(contestant => (
                            <MenuItem key={contestant.id} value={contestant.id}>
                                {contestant.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth error={validationError} required>
                    <InputLabel id="correctness-select">Answer</InputLabel>
                    <Select
                        labelId="correctness-select"
                        label="Answer"
                        value={isCorrect === null ? '' : String(isCorrect)}
                        onChange={handleAnswerSelection}
                        sx={{ fontSize: '1.5rem' }}
                    >
                        <MenuItem value="true">Correct</MenuItem>
                        <MenuItem value="false">Incorrect</MenuItem>
                    </Select>
                </FormControl>

            </Box>

            {validationError && (
                <FormHelperText error sx={{ fontSize: '1rem', mx: 3 }}>
                    Please select an answer and a contestant.
                </FormHelperText>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, m: 2 }}>
                <Button
                    variant="outlined"
                    sx={{ fontSize: '1.5em' }}
                    onClick={() => setSelectedTile(null)}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    sx={{ fontSize: '1.5em' }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Box>
        </Dialog>
    );
}

export default QuestionDialogue;