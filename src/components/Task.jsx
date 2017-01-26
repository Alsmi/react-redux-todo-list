import React, { Component } from 'react';

class Task extends Component {

	render() {

        return (
            <li>
                <input type="checkbox" onClick={this.props.onComplete} />
                <span className="task-name" onDoubleClick={this.props.openEditPopUp}>{this.props.name}</span>
                <span className="delete-task" onClick={this.props.onDelete}>×</span>
            </li>
        );
    }

}

export default Task;
               