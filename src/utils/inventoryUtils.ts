import { Card, PlayerInventory, CaseType } from '../types/Card';
import { removeGold } from './bankAccount';

const INVENTORY_KEY = 'player_inventory';

export const loadInventory = (): PlayerInventory => {
    try {
        const savedInventory = localStorage.getItem(INVENTORY_KEY);
        if (savedInventory) {
            const inventory = JSON.parse(savedInventory);
            console.log("Inventaire chargé:", inventory);
            return inventory;
        }
        const newInventory = {
            cards: []
        };
        console.log("Nouvel inventaire créé:", newInventory);
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(newInventory));
        return newInventory;
    } catch (error) {
        console.error("Erreur lors du chargement de l'inventaire:", error);
        const defaultInventory = {
            cards: []
        };
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(defaultInventory));
        return defaultInventory;
    }
};

export const saveInventory = (inventory: PlayerInventory): void => {
    try {
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
        console.log("Inventaire sauvegardé:", inventory);
    } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'inventaire:", error);
    }
};

export const addCardToInventory = (card: Card, existingInventory?: PlayerInventory): PlayerInventory => {
    const inventory = existingInventory || loadInventory();
    const updatedInventory = {
        ...inventory,
        cards: [...inventory.cards, card]
    };
    saveInventory(updatedInventory);
    return updatedInventory;
};

export const openCaseAndAddCard = (caseType: CaseType, card: Card): PlayerInventory => {
    try {
        // Déduire l'or du compte en banque
        removeGold(caseType.price);

        // Ajouter la carte à l'inventaire
        const currentInventory = loadInventory();
        const newInventory = addCardToInventory(card, currentInventory);

        console.log('Inventaire mis à jour:', {
            orDéduit: caseType.price,
            nouvelleCarte: card,
            inventaireFinal: newInventory
        });

        return newInventory;
    } catch (error) {
        console.error('Erreur lors de l\'ouverture de la caisse:', error);
        throw error;
    }
};

export const removeCardFromInventory = (cardId: string): void => {
    const inventory = loadInventory();
    inventory.cards = inventory.cards.filter(card => card.id !== cardId);
    saveInventory(inventory);
}; 