import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { Card, CreatureCard, InvokerCard, CardType } from '../types/Card';
import { Player } from '../types/Player';
import { GAME_CONFIG, INITIAL_PLAYER_STATE } from '../data/gameConfig';
import { drawCards } from '../utils/deckUtils';

interface GameContextType {
    player: Player;
    opponent: Player;
    currentTurn: 'player' | 'opponent';
    gamePhase: 'draw' | 'main' | 'combat' | 'end';
    isGameOver: boolean;
    winner: string | null;
    startNewGame: (invoker: InvokerCard) => void;
    playCard: (cardId: string) => void;
    attack: (attackerId: string, defenderId: string) => void;
    endTurn: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [player, setPlayer] = useState<Player>({
        ...INITIAL_PLAYER_STATE,
        id: 'player1',
        name: 'Joueur'
    });
    const [opponent, setOpponent] = useState<Player>({
        ...INITIAL_PLAYER_STATE,
        id: 'player2',
        name: 'Adversaire'
    });
    const [currentTurn, setCurrentTurn] = useState<'player' | 'opponent'>('player');
    const [gamePhase, setGamePhase] = useState<'draw' | 'main' | 'combat' | 'end'>('draw');
    const [isGameOver, setIsGameOver] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    const startNewGame = useCallback((invoker: InvokerCard) => {
        setPlayer({
            ...INITIAL_PLAYER_STATE,
            id: 'player1',
            name: 'Joueur',
            selectedInvoker: invoker
        });
        setOpponent({
            ...INITIAL_PLAYER_STATE,
            id: 'player2',
            name: 'Adversaire'
        });
        setCurrentTurn('player');
        setGamePhase('draw');
        setIsGameOver(false);
        setWinner(null);
    }, []);

    const playCard = useCallback((cardId: string) => {
        const card = player.hand.find(c => c.id === cardId);
        if (!card || player.shards < card.cost) return;

        setPlayer(prev => ({
            ...prev,
            shards: prev.shards - card.cost,
            hand: prev.hand.filter(c => c.id !== cardId),
            battlefield: [...prev.battlefield, card]
        }));
    }, [player.hand, player.shards]);

    const attack = useCallback((attackerId: string, defenderId: string) => {
        const attacker = player.battlefield.find(card => card.id === attackerId);
        const defender = opponent.battlefield.find(card => card.id === defenderId);

        if (!attacker || !defender || attacker.type !== CardType.Creature || defender.type !== CardType.Creature) {
            return;
        }

        const attackerCard = attacker as CreatureCard;
        const defenderCard = defender as CreatureCard;

        defenderCard.health -= attackerCard.attack;
        attackerCard.health -= defenderCard.attack;

        const updatedPlayerBattlefield = player.battlefield.filter(card => {
            if (card.id === attackerId && card.type === CardType.Creature) {
                return (card as CreatureCard).health > 0;
            }
            return true;
        });

        const updatedOpponentBattlefield = opponent.battlefield.filter(card => {
            if (card.id === defenderId && card.type === CardType.Creature) {
                return (card as CreatureCard).health > 0;
            }
            return true;
        });

        setPlayer(prev => ({
            ...prev,
            battlefield: updatedPlayerBattlefield
        }));

        setOpponent(prev => ({
            ...prev,
            battlefield: updatedOpponentBattlefield
        }));
    }, [player.battlefield, opponent.battlefield]);

    const drawPhase = useCallback(() => {
        if (currentTurn === 'player') {
            if (opponent.deck.length > 0) {
                const [drawnCards, remainingDeck] = drawCards(opponent.deck, GAME_CONFIG.DRAW_PER_TURN);
                setOpponent(prev => ({
                    ...prev,
                    deck: remainingDeck,
                    hand: [...prev.hand, ...drawnCards],
                    shards: Math.min(
                        prev.shards + GAME_CONFIG.MAX_SHARDS_PER_TURN,
                        prev.maxMana
                    )
                }));
            }
        } else {
            if (player.deck.length > 0) {
                const [drawnCards, remainingDeck] = drawCards(player.deck, GAME_CONFIG.DRAW_PER_TURN);
                setPlayer(prev => ({
                    ...prev,
                    deck: remainingDeck,
                    hand: [...prev.hand, ...drawnCards],
                    shards: Math.min(
                        prev.shards + GAME_CONFIG.MAX_SHARDS_PER_TURN,
                        prev.maxMana
                    )
                }));
            }
        }
    }, [currentTurn, player.deck.length, opponent.deck.length]);

    const endTurn = useCallback(() => {
        drawPhase();
        setGamePhase('draw');
    }, [drawPhase]);

    const value = useMemo(() => ({
        player,
        opponent,
        currentTurn,
        gamePhase,
        isGameOver,
        winner,
        startNewGame,
        playCard,
        attack,
        endTurn
    }), [
        player,
        opponent,
        currentTurn,
        gamePhase,
        isGameOver,
        winner,
        startNewGame,
        playCard,
        attack,
        endTurn
    ]);

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}; 