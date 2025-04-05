import React from 'react';
import { Card, CardType } from '../types/Card';
import './LibraryCollection.css';

interface LibraryCollectionProps {
    cards: Card[];
    onCardClick: (card: Card) => void;
}

const LibraryCollection: React.FC<LibraryCollectionProps> = ({ cards, onCardClick }) => {
    const renderCardStats = (card: Card) => {
        switch (card.type) {
            case CardType.Creature:
                return (
                    <>
                        <p>Attaque: {card.attack}</p>
                        <p>Santé: {card.health}</p>
                    </>
                );
            case CardType.Spell:
                return <p>Coût: {card.cost}</p>;
            default:
                return null;
        }
    };

    return (
        <div className="library-collection">
            {cards.map(card => (
                <div
                    key={card.id}
                    className="collection-card"
                    onClick={() => onCardClick(card)}
                >
                    <img src={card.image} alt={card.name} />
                    <div className="card-info">
                        <h3>{card.name}</h3>
                        <p className="description">{card.description}</p>
                        <div className="stats">
                            {renderCardStats(card)}
                        </div>
                        <p className={`rarity ${card.rarity.toLowerCase()}`}>
                            {card.rarity}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LibraryCollection; 