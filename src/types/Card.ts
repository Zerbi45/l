export enum CardType {
    Creature = 'Creature',
    Spell = 'Spell',
    Invoker = 'Invoker'
}

export enum Rarity {
    Common = 'Common',
    Rare = 'Rare',
    Epic = 'Epic',
    Legendary = 'Legendary'
}

export enum SpellEffect {
    Damage = 'damage',
    Heal = 'heal',
    Draw = 'draw',
    Buff = 'buff',
    Debuff = 'debuff',
    GainMana = 'gainMana'
}

export enum TargetType {
    Creature = 'Creature',
    Player = 'Player',
    All = 'All'
}

export interface BaseCard {
    id: string;
    name: string;
    description: string;
    rarity: Rarity;
    type: CardType;
    cost: number;
    image: string;
}

export interface CreatureCard extends BaseCard {
    type: CardType.Creature;
    attack: number;
    health: number;
}

export interface SpellCard extends BaseCard {
    type: CardType.Spell;
    effect: SpellEffect;
    targetType: TargetType;
    value: number;
}

export interface InvokerAbility {
    name: string;
    description: string;
    chargeTime?: number;
}

export interface InvokerStats {
    health: number;
    manaRegen: number;
}

export interface InvokerCard extends BaseCard {
    type: CardType.Invoker;
    passive: InvokerAbility;
    ultimate: InvokerAbility;
    stats: InvokerStats;
}

export type Card = CreatureCard | SpellCard | InvokerCard;

export interface Player {
    id: string;
    name: string;
    health: number;
    mana: number;
    maxMana: number;
    deck: Card[];
    hand: Card[];
    battlefield: CreatureCard[];
    selectedInvoker?: InvokerCard;
}

export interface PlayerInventory {
    cards: Card[];
}

export interface CaseType {
    name: string;
    price: number;
    rarityProbabilities: {
        [key in Rarity]: number;
    };
} 