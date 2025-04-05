import React, { useState, useEffect } from 'react';
import { useGold } from '../contexts/GoldContext';
import './Clicker.css';

const Clicker = () => {
    const { gold, addGold, removeGold } = useGold();
    const [clickPower, setClickPower] = useState(1);
    const [autoClicker, setAutoClicker] = useState(0);

    useEffect(() => {
        if (autoClicker > 0) {
            const interval = setInterval(() => {
                addGold(autoClicker);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [autoClicker, addGold]);

    const handleClick = () => {
        addGold(clickPower);
    };

    const buyAutoClicker = () => {
        const cost = 100 * (autoClicker + 1);
        if (gold >= cost) {
            removeGold(cost);
            setAutoClicker(prev => prev + 1);
        }
    };

    const upgradeClickPower = () => {
        const cost = 50 * (clickPower + 1);
        if (gold >= cost) {
            removeGold(cost);
            setClickPower(prev => prev + 1);
        }
    };

    return (
        <div className="clicker-container">
            <h2>Mine d'Or</h2>
            <div className="gold-display">
                <p>Or: {gold}</p>
            </div>
            <button className="click-button" onClick={handleClick}>
                Miner ({clickPower} or/clic)
            </button>
            <div className="upgrades">
                <button 
                    className="upgrade-button"
                    onClick={upgradeClickPower}
                    disabled={gold < 50 * (clickPower + 1)}
                >
                    Améliorer la pioche (50 or)
                </button>
                <button 
                    className="upgrade-button"
                    onClick={buyAutoClicker}
                    disabled={gold < 100 * (autoClicker + 1)}
                >
                    Acheter un mineur automatique (100 or)
                </button>
            </div>
            <div className="stats">
                <p>Pioche: Niveau {clickPower}</p>
                <p>Mineurs automatiques: {autoClicker}</p>
            </div>
        </div>
    );
}

export default Clicker; 