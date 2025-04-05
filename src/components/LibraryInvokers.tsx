import React from 'react';
import { Card, CardType, InvokerCard } from '../types/Card';
import './LibraryInvokers.css';

interface LibraryInvokersProps {
    onInvokerClick: (invoker: InvokerCard) => void;
}

const LibraryInvokers: React.FC<LibraryInvokersProps> = ({ onInvokerClick }) => {
    // Simuler des données d'invocateurs
    const invokers: InvokerCard[] = [
        // Ajoutez vos invocateurs ici
    ];

    return (
        <div className="library-invokers">
            {invokers.map(invoker => (
                <div
                    key={invoker.id}
                    className="invoker-card"
                    onClick={() => onInvokerClick(invoker)}
                >
                    <img src={invoker.image} alt={invoker.name} />
                    <div className="invoker-info">
                        <h3>{invoker.name}</h3>
                        <p className="description">{invoker.description}</p>
                        
                        <div className="passive-ability">
                            <h4>Passif: {invoker.passive.name}</h4>
                            <p>{invoker.passive.description}</p>
                        </div>

                        <div className="ultimate-ability">
                            <h4>Ultime: {invoker.ultimate.name}</h4>
                            <p>{invoker.ultimate.description}</p>
                            <p className="charge-time">Temps de charge: {invoker.ultimate.chargeTime} tours</p>
                        </div>

                        <div className="stats">
                            <div className="stat">
                                <span>Santé:</span>
                                <span>{invoker.stats.health}</span>
                            </div>
                            <div className="stat">
                                <span>Régénération de Mana:</span>
                                <span>{invoker.stats.manaRegen}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LibraryInvokers; 