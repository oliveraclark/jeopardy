import React, { useEffect, useState } from 'react';
import connection from './singalRConnection';
import './App';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Game from './pages/Game'
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/game' element={<Game/>}/>
            <Route path='/' element={<Home/>}/>
        </Routes>
        </BrowserRouter>
        
    );
}
export default App;

