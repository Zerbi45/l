import { InvokerCard, CardType, Rarity } from '../types/Card';

export const INVOKERS: InvokerCard[] = [
    {
        id: 'invoker1',
        name: 'Archimage',
        type: CardType.Invoker,
        rarity: Rarity.Legendary,
        cost: 0,
        description: 'Maître des arcanes anciens',
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
            health: 20,
            manaRegen: 2
        },
        image: '/images/invokers/archimage.jpg'
    },
    {
        id: 'invoker2',
        name: 'Nécromancien',
        type: CardType.Invoker,
        rarity: Rarity.Legendary,
        cost: 0,
        description: 'Maître des morts-vivants',
        passive: {
            name: 'Appel des Morts',
            description: 'Gagne 1 charge d\'ultime quand une créature alliée meurt'
        },
        ultimate: {
            name: 'Résurrection',
            description: 'Ressuscite une créature alliée morte',
            chargeTime: 4
        },
        stats: {
            health: 25,
            manaRegen: 1
        },
        image: '/images/invokers/necromancien.jpg'
    },
    {
        id: 'invoker3',
        name: 'Druide',
        type: CardType.Invoker,
        rarity: Rarity.Epic,
        cost: 0,
        description: 'Gardien de la nature',
        passive: {
            name: 'Croissance Naturelle',
            description: 'Donne +1/+1 à une créature alliée par tour'
        },
        ultimate: {
            name: 'Renaissance',
            description: 'Soigne toutes les créatures alliées de 5 points de vie',
            chargeTime: 3
        },
        stats: {
            health: 30,
            manaRegen: 1
        },
        image: '/images/invokers/druide.jpg'
    },
    {
        id: 'invoker4',
        name: 'Démoniste',
        type: CardType.Invoker,
        rarity: Rarity.Epic,
        cost: 0,
        description: 'Invocateur de démons',
        passive: {
            name: 'Pacte Démoniaque',
            description: 'Pioche une carte quand une créature alliée meurt'
        },
        ultimate: {
            name: 'Invocation Démoniaque',
            description: 'Invoque un démon aléatoire',
            chargeTime: 4
        },
        stats: {
            health: 25,
            manaRegen: 1
        },
        image: '/images/invokers/demoniste.jpg'
    },
    {
        id: 'invoker5',
        name: 'Paladin',
        type: CardType.Invoker,
        rarity: Rarity.Epic,
        cost: 0,
        description: 'Chevalier sacré',
        passive: {
            name: 'Bénédiction Divine',
            description: 'Donne +1 de santé à une créature alliée par tour'
        },
        ultimate: {
            name: 'Jugement Divin',
            description: 'Détruit une créature ennemie et soigne le héros de 5 points de vie',
            chargeTime: 4
        },
        stats: {
            health: 30,
            manaRegen: 1
        },
        image: '/images/invokers/paladin.jpg'
    },
    {
        id: 'invoker6',
        name: 'Chasseur',
        type: CardType.Invoker,
        rarity: Rarity.Rare,
        cost: 0,
        description: 'Maître des bêtes',
        passive: {
            name: 'Maîtrise des Bêtes',
            description: 'Donne +1 d\'attaque à une créature alliée par tour'
        },
        ultimate: {
            name: 'Tir Précis',
            description: 'Inflige 5 dégâts à une cible, ignore l\'armure',
            chargeTime: 3
        },
        stats: {
            health: 25,
            manaRegen: 1
        },
        image: '/images/invokers/chasseur.jpg'
    },
    {
        id: 'invoker7',
        name: 'Chaman',
        type: CardType.Invoker,
        rarity: Rarity.Rare,
        cost: 0,
        description: 'Maître des éléments',
        passive: {
            name: 'Appel des Éléments',
            description: 'Soigne 2 points de vie à une créature alliée par tour'
        },
        ultimate: {
            name: 'Totem Élémentaire',
            description: 'Invoque un totem élémentaire aléatoire',
            chargeTime: 3
        },
        stats: {
            health: 25,
            manaRegen: 1
        },
        image: '/images/invokers/chaman.jpg'
    },
    {
        id: 'invoker8',
        name: 'Voleur',
        type: CardType.Invoker,
        rarity: Rarity.Rare,
        cost: 0,
        description: 'Maître de l\'ombre',
        passive: {
            name: 'Vol à la Tire',
            description: 'Vole une carte de la main de l\'adversaire par tour'
        },
        ultimate: {
            name: 'Assassinat',
            description: 'Détruit une créature ennemie avec 3 points de vie ou moins',
            chargeTime: 3
        },
        stats: {
            health: 20,
            manaRegen: 1
        },
        image: '/images/invokers/voleur.jpg'
    },
    {
        id: 'invoker9',
        name: 'Guerrier',
        type: CardType.Invoker,
        rarity: Rarity.Common,
        cost: 0,
        description: 'Maître des armes',
        passive: {
            name: 'Endurance',
            description: 'Gagne 1 point de santé maximum par tour'
        },
        ultimate: {
            name: 'Fureur',
            description: 'Donne +2/+2 à toutes les créatures alliées',
            chargeTime: 4
        },
        stats: {
            health: 30,
            manaRegen: 1
        },
        image: '/images/invokers/guerrier.jpg'
    },
    {
        id: 'invoker10',
        name: 'Prêtre',
        type: CardType.Invoker,
        rarity: Rarity.Common,
        cost: 0,
        description: 'Guérisseur sacré',
        passive: {
            name: 'Soin Divin',
            description: 'Soigne 1 point de vie à une créature alliée par tour'
        },
        ultimate: {
            name: 'Résurrection',
            description: 'Ressuscite une créature alliée morte avec tous ses points de vie',
            chargeTime: 5
        },
        stats: {
            health: 25,
            manaRegen: 1
        },
        image: '/images/invokers/pretre.jpg'
    }
]; 