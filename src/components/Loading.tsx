import React, { memo } from 'react';
import './Loading.css';

const Loading: React.FC = memo(() => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement...</p>
        </div>
    );
});

Loading.displayName = 'Loading';

export default Loading; 