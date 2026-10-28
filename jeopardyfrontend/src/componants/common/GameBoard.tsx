import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { QuestionType, type GameQuestion } from '../../types/game.types';

const questionTypes = Object.values(QuestionType);

interface GameBoardProps {
    questions: GameQuestion[],
    onSelectQuestion: (question: GameQuestion) => void;
}

function GameBoard({ questions, onSelectQuestion }: GameBoardProps) {

    const gameQuestions: GameQuestion[] = questions

    return (
        <Box sx={{width: '100em', display: 'flex', flexWrap: 'nowrap', gap: 2, overflowX: 'auto' }}>
        {questionTypes.map((questionType: QuestionType) => (
            <TableContainer
                component={Paper}
                key={questionType}
                sx={{ flex: '1 0'}}
            >
            <Table aria-label={`${questionType} questions`}>
            <TableHead>
                <TableRow sx={{bgcolor: '#2c387e', flex: '1', height: '100px'}}>
                    <TableCell sx={{fontSize: '4em', fontWeight: 'bold', color: 'white'}} key={questionType} align="center">
                        {questionType.toUpperCase()}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {gameQuestions.filter((item: GameQuestion) => item.questionType === questionType).map((row: GameQuestion) => (
                    <TableRow
                    key={`${row.questionType}-${row.value}`}
                    >
                        <TableCell
                            component="th"
                            scope="row"
                            sx={{
                                textAlign: 'center',
                                fontSize: '4em',
                                cursor: row.answered ? 'default' : 'pointer',
                                color: row.answered ? 'grey.600' : 'inherit',
                                bgcolor: row.answered ? 'grey.300' : 'inherit',
                            }}
                            onClick={() => {
                                if (!row.answered) {
                                    onSelectQuestion(row);
                                }
                            }}
                        >
                            ${row.value}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        ))}
        </Box>
  );
}
export default GameBoard