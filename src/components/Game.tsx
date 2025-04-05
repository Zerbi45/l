import React from 'react';
import GameBoard from './GameBoard';
import './Game.css';

const Game: React.FC = () => {
    return (
        <div className="game-container">
            <h2>Jeu</h2>
            <GameBoard />
        </div>
    );
};

export default Game; 