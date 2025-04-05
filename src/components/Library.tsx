import React, { useState, useMemo } from 'react';
import { Card, CardType, Rarity } from '../types/Card';
import './Library.css';

const Library: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<CardType | null>(null);
    const [selectedRarity, setSelectedRarity] = useState<Rarity | null>(null);
    const [sortBy, setSortBy] = useState<'name' | 'cost' | 'rarity'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [favorites, setFavorites] = useState<string[]>([]);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    // Simuler des données de cartes
    const cards: Card[] = [
        // Ajoutez vos cartes ici
    ];

    const filteredCards = useMemo(() => {
        return cards
            .filter(card => {
                const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    card.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesType = !selectedType || card.type === selectedType;
                const matchesRarity = !selectedRarity || card.rarity === selectedRarity;
                return matchesSearch && matchesType && matchesRarity;
            })
            .sort((a, b) => {
                if (sortBy === 'name') {
                    return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                } else if (sortBy === 'cost') {
                    return sortOrder === 'asc' ? a.cost - b.cost : b.cost - a.cost;
                } else {
                    return sortOrder === 'asc' ? a.rarity.localeCompare(b.rarity) : b.rarity.localeCompare(a.rarity);
                }
            });
    }, [cards, searchTerm, selectedType, selectedRarity, sortBy, sortOrder]);

    const toggleFavorite = (cardId: string) => {
        setFavorites(prev => 
            prev.includes(cardId) 
                ? prev.filter(id => id !== cardId)
                : [...prev, cardId]
        );
    };

    return (
        <div className="library">
            <div className="library-header">
                <h1>Bibliothèque</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Rechercher une carte..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="filters">
                <div className="type-filters">
                    <button
                        className={`filter-button ${selectedType === null ? 'active' : ''}`}
                        onClick={() => setSelectedType(null)}
                    >
                        Tous
                    </button>
                    <button
                        className={`filter-button ${selectedType === CardType.Creature ? 'active' : ''}`}
                        onClick={() => setSelectedType(CardType.Creature)}
                    >
                        Créatures
                    </button>
                    <button
                        className={`filter-button ${selectedType === CardType.Spell ? 'active' : ''}`}
                        onClick={() => setSelectedType(CardType.Spell)}
                    >
                        Sorts
                    </button>
                    <button
                        className={`filter-button ${selectedType === CardType.Invoker ? 'active' : ''}`}
                        onClick={() => setSelectedType(CardType.Invoker)}
                    >
                        Invocateurs
                    </button>
                </div>

                <div className="rarity-filters">
                    <button
                        className={`filter-button ${selectedRarity === null ? 'active' : ''}`}
                        onClick={() => setSelectedRarity(null)}
                    >
                        Toutes
                    </button>
                    {Object.values(Rarity).map(rarity => (
                        <button
                            key={rarity}
                            className={`filter-button ${selectedRarity === rarity ? 'active' : ''}`}
                            onClick={() => setSelectedRarity(rarity)}
                        >
                            {rarity}
                        </button>
                    ))}
                </div>
            </div>

            <div className="sort-options">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'name' | 'cost' | 'rarity')}>
                    <option value="name">Nom</option>
                    <option value="cost">Coût</option>
                    <option value="rarity">Rareté</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                    <option value="asc">Croissant</option>
                    <option value="desc">Décroissant</option>
                </select>
            </div>

            <div className="cards-grid">
                {filteredCards.map(card => (
                    <div
                        key={card.id}
                        className={`card ${favorites.includes(card.id) ? 'favorite' : ''}`}
                        onClick={() => setSelectedCard(card)}
                    >
                        <img src={card.image} alt={card.name} />
                        <h3>{card.name}</h3>
                        <p className="description">{card.description}</p>
                        <div className="card-info">
                            <p>Coût: {card.cost}</p>
                            {card.type === CardType.Creature && (
                                <>
                                    <p>Attaque: {card.attack}</p>
                                    <p>Santé: {card.health}</p>
                                </>
                            )}
                            <p className={`rarity ${card.rarity.toLowerCase()}`}>
                                {card.rarity}
                            </p>
                        </div>
                        <button
                            className="favorite-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(card.id);
                            }}
                        >
                            {favorites.includes(card.id) ? '★' : '☆'}
                        </button>
                    </div>
                ))}
            </div>

            {selectedCard && (
                <div className="card-modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setSelectedCard(null)}>×</button>
                        <img src={selectedCard.image} alt={selectedCard.name} />
                        <h2>{selectedCard.name}</h2>
                        <p className="description">{selectedCard.description}</p>
                        <div className="card-details">
                            <p>Type: {selectedCard.type}</p>
                            <p>Coût: {selectedCard.cost}</p>
                            {selectedCard.type === CardType.Creature && (
                                <>
                                    <p>Attaque: {selectedCard.attack}</p>
                                    <p>Santé: {selectedCard.health}</p>
                                </>
                            )}
                            {selectedCard.type === CardType.Spell && (
                                <p>Effet: {selectedCard.effect}</p>
                            )}
                            {selectedCard.type === CardType.Invoker && (
                                <>
                                    <div className="ability">
                                        <h4>Passif: {selectedCard.passive.name}</h4>
                                        <p>{selectedCard.passive.description}</p>
                                    </div>
                                    <div className="ability">
                                        <h4>Ultime: {selectedCard.ultimate.name}</h4>
                                        <p>{selectedCard.ultimate.description}</p>
                                        <p>Temps de charge: {selectedCard.ultimate.chargeTime} tours</p>
                                    </div>
                                    <div className="stats">
                                        <p>Santé: {selectedCard.stats.health}</p>
                                        <p>Régénération de Mana: {selectedCard.stats.manaRegen}</p>
                                    </div>
                                </>
                            )}
                            <p className={`rarity ${selectedCard.rarity.toLowerCase()}`}>
                                {selectedCard.rarity}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Library; 