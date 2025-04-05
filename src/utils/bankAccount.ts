// Variable globale pour le compte en banque
let bankAccount: number = 1500;

// Fonction pour initialiser le compte en banque
export const initBankAccount = () => {
    const savedGold = localStorage.getItem('bankAccount');
    if (!savedGold) {
        bankAccount = 1500;
        localStorage.setItem('bankAccount', bankAccount.toString());
    } else {
        bankAccount = parseInt(savedGold);
    }
    console.log('Compte en banque initialisé:', bankAccount);
    
    // Démarrer le générateur passif
    startPassiveGenerator();
};

// Fonction pour démarrer le générateur passif
const startPassiveGenerator = () => {
    setInterval(() => {
        bankAccount += 2;
        localStorage.setItem('bankAccount', bankAccount.toString());
        console.log('Génération passive: +2 or, nouveau total:', bankAccount);
    }, 1000);
};

// Fonction pour obtenir le montant actuel
export const getBankAccount = () => {
    console.log('Compte en banque actuel:', bankAccount);
    return bankAccount;
};

// Fonction pour ajouter de l'or
export const addGold = (amount: number) => {
    bankAccount += amount;
    localStorage.setItem('bankAccount', bankAccount.toString());
    console.log(`Or ajouté: ${amount}, nouveau total: ${bankAccount}`);
};

// Fonction pour retirer de l'or
export const removeGold = (amount: number) => {
    if (bankAccount < amount) {
        throw new Error("Pas assez d'or");
    }
    bankAccount -= amount;
    localStorage.setItem('bankAccount', bankAccount.toString());
    console.log(`Or retiré: ${amount}, nouveau total: ${bankAccount}`);
};

// Fonction pour vérifier si on peut se permettre une dépense
export const canAfford = (amount: number) => {
    return bankAccount >= amount;
}; 