import React from 'react';
import { useGame } from '../contexts/GameContext';
import Card from '../components/Card';
import '../styles/Library.css';

const Library: React.FC = () => {
    const { player } = useGame();

    return (
        <div className="library-container">
            <h1>Bibliothèque</h1>
            <div className="library-content">
                <div className="library-section">
                    <h2>Votre Collection</h2>
                    <div className="cards-grid">
                        {player.deck.map((card) => (
                            <Card
                                key={card.id}
                                card={card}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Library; 