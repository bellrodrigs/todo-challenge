import {createStore, combineReducers} from 'redux'

import todos from './todos-reducer'

const combineReducer = combineReducers({
    todos
})

const store = createStore(combineReducer)

export default store;

