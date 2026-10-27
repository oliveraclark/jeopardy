import React, { useEffect, useState } from 'react';
import connection from './singalRConnection';
import './App';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Game from './pages/Game'

function App() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Game/>
        </Box>
        
    );
}
export default App;

