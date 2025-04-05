import { Card, CardType, Rarity, SpellEffect, TargetType } from '../types/Card';

export const CARDS: Card[] = [
    {
        id: '1',
        name: 'Dragon Ancien',
        description: 'Un puissant dragon légendaire qui crache des flammes.',
        rarity: Rarity.Legendary,
        type: CardType.Creature,
        cost: 8,
        attack: 8,
        health: 8,
        image: '/images/cards/dragon-ancien.jpg'
    },
    {
        id: '2',
        name: 'Boule de Feu',
        description: 'Inflige 3 points de dégâts à une cible.',
        rarity: Rarity.Common,
        type: CardType.Spell,
        cost: 2,
        effect: SpellEffect.Damage,
        targetType: TargetType.Creature,
        value: 3,
        image: '/images/cards/boule-de-feu.jpg'
    },
    {
        id: '3',
        name: 'Soin',
        description: 'Restaure 5 points de vie à une cible.',
        rarity: Rarity.Common,
        type: CardType.Spell,
        cost: 2,
        effect: SpellEffect.Heal,
        targetType: TargetType.Creature,
        value: 5,
        image: '/images/cards/soin.jpg'
    },
    {
        id: '4',
        name: 'Éclat de Mana',
        description: 'Ajoute 2 cristaux de mana à votre réserve.',
        rarity: Rarity.Rare,
        type: CardType.Spell,
        cost: 1,
        effect: SpellEffect.Buff,
        targetType: TargetType.Player,
        value: 2,
        image: '/images/cards/eclat-de-mana.jpg'
    },
    {
        id: '5',
        name: 'Éclat de Puissance',
        description: 'Augmente l\'attaque d\'une créature de 3 points.',
        rarity: Rarity.Rare,
        type: CardType.Spell,
        cost: 2,
        effect: SpellEffect.Buff,
        targetType: TargetType.Creature,
        value: 3,
        image: '/images/cards/eclat-de-puissance.jpg'
    },
    {
        id: '6',
        name: 'Éclat de Sagesse',
        description: 'Pioche 2 cartes.',
        rarity: Rarity.Epic,
        type: CardType.Spell,
        cost: 3,
        effect: SpellEffect.Draw,
        targetType: TargetType.Player,
        value: 2,
        image: '/images/cards/eclat-de-sagesse.jpg'
    },
    {
        id: '7',
        name: 'Éclat de Légende',
        description: 'Invoque une créature légendaire aléatoire.',
        rarity: Rarity.Legendary,
        type: CardType.Spell,
        cost: 5,
        effect: SpellEffect.Buff,
        targetType: TargetType.Player,
        value: 1,
        image: '/images/cards/eclat-de-legende.jpg'
    }
]; 