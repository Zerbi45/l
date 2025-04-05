import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Bienvenue dans Medieval Cards</h1>
            <div className="home-buttons">
                <Link to="/game" className="home-button">
                    Nouvelle Partie
                </Link>
                <Link to="/library" className="home-button">
                    Bibliothèque
                </Link>
            </div>
        </div>
    );
};

export default Home; 