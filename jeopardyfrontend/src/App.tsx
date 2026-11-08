import './App';
import Game from './pages/Game'
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/game/:pin' element={<Game/>}/>
            <Route path='/' element={<Home/>}/>
        </Routes>
        </BrowserRouter>
        
    );
}
export default App;

