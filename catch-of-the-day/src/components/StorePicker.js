import React from 'react';

class StorePicker extends React.Component {
    render() {
        return (
            <React.Fragment>
                <form className="store-selector">
                    <h2>Please enter a store</h2>
                    <input type="text"required placeholder="Store Name"></input>
                    <button type="button">Visit Store</button>
                </form>
            </React.Fragment>
        )
    }
}

export default StorePicker;