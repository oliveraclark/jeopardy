import { GameQuestion } from "../../types/game.types";
import { Card, CardContent, Dialog, DialogTitle } from "@mui/material";

export interface QuestionDialogueProps {
  selectedTile: GameQuestion
  open: boolean;
  onClose: () => void;
}

function QuestionDialogue({
    selectedTile,
    open,
    onClose
}: QuestionDialogueProps) {

    return (
        <Dialog onClose={()=>onClose()} open={open}>
            <DialogTitle>{selectedTile.questionType} for ${selectedTile.value}</DialogTitle>
            <Card>
                <CardContent>
                    {selectedTile.hint}
                </CardContent>
            </Card>
        </Dialog>
    )
}
export default QuestionDialogue