import { useState } from "react";
import { Contestant } from "../../data/contestants.data";
import { TableContainer } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Box from "@mui/material/Box";


export interface LeaderboardProps {
    contestants: Contestant[]
}

function Leaderboard({ contestants }: LeaderboardProps) {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}} >
            {contestants.map((contestant: Contestant) => (
                    <TableContainer sx={{width: '150px'}}>
                        <Table>
                            <TableHead>
                                <TableCell sx={{fontWeight: 'bold', fontSize: '2em'}}>
                                    {contestant.name}
                                </TableCell>
                            </TableHead>
                            <TableRow>
                                <TableCell sx={{fontSize: '2em'}}>
                                    {contestant.score}
                                </TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
        ))}
        </Box>
        
    )
}
export default Leaderboard