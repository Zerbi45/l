import React, { useState, memo, useCallback } from 'react';
import { useGame } from '../contexts/GameContext';
import { Card, CreatureCard, CardType } from '../types/Card';
import './GameBoard.css';

const GameBoard: React.FC = memo(() => {
    const { player, opponent, currentTurn, gamePhase, playCard, attack, endTurn } = useGame();
    const [selectedAttacker, setSelectedAttacker] = useState<string | null>(null);
    const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

    const handleCardClick = useCallback((card: Card, isOpponent: boolean) => {
        if (gamePhase === 'main' && !isOpponent) {
            playCard(card.id);
        } else if (gamePhase === 'combat' && !isOpponent) {
            setSelectedAttacker(card.id);
        } else if (gamePhase === 'combat' && isOpponent && selectedAttacker) {
            attack(selectedAttacker, card.id);
            setSelectedAttacker(null);
            setSelectedTarget(null);
        }
    }, [gamePhase, playCard, attack, selectedAttacker]);

    const handleHeroClick = useCallback((isOpponent: boolean) => {
        if (gamePhase === 'combat' && !isOpponent && selectedAttacker) {
            attack(selectedAttacker, 'hero');
            setSelectedAttacker(null);
        }
    }, [gamePhase, attack, selectedAttacker]);

    return (
        <div className="game-board">
            <div className="opponent-zone">
                <div className="hero" onClick={() => handleHeroClick(true)}>
                    <h3>{opponent.name}</h3>
                    <p>PV: {opponent.health}</p>
                    <p>Éclats: {opponent.shards}</p>
                </div>
                <div className="battlefield">
                    {opponent.battlefield
                        .filter((card): card is CreatureCard => card.type === CardType.Creature)
                        .map((creature) => (
                            <div
                                key={creature.id}
                                className={`creature ${selectedTarget === creature.id ? 'selected' : ''}`}
                                onClick={() => handleCardClick(creature, true)}
                            >
                                <h4>{creature.name}</h4>
                                <p>ATK: {creature.attack}</p>
                                <p>PV: {creature.health}</p>
                            </div>
                        ))}
                </div>
                <div className="hand">
                    {opponent.hand.map((card: Card) => (
                        <div key={card.id} className="card-back">
                            <div className="card-content">
                                <h4>{card.name}</h4>
                                <p>Coût: {card.cost}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="game-info">
                <p>Tour: {currentTurn === 'player' ? 'Votre tour' : 'Tour adverse'}</p>
                <p>Phase: {gamePhase}</p>
                <button onClick={endTurn}>Fin du tour</button>
            </div>

            <div className="player-zone">
                <div className="battlefield">
                    {player.battlefield
                        .filter((card): card is CreatureCard => card.type === CardType.Creature)
                        .map((creature) => (
                            <div
                                key={creature.id}
                                className={`creature ${selectedAttacker === creature.id ? 'selected' : ''}`}
                                onClick={() => handleCardClick(creature, false)}
                            >
                                <h4>{creature.name}</h4>
                                <p>ATK: {creature.attack}</p>
                                <p>PV: {creature.health}</p>
                            </div>
                        ))}
                </div>
                <div className="hand">
                    {player.hand.map((card: Card) => (
                        <div
                            key={card.id}
                            className={`card ${player.shards >= card.cost ? 'playable' : ''}`}
                            onClick={() => handleCardClick(card, false)}
                        >
                            <div className="card-content">
                                <h4>{card.name}</h4>
                                <p>Coût: {card.cost}</p>
                                <p>{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="hero" onClick={() => handleHeroClick(false)}>
                    <h3>{player.name}</h3>
                    <p>PV: {player.health}</p>
                    <p>Éclats: {player.shards}</p>
                </div>
            </div>
        </div>
    );
});

GameBoard.displayName = 'GameBoard';

export default GameBoard; 