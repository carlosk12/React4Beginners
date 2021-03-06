import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component{
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount(){
        const { params } = this.props.match;

        // First reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeId);

        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. Add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        // 3. SEt the new fishes object to state
        this.setState({ fishes });
    }

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the current state
        const fishes = { ...this.state.fishes };
        // 2. Update that state
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({ fishes });
    }

    deleteFish = (key) => {
        // 1. Take a copy of state
        const fishes = { ...this.state.fishes };
        // 2. Update the state
        fishes[key] = null;
        // 3. Update state
        this.setState({ fishes });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    }

    addToOrder = (key) => {
        // 1. Take a copy of state
        const order = { ...this.state.order };
        // 2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;
        // 3. Call setState to update our state object
        this.setState({ order });
    }

    deleteFromOrder = (key) => {
        // 1. Take a copy of state
        const order = { ...this.state.order };
        // 2. Update order
        order[key] >= 2 ? order[key] = order[key] - 1 : delete order[key];
        // 3. Update state
        this.setState({ order });

    }

    render() {
        return (
            <div className="catch-of-the-day">
                <Menu 
                    fishes={this.state.fishes} 
                    addToOrder={this.addToOrder} 
                />
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                    addToOrder={this.addToOrder}
                    deleteFromOrder={this.deleteFromOrder}
                />
                <Inventory 
                    addFish={this.addFish} 
                    updateFish={this.updateFish} 
                    deleteFish={this.deleteFish} 
                    loadSampleFishes={this.loadSampleFishes} 
                    fishes={this.state.fishes}
                />
            </div>
        )
    }
}

export default App;