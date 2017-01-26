import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MainApp from './components/MainApp.jsx';

const dictionary = {
    'en': {
        'Add task': 'Add task',
        'Enter new task!': 'Enter new task!',
        'Edit current task!': 'Edit current task!',
        'save': 'Save',
        'cancel': 'Cancel',
        'Task already exists!': 'Task already exists!',
        'Enter correct data!': 'Enter correct data!'
    },

    'ru': {
        'Add task': 'Добавить задачу',
        'Enter new task!': 'Введите новую задачу!',
        'Edit current task!': 'Измените текущую задачу!',
        'save': 'Сохранить',
        'cancel': 'Отмена',
        'Task already exists!': 'Такая задача уже существует!',
        'Enter correct data!': 'Введите корректные данные!'
    }
};

const initialState = [];

var lang = 'en';
var curIndex, newTasks, checkItem;

function todoList (state = initialState, action) {

	var addButton = document.querySelectorAll('.add-task')[0];
	var saveButton = document.querySelectorAll('.save')[0];
	var cancelButton = document.querySelectorAll('.cancel')[0];
	var popUp = document.querySelectorAll('.pop-up')[0];
	var overlay = document.querySelectorAll('.overlay')[0];
	var input = document.querySelectorAll('.pop-up>input')[0];
	var question = document.querySelectorAll('.question')[0];


	if (action.type === 'ADD_TASK') {

		checkItem = action.taskName.replace(/\s*/g,'');
		if (checkItem.length) {
			if (state.indexOf(action.taskName) == -1) {
				return [
					...state,
					action.taskName
				];
			} else {
				alert(dictionary[lang]['Task already exists!']);
			}
		} else {
			alert(dictionary[lang]['Enter correct data!']);
		}		

	} else if (action.type === 'DELETE_TASK') {

		newTasks = state.filter((task) => {
            return task !== action.taskName;
        });

		return [
			...newTasks
		];

	} else if (action.type === 'EDIT_TASK') {

		checkItem = action.taskName.replace(/\s*/g,'');
		newTasks = [];
		state.forEach((task, index) => {
            if (index !== curIndex) {
            	newTasks.push(task);
            } else {
            	if (checkItem.length) {
            		task = action.taskName;
            		newTasks.push(task);
            	}
            }
            return newTasks;
        });

        return [
			...newTasks
		];

	} else if (action.type === 'OPEN_POPUP') {

		popUp.classList.add('active');
		overlay.classList.add('active');
        if (event.type === 'react-click') {
            question.textContent = dictionary[lang]['Enter new task!'];  
        } else {
            question.textContent = dictionary[lang]['Edit current task!'];
            input.value = action.taskName;
            saveButton.classList.add('edit');
            curIndex = action.index;
        }

	} else if (action.type === 'CLOSE_POPUP') {

			popUp.classList.remove('active');
			overlay.classList.remove('active');
	        input.value = '';
	        saveButton.classList.remove('edit');

	} else if (action.type === 'COMPLETE_TASK') {

		if (document.querySelectorAll('li input')[action.index].checked) {
			document.querySelectorAll('.task-name')[action.index].classList.add('completed');
		} else {
			document.querySelectorAll('.task-name')[action.index].classList.remove('completed');
		}

	} else if (action.type === 'CHANGE_LANG') {

		if (lang === 'en') {
			lang = 'ru';

		} else {
			lang='en';
		}

		addButton.textContent = dictionary[lang]['Add task'];
		saveButton.textContent = dictionary[lang]['save'];
		cancelButton.textContent = dictionary[lang]['cancel'];

	}

	return state;
}

const store = createStore(todoList);

ReactDOM.render(
	<Provider store={store}>
    	<MainApp />
    </Provider>,
    document.getElementById('content')
);