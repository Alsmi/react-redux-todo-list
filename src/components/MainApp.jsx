import React, { Component } from 'react';
import { connect } from 'react-redux';

import Task from './Task.jsx';
import PopUp from './PopUp.jsx';

import './reset.css';
import './MainApp.css';

class MainApp extends Component {


    onAddTask(event) {
        var inputValue = document.querySelectorAll('.pop-up>input')[0].value;
            
        if (event.target.classList.contains("edit")) {
            this.props.onEditTask(inputValue);
        } else {
            this.props.onAddTask(inputValue);
        }
        this.props.closePopUp();
    }

    openPopUp(task, index) {
        this.props.openPopUp(task, index);  
    }

    closePopUp() {
        this.props.closePopUp();
    }

    onDeleteTask(task, index) {
        this.props.onDeleteTask(task, index);
    }

    onCompleteTask(task, index) {
        this.props.onCompleteTask(task, index);
    }

    onLangChange() {
        this.props.onLangChange();
    }

    render() {

        return (
            <div className="container">
                <button className='add-task' onClick={this.openPopUp.bind(this)}>Add task</button>
                <div className="language">
                    <input type="radio" name="lang" value="eng" id="eng" defaultChecked onChange={this.onLangChange.bind(this)} /><label htmlFor='eng'>English</label><br />
                    <input type="radio" name="lang" value="rus" id="rus" onChange={this.onLangChange.bind(this)} /><label htmlFor='rus'>Russian</label><br />
                </div>
                <ul>
                    {this.props.testStore.map((task, index) =>
                        <Task key={index} name={task} onDelete={this.onDeleteTask.bind(this, task, index)} openEditPopUp={this.openPopUp.bind(this, task, index)} onComplete={this.onCompleteTask.bind(this, task, index)}></Task>
                    )}      
                </ul>
                <div className="overlay" onClick={this.closePopUp.bind(this)}></ div>
                <PopUp addTask={this.onAddTask.bind(this)} closePopUp={this.closePopUp.bind(this)}></PopUp>
            </div>
        );
    }

}

export default connect (
    state => ({
        testStore: state
    }),
    dispatch => ({

        onAddTask: (taskName) => {
            dispatch({ type: 'ADD_TASK', taskName: taskName });
        },

        onDeleteTask: (taskName, index) => {
            dispatch({ type: 'DELETE_TASK', taskName: taskName, index: index });
        },

        onEditTask: (taskName) => {
            dispatch({ type: 'EDIT_TASK', taskName: taskName });
        },

        openPopUp: (taskName, index) => {
            dispatch({ type: 'OPEN_POPUP', taskName: taskName, index: index });
        },

        closePopUp: () => {
            dispatch({ type: 'CLOSE_POPUP' });
        },

        onCompleteTask: (taskName, index) => {
            dispatch({ type: 'COMPLETE_TASK', taskName: taskName, index: index });
        },

        onLangChange: () => {
            dispatch({ type: 'CHANGE_LANG' });
        }

    })
)(MainApp);