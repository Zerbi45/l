import { Card, CardType, Rarity, SpellEffect, TargetType, InvokerCard, SpellCard } from '../types/Card';

export interface Case {
    name: string;
    price: number;
    rarityProbabilities: {
        [key in Rarity]: number;
    };
}

export const cases: Case[] = [
    {
        name: "Case Commune",
        price: 100,
        rarityProbabilities: {
            [Rarity.Common]: 0.75,
            [Rarity.Rare]: 0.20,
            [Rarity.Epic]: 0.04,
            [Rarity.Legendary]: 0.01
        }
    },
    {
        name: "Case Rare",
        price: 250,
        rarityProbabilities: {
            [Rarity.Common]: 0.50,
            [Rarity.Rare]: 0.35,
            [Rarity.Epic]: 0.10,
            [Rarity.Legendary]: 0.05
        }
    },
    {
        name: "Case Épique",
        price: 500,
        rarityProbabilities: {
            [Rarity.Common]: 0,
            [Rarity.Rare]: 0.45,
            [Rarity.Epic]: 0.35,
            [Rarity.Legendary]: 0.20
        }
    }
];

export const CLICKER_CONFIG = {
    baseGoldPerClick: 1,
    upgradeMultiplierCost: 100, // Coût pour augmenter le multiplicateur
    upgradeMultiplierValue: 0.1, // Augmentation du multiplicateur par upgrade
    autoClickerCost: 500, // Coût d'un auto-clicker
    autoClickerInterval: 500, // Milliseconds between auto clicks
    maxAutoClickers: 10 // Maximum number of auto clickers
};

export const GAME_CONFIG = {
    startingHandSize: 3,
    maxHandSize: 7,
    maxBattlefieldSize: 7,
    turnTimeLimit: 60,
    manaCap: 10,
    DRAW_PER_TURN: 1,
    MAX_SHARDS_PER_TURN: 1
};

export const INITIAL_HEALTH = 30;
export const INITIAL_MANA = 1;
export const INITIAL_MAX_MANA = 1;
export const INITIAL_SHARDS = 0;

export const INITIAL_PLAYER_STATE = {
    health: INITIAL_HEALTH,
    maxHealth: INITIAL_HEALTH,
    mana: INITIAL_MANA,
    maxMana: INITIAL_MAX_MANA,
    shards: INITIAL_SHARDS,
    deck: [],
    hand: [],
    battlefield: [],
    graveyard: [],
    hero: {
        name: '',
        power: '',
        powerUsed: false
    }
};

export const HEROES = [
    {
        id: '1',
        name: 'Mage',
        description: 'Maître des arcanes anciens',
        rarity: Rarity.Legendary,
        type: CardType.Invoker,
        cost: 0,
        image: '/images/heroes/mage.jpg',
        passive: {
            name: 'Maîtrise des Arcanes',
            description: 'Gagne 1 mana supplémentaire par tour'
        },
        ultimate: {
            name: 'Explosion Arcanique',
            description: 'Inflige 3 dégâts à une cible',
            chargeTime: 3
        },
        stats: {
            health: 30,
            manaRegen: 1
        }
    },
    {
        id: '2',
        name: 'Prêtre',
        description: 'Guérisseur sacré',
        rarity: Rarity.Legendary,
        type: CardType.Invoker,
        cost: 0,
        image: '/images/heroes/pretre.jpg',
        passive: {
            name: 'Soin Divin',
            description: 'Soigne 1 point de vie à une créature alliée par tour'
        },
        ultimate: {
            name: 'Résurrection',
            description: 'Ressuscite une créature alliée morte avec tous ses points de vie',
            chargeTime: 4
        },
        stats: {
            health: 30,
            manaRegen: 1
        }
    }
];

export const CREATURES: Card[] = [
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

export const SPELLS: Card[] = [
    {
        id: '1',
        name: 'Boule de Feu',
        description: 'Inflige 3 dégâts à une cible',
        rarity: Rarity.Common,
        type: CardType.Spell,
        cost: 3,
        effect: SpellEffect.Damage,
        targetType: TargetType.Creature,
        value: 3,
        image: '/images/cards/boule-de-feu.jpg'
    },
    {
        id: '2',
        name: 'Soin',
        description: 'Soigne 5 points de vie',
        rarity: Rarity.Common,
        type: CardType.Spell,
        cost: 3,
        effect: SpellEffect.Heal,
        targetType: TargetType.Creature,
        value: 5,
        image: '/images/cards/soin.jpg'
    }
];

export const SHARDS: SpellCard[] = [
    {
        id: '1',
        name: 'Éclat de Mana',
        description: 'Génère 1 point de mana',
        rarity: Rarity.Common,
        type: CardType.Spell,
        cost: 0,
        effect: SpellEffect.GainMana,
        targetType: TargetType.Player,
        value: 1,
        image: '/images/cards/eclat-mana.jpg'
    }
]; 