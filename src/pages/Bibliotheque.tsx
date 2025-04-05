import React, { useState, useMemo } from 'react';
import { Card, CardType, Rarity } from '../types/Card';
import { CARDS } from '../data/cards';
import './Bibliotheque.css';

const Bibliotheque: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<CardType | 'all'>('all');
    const [selectedRarity, setSelectedRarity] = useState<Rarity | 'all'>('all');
    const [sortBy, setSortBy] = useState<'name' | 'cost' | 'rarity'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    // Statistiques de la collection
    const stats = useMemo(() => {
        const totalCards = CARDS.length;
        const cardsByType = CARDS.reduce((acc, card) => {
            acc[card.type] = (acc[card.type] || 0) + 1;
            return acc;
        }, {} as Record<CardType, number>);
        const cardsByRarity = CARDS.reduce((acc, card) => {
            acc[card.rarity] = (acc[card.rarity] || 0) + 1;
            return acc;
        }, {} as Record<Rarity, number>);

        return {
            totalCards,
            cardsByType,
            cardsByRarity
        };
    }, []);

    // Filtrage et tri des cartes
    const filteredCards = useMemo(() => {
        return CARDS
            .filter(card => {
                const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    card.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesType = selectedType === 'all' || card.type === selectedType;
                const matchesRarity = selectedRarity === 'all' || card.rarity === selectedRarity;
                return matchesSearch && matchesType && matchesRarity;
            })
            .sort((a, b) => {
                if (sortBy === 'name') {
                    return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                }
                if (sortBy === 'cost') {
                    return sortOrder === 'asc' ? a.cost - b.cost : b.cost - a.cost;
                }
                if (sortBy === 'rarity') {
                    const rarityOrder = { [Rarity.Common]: 0, [Rarity.Rare]: 1, [Rarity.Epic]: 2, [Rarity.Legendary]: 3 };
                    return sortOrder === 'asc' 
                        ? rarityOrder[a.rarity] - rarityOrder[b.rarity]
                        : rarityOrder[b.rarity] - rarityOrder[a.rarity];
                }
                return 0;
            });
    }, [searchTerm, selectedType, selectedRarity, sortBy, sortOrder]);

    const toggleFavorite = (cardId: string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(cardId)) {
                newFavorites.delete(cardId);
            } else {
                newFavorites.add(cardId);
            }
            return newFavorites;
        });
    };

    return (
        <div className="bibliotheque">
            <h1>Bibliothèque</h1>
            
            {/* Statistiques */}
            <div className="stats-panel">
                <h2>Statistiques de la Collection</h2>
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-label">Total des cartes:</span>
                        <span className="stat-value">{stats.totalCards}</span>
                    </div>
                    {Object.entries(stats.cardsByType).map(([type, count]) => (
                        <div key={type} className="stat-item">
                            <span className="stat-label">{type}:</span>
                            <span className="stat-value">{count}</span>
                        </div>
                    ))}
                    {Object.entries(stats.cardsByRarity).map(([rarity, count]) => (
                        <div key={rarity} className="stat-item">
                            <span className="stat-label">{rarity}:</span>
                            <span className="stat-value">{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher une carte..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="filters">
                <div className="filter-group">
                    <h3>Type</h3>
                    <div className="filter-buttons">
                        <button
                            className={`filter-button ${selectedType === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedType('all')}
                        >
                            Tous
                        </button>
                        {Object.values(CardType).map(type => (
                            <button
                                key={type}
                                className={`filter-button ${selectedType === type ? 'active' : ''}`}
                                onClick={() => setSelectedType(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <h3>Rareté</h3>
                    <div className="filter-buttons">
                        <button
                            className={`filter-button ${selectedRarity === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedRarity('all')}
                        >
                            Tous
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

                <div className="filter-group">
                    <h3>Trier par</h3>
                    <div className="filter-buttons">
                        <button
                            className={`filter-button ${sortBy === 'name' ? 'active' : ''}`}
                            onClick={() => setSortBy('name')}
                        >
                            Nom
                        </button>
                        <button
                            className={`filter-button ${sortBy === 'cost' ? 'active' : ''}`}
                            onClick={() => setSortBy('cost')}
                        >
                            Coût
                        </button>
                        <button
                            className={`filter-button ${sortBy === 'rarity' ? 'active' : ''}`}
                            onClick={() => setSortBy('rarity')}
                        >
                            Rareté
                        </button>
                        <button
                            className="filter-button"
                            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Grille de cartes */}
            <div className="cards-grid">
                {filteredCards.map(card => (
                    <div
                        key={card.id}
                        className={`card ${favorites.has(card.id) ? 'favorite' : ''}`}
                        onClick={() => setSelectedCard(card)}
                    >
                        <div className="card-header">
                            <h3>{card.name}</h3>
                            <button
                                className={`favorite-button ${favorites.has(card.id) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(card.id);
                                }}
                            >
                                ★
                            </button>
                        </div>
                        <img src={card.image} alt={card.name} />
                        <p className="card-type">{card.type}</p>
                        <p className="card-rarity">{card.rarity}</p>
                        <p className="card-cost">Coût: {card.cost}</p>
                        <p className="card-description">{card.description}</p>
                        {card.type === CardType.Creature && (
                            <div className="card-stats">
                                <span>ATK: {card.attack}</span>
                                <span>DEF: {card.health}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal de détails de la carte */}
            {selectedCard && (
                <div className="card-modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setSelectedCard(null)}>×</button>
                        <h2>{selectedCard.name}</h2>
                        <img src={selectedCard.image} alt={selectedCard.name} />
                        <div className="modal-details">
                            <p><strong>Type:</strong> {selectedCard.type}</p>
                            <p><strong>Rareté:</strong> {selectedCard.rarity}</p>
                            <p><strong>Coût:</strong> {selectedCard.cost}</p>
                            <p><strong>Description:</strong> {selectedCard.description}</p>
                            {selectedCard.type === CardType.Creature && (
                                <>
                                    <p><strong>Attaque:</strong> {selectedCard.attack}</p>
                                    <p><strong>Défense:</strong> {selectedCard.health}</p>
                                </>
                            )}
                            {selectedCard.type === CardType.Spell && (
                                <p><strong>Effet:</strong> {selectedCard.effect}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bibliotheque; 