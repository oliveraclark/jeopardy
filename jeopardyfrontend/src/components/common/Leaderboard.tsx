import { Contestant } from "../../data/contestants.data";
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from "@mui/material";

export interface LeaderboardProps {
    contestants: Contestant[];
}

function Leaderboard({ contestants }: LeaderboardProps) {
    const sortedContestants = [...contestants].sort(
        (a, b) => b.score - a.score
    );

    return (
        <TableContainer
            component={Paper}
            sx={{
                maxWidth: 600,
                width: "100%",
                borderRadius: 2
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: '2em', fontWeight: "bold" }}>
                            Rank
                        </TableCell>
                        <TableCell sx={{ fontSize: '2em', fontWeight: "bold" }}>
                            Contestant
                        </TableCell>
                        <TableCell sx={{ fontSize: '2em', fontWeight: "bold" }} align="right">
                            Score
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {sortedContestants.map((contestant, index) => (
                        <TableRow key={contestant.id}>
                            <TableCell sx={{fontSize: "2em"}}>{index + 1}</TableCell>

                            <TableCell sx={{fontSize: "2em"}}>
                                {contestant.name}
                            </TableCell>

                            <TableCell sx={{fontSize: "2em"}} align="right">
                                {contestant.score}
                            </TableCell>
                        </TableRow>
                    ))}

                    {contestants.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                No contestants yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Leaderboard;