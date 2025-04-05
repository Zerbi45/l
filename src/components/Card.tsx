import React, { useState } from 'react';
import { Card as CardType } from '../types/Card';
import './Card.css';

interface CardProps {
    card: CardType;
    onClick?: () => void;
    isSelected?: boolean;
    isPlayable?: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, isSelected = false, isPlayable = false }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div
            className={`card ${isSelected ? 'selected' : ''} ${isPlayable ? 'playable' : ''}`}
            onClick={onClick}
        >
            <div className="card-content">
                {card.image && (
                    <div className="card-image-container">
                        <img
                            src={card.image}
                            alt={card.name}
                            onLoad={handleImageLoad}
                            className={imageLoaded ? 'loaded' : 'loading'}
                        />
                    </div>
                )}
                <div className="card-info">
                    <h3 className="card-name">{card.name}</h3>
                    <p className="card-description">{card.description}</p>
                    <div className="card-stats">
                        <span className="card-cost">Coût: {card.cost}</span>
                        {card.type === 'Creature' && (
                            <>
                                <span className="card-attack">Attaque: {card.attack}</span>
                                <span className="card-health">Santé: {card.health}</span>
                            </>
                        )}
                    </div>
                    <span className={`card-rarity ${card.rarity.toLowerCase()}`}>
                        {card.rarity}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card; 