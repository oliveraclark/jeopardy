import React, { useEffect, useState } from 'react';
import connection from './singalRConnection';
import './App';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Home from './pages/Home'

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
            <Home/>
        </Box>
        
    );
}
export default App;

