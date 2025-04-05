import React, { useState, useEffect } from 'react';
import { useGold } from '../contexts/GoldContext';
import { Card } from '../types/Card';
import './CaseOpening.css';

interface CaseOpeningProps {
    onOpen: (caseId: string) => void;
    isOpening: boolean;
    openedCard: Card | null;
}

const CaseOpening: React.FC<CaseOpeningProps> = ({ onOpen, isOpening, openedCard }) => {
    const { gold } = useGold();
    const [selectedCase, setSelectedCase] = useState<string | null>(null);
    const [showCard, setShowCard] = useState(false);

    const cases = [
        { id: 'common', name: 'Caisse Commune', price: 100, image: '/images/cases/common.jpg' },
        { id: 'rare', name: 'Caisse Rare', price: 500, image: '/images/cases/rare.jpg' },
        { id: 'epic', name: 'Caisse Épique', price: 1000, image: '/images/cases/epic.jpg' },
        { id: 'legendary', name: 'Caisse Légendaire', price: 5000, image: '/images/cases/legendary.jpg' }
    ];

    useEffect(() => {
        if (openedCard) {
            setShowCard(true);
        }
    }, [openedCard]);

    const handleOpen = (caseId: string) => {
        setSelectedCase(caseId);
        setShowCard(false);
        onOpen(caseId);
    };

    const renderStats = (card: Card) => {
        if (card.type === 'Creature') {
            return (
                <div className="card-stats">
                    <div className="stat">
                        <span className="stat-name">Attaque:</span>
                        <span className="stat-value">{card.attack}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-name">Vie:</span>
                        <span className="stat-value">{card.health}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="case-opening">
            <div className="cases-grid">
                {cases.map((c) => (
                    <div 
                        key={c.id} 
                        className={`case-item ${selectedCase === c.id && isOpening ? 'opening' : ''}`}
                    >
                        <img src={c.image} alt={c.name} className="case-image" />
                        <h3>{c.name}</h3>
                        <p>{c.price} pièces d'or</p>
                        <button 
                            onClick={() => handleOpen(c.id)}
                            disabled={gold < c.price || isOpening}
                            className="open-button"
                        >
                            Ouvrir
                        </button>
                    </div>
                ))}
            </div>
            <div className={`opened-card-container ${showCard ? 'show' : ''}`}>
                {openedCard && (
                    <div className="opened-card">
                        <img src={openedCard.image} alt={openedCard.name} className="card-image" />
                        <div className="card-details">
                            <h3>{openedCard.name}</h3>
                            <p className="card-rarity">{openedCard.rarity}</p>
                            <p className="card-description">{openedCard.description}</p>
                            {renderStats(openedCard)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaseOpening; 