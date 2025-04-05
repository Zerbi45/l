import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardType, InvokerCard } from '../types/Card';
import './NewGame.css';

const NewGame: React.FC = () => {
    const navigate = useNavigate();
    const [selectedHero, setSelectedHero] = useState<InvokerCard | null>(null);

    // Simuler des données d'invocateurs
    const heroes: InvokerCard[] = [
        // Ajoutez vos invocateurs ici
    ];

    const handleStartGame = () => {
        if (selectedHero) {
            // Sauvegarder le héros sélectionné et démarrer le jeu
            navigate('/game');
        }
    };

    return (
        <div className="new-game">
            <h1>Nouvelle Partie</h1>
            <div className="heroes-grid">
                {heroes.map(hero => (
                    <div
                        key={hero.id}
                        className={`hero-card ${selectedHero?.id === hero.id ? 'selected' : ''}`}
                        onClick={() => setSelectedHero(hero)}
                    >
                        <img src={hero.image} alt={hero.name} />
                        <div className="hero-info">
                            <h3>{hero.name}</h3>
                            <p>{hero.description}</p>
                            <div className="ability">
                                <h4>Passif: {hero.passive.name}</h4>
                                <p>{hero.passive.description}</p>
                            </div>
                            <div className="ability">
                                <h4>Ultime: {hero.ultimate.name}</h4>
                                <p>{hero.ultimate.description}</p>
                                <p>Temps de charge: {hero.ultimate.chargeTime} tours</p>
                            </div>
                            <div className="stats">
                                <p>Santé: {hero.stats.health}</p>
                                <p>Régénération de Mana: {hero.stats.manaRegen}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="start-button"
                onClick={handleStartGame}
                disabled={!selectedHero}
            >
                Démarrer la partie
            </button>
        </div>
    );
};

export default NewGame; 