import React, { useState, useEffect } from 'react';
import { CLICKER_CONFIG } from '../data/gameConfig';
import './Clicker.css';

const Clicker: React.FC = () => {
    const [gold, setGold] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [autoClickers, setAutoClickers] = useState(0);
    const [upgradeCost, setUpgradeCost] = useState(CLICKER_CONFIG.upgradeMultiplierCost);
    const [autoClickerCost, setAutoClickerCost] = useState(CLICKER_CONFIG.autoClickerCost);

    const handleClick = () => {
        setGold(prev => prev + CLICKER_CONFIG.baseGoldPerClick * multiplier);
    };

    const handleUpgrade = () => {
        if (gold >= upgradeCost) {
            setGold(prev => prev - upgradeCost);
            setMultiplier(prev => prev + CLICKER_CONFIG.upgradeMultiplierValue);
            setUpgradeCost(prev => Math.floor(prev * 1.5));
        }
    };

    const handleBuyAutoClicker = () => {
        if (gold >= autoClickerCost && autoClickers < CLICKER_CONFIG.maxAutoClickers) {
            setGold(prev => prev - autoClickerCost);
            setAutoClickers(prev => prev + 1);
            setAutoClickerCost(prev => Math.floor(prev * 1.5));
        }
    };

    useEffect(() => {
        if (autoClickers > 0) {
            const interval = setInterval(() => {
                setGold(prev => prev + CLICKER_CONFIG.baseGoldPerClick * multiplier * autoClickers);
            }, CLICKER_CONFIG.autoClickerInterval);

            return () => clearInterval(interval);
        }
    }, [autoClickers, multiplier]);

    return (
        <div className="clicker">
            <div className="clicker-stats">
                <h2>Or: {Math.floor(gold)}</h2>
                <p>Multiplicateur: x{multiplier.toFixed(1)}</p>
                <p>Auto-clickers: {autoClickers}</p>
            </div>
            <button className="click-button" onClick={handleClick}>
                Cliquer
            </button>
            <div className="upgrades">
                <button 
                    className="upgrade-button" 
                    onClick={handleUpgrade}
                    disabled={gold < upgradeCost}
                >
                    Améliorer Multiplicateur ({upgradeCost} or)
                </button>
                <button 
                    className="upgrade-button" 
                    onClick={handleBuyAutoClicker}
                    disabled={gold < autoClickerCost || autoClickers >= CLICKER_CONFIG.maxAutoClickers}
                >
                    Acheter Auto-clicker ({autoClickerCost} or)
                </button>
            </div>
        </div>
    );
};

export default Clicker; 