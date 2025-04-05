import { Card } from '../types/Card';
import { cacheService } from './cacheService';

const CACHE_KEY = 'cards_data';

class CardService {
    private static instance: CardService;
    private cards: Card[] = [];

    private constructor() {}

    public static getInstance(): CardService {
        if (!CardService.instance) {
            CardService.instance = new CardService();
        }
        return CardService.instance;
    }

    public async loadCards(): Promise<Card[]> {
        // Vérifier le cache
        const cachedCards = cacheService.get<Card[]>(CACHE_KEY);
        if (cachedCards) {
            this.cards = cachedCards;
            return this.cards;
        }

        try {
            // Simuler un chargement asynchrone
            const response = await fetch('/api/cards');
            const data = await response.json();
            
            this.cards = data;
            cacheService.set(CACHE_KEY, this.cards);
            
            return this.cards;
        } catch (error) {
            console.error('Error loading cards:', error);
            return [];
        }
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public getCardById(id: string): Card | undefined {
        return this.cards.find(card => card.id === id);
    }

    public clearCache(): void {
        cacheService.remove(CACHE_KEY);
    }
}

export const cardService = CardService.getInstance(); 