import { Card, CreatureCard, InvokerCard } from './Card';

export interface Hero {
    name: string;
    power: string;
    powerUsed: boolean;
}

export interface Player {
    id: string;
    name: string;
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
    shards: number;
    deck: Card[];
    hand: Card[];
    battlefield: Card[];
    graveyard: Card[];
    hero: Hero;
    selectedInvoker?: InvokerCard;
} 