import React from 'react';
import Header from './Header';
import Fish from './Fish';

const Menu = ({ fishes, addToOrder }) => (
    <div className="menu">            
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
            {Object.keys(fishes).map(key => 
                <Fish 
                    key={key} 
                    details={fishes[key]} 
                    addToOrder={addToOrder} 
                    index={key} />)}
        </ul> 
    </div>
)

export default Menu;