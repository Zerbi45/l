import React from 'react';
import GameBoard from '../components/GameBoard';
import '../styles/Game.css';

const Game: React.FC = () => {
    return (
        <div className="game-page">
            <GameBoard />
        </div>
    );
};

export default Game; 