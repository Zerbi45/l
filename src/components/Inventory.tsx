import React, { useState, useEffect } from 'react';
import './Inventory.css';
import { Card, Rarity, CardType } from '../types/Card';
import { loadInventory } from '../utils/inventoryUtils';
import { useGold } from '../contexts/GoldContext';

interface InventoryProps {
    cards: Card[];
}

const Inventory: React.FC<InventoryProps> = ({ cards }) => {
    const [inventory, setInventory] = useState<Card[]>([]);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    useEffect(() => {
        const loadedInventory = loadInventory();
        setInventory(loadedInventory.cards);
    }, []);

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
        <div className="inventory">
            <h2>Inventaire</h2>
            <div className="cards-grid">
                {cards.map((card) => (
                    <div key={card.id} className="card-item">
                        <img src={card.image} alt={card.name} />
                        <h3>{card.name}</h3>
                        <p className="description">{card.description}</p>
                        <div className="stats">
                            {renderCardStats(card)}
                        </div>
                        <p className={`rarity ${card.rarity.toLowerCase()}`}>
                            {card.rarity}
                        </p>
                    </div>
                ))}
            </div>

            {selectedCard && (
                <div className="card-details">
                    <h3>{selectedCard.name}</h3>
                    <p>{selectedCard.description}</p>
                    <div className="card-stats">
                        {renderCardStats(selectedCard)}
                    </div>
                    <button onClick={() => setSelectedCard(null)}>Fermer</button>
                </div>
            )}
        </div>
    );
};

export default Inventory; 