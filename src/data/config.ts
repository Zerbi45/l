export const config = {
  // Initial player resources
  initialCards: [],

  // Clicker configuration
  baseGoldPerClick: 1,
  goldMultiplier: 1.1,
  upgradeBaseCost: 50,
  upgradeCostMultiplier: 1.5,

  // Case opening animation
  animationDuration: 2000, // in milliseconds
  cardRevealDelay: 500, // in milliseconds

  // Storage keys
  storageKeys: {
    playerInventory: 'medieval-cards-inventory',
    clickerUpgrades: 'medieval-cards-clicker-upgrades'
  }
}; 