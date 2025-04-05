import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Library from './pages/Library';
import Game from './pages/Game';
import Boutique from './pages/Boutique';
import Bibliotheque from './pages/Bibliotheque';
import Parametres from './pages/Parametres';
import ShopAndClicker from './components/ShopAndClicker';
import Navigation from './components/Navigation';
import { GoldProvider } from './contexts/GoldContext';
import { GameProvider } from './contexts/GameContext';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <GameProvider>
                <GoldProvider>
                    <div className="app">
                        <Navigation />
                        <main className="main-content">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/library" element={<Library />} />
                                <Route path="/game" element={<Game />} />
                                <Route path="/boutique" element={<Boutique />} />
                                <Route path="/bibliotheque" element={<Bibliotheque />} />
                                <Route path="/parametres" element={<Parametres />} />
                                <Route path="/shop" element={<ShopAndClicker />} />
                            </Routes>
                        </main>
                    </div>
                </GoldProvider>
            </GameProvider>
        </Router>
    );
};

export default App; 