import { Card, CardType, Rarity } from '../types/Card';
import { GAME_CONFIG, INITIAL_HEALTH, INITIAL_MANA, INITIAL_MAX_MANA, INITIAL_SHARDS } from '../data/gameConfig';

export const drawCards = (deck: Card[], count: number): [Card[], Card[]] => {
    const drawnCards = deck.slice(0, count);
    const remainingDeck = deck.slice(count);
    return [drawnCards, remainingDeck];
};

export const createStarterDeck = (): Card[] => {
    // Créer un deck de départ avec des cartes de base
    return [
        {
            id: '1',
            name: 'Soldat',
            description: 'Un soldat de base',
            rarity: Rarity.Common,
            type: CardType.Creature,
            cost: 1,
            attack: 2,
            health: 2,
            image: '/images/cards/soldat.jpg'
        },
        {
            id: '2',
            name: 'Archer',
            description: 'Un archer de base',
            rarity: Rarity.Common,
            type: CardType.Creature,
            cost: 2,
            attack: 3,
            health: 2,
            image: '/images/cards/archer.jpg'
        },
        {
            id: '3',
            name: 'Chevalier',
            description: 'Un chevalier de base',
            rarity: Rarity.Common,
            type: CardType.Creature,
            cost: 3,
            attack: 4,
            health: 4,
            image: '/images/cards/chevalier.jpg'
        }
    ];
};

export const initializePlayer = (name: string) => {
    const deck = createStarterDeck();
    const [hand, remainingDeck] = drawCards(deck, GAME_CONFIG.startingHandSize);

    return {
        name,
        health: INITIAL_HEALTH,
        maxHealth: INITIAL_HEALTH,
        mana: INITIAL_MANA,
        maxMana: INITIAL_MAX_MANA,
        shards: INITIAL_SHARDS,
        deck: remainingDeck,
        hand,
        battlefield: [],
        graveyard: [],
        hero: {
            name: 'Hero',
            power: 'dealDamage'
        }
    };
}; 