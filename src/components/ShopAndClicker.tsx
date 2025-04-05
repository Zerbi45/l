import React, { useState } from 'react';
import Clicker from './Clicker';
import CaseOpening from './CaseOpening';
import { useGold } from '../contexts/GoldContext';
import { Card, CardType, Rarity, CreatureCard } from '../types/Card';
import './ShopAndClicker.css';

const ShopAndClicker: React.FC = () => {
    const { gold, addGold } = useGold();
    const [isOpening, setIsOpening] = useState(false);
    const [openedCard, setOpenedCard] = useState<Card | null>(null);

    const handleOpenCase = async (caseId: string) => {
        setIsOpening(true);
        setOpenedCard(null);

        // Simuler un délai d'ouverture
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simuler l'obtention d'une carte
        const newCard: CreatureCard = {
            id: Math.random().toString(36).substr(2, 9),
            name: 'Carte Test',
            description: 'Une carte test',
            image: '/images/cards/test.jpg',
            rarity: Rarity.Common,
            type: CardType.Creature,
            cost: 1,
            attack: 2,
            health: 3
        };

        setOpenedCard(newCard);
        setIsOpening(false);
    };

    return (
        <div className="shop-and-clicker">
            <div className="clicker-section">
                <Clicker />
            </div>
            <div className="shop-section">
                <CaseOpening 
                    onOpen={handleOpenCase}
                    isOpening={isOpening}
                    openedCard={openedCard}
                />
            </div>
        </div>
    );
};

export default ShopAndClicker; 