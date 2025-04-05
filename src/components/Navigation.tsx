import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
    return (
        <nav className="navigation">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/game" className="nav-link">Jeu</Link>
            <Link to="/boutique" className="nav-link">Boutique</Link>
            <Link to="/bibliotheque" className="nav-link">Bibliothèque</Link>
            <Link to="/parametres" className="nav-link">Paramètres</Link>
        </nav>
    );
};

export default Navigation; 