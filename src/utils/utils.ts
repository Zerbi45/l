import { Card, Rarity, PlayerInventory } from '../types/Card';
import { CARDS } from '../data/cards';
import { config } from '../data/config';

// Get a random card based on rarity probabilities
export const getRandomCard = (rarityProbabilities: { [key in Rarity]: number }): Card => {
  const random = Math.random();
  let cumulativeProbability = 0;
  let selectedRarity: Rarity = Rarity.Common;

  for (const [rarity, probability] of Object.entries(rarityProbabilities)) {
    cumulativeProbability += probability;
    if (random <= cumulativeProbability) {
      selectedRarity = rarity as Rarity;
      break;
    }
  }

  const cardsOfRarity = CARDS.filter((card: Card) => card.rarity === selectedRarity);
  return cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
};

// Save player inventory to local storage
export const saveInventory = (inventory: PlayerInventory) => {
  localStorage.setItem(config.storageKeys.playerInventory, JSON.stringify(inventory));
};

// Load player inventory from local storage
export const loadInventory = (): PlayerInventory => {
  const savedInventory = localStorage.getItem(config.storageKeys.playerInventory);
  if (savedInventory) {
    return JSON.parse(savedInventory);
  }
  return {
    cards: config.initialCards
  };
};

// Format gold amount with commas
export const formatGold = (amount: number): string => {
  return amount.toLocaleString();
};

// Calculate upgrade cost based on current level
export const calculateUpgradeCost = (currentLevel: number): number => {
  return Math.floor(config.upgradeBaseCost * Math.pow(config.upgradeCostMultiplier, currentLevel));
};

// Calculate gold per click based on upgrade level
export const calculateGoldPerClick = (upgradeLevel: number): number => {
  return Math.floor(config.baseGoldPerClick * Math.pow(config.goldMultiplier, upgradeLevel));
};

interface Config {
  initialCards: any[];
}

export const createInitialInventory = (config: Config): PlayerInventory => {
  return {
    cards: config.initialCards
  };
}; 