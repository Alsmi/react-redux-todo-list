import React, { Component } from 'react';

class PopUp extends Component {

	render() {

        return (
            <div className="pop-up">
                <span className="question"></span>
                <input type="text" />
                <button className="save" onClick={this.props.addTask}>Save</button>
                <button className="cancel" onClick={this.props.closePopUp}>Cancel</button>
            </div>
        );
    }

}

export default PopUp;