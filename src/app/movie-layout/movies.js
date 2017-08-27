import { applyMiddleware, createStore } from 'redux';
import axios from 'axios';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const reducer = (state={}, action) => {
    switch (action) {
        case 'GET_MOVIES_PENDING':
            return state+action.payload;
            break;

        case 'GET_MOVIES_ERROR':
        return 'boo';
            break;

        case 'GET_MOVIES_SUCCESS':
        return 'YEY!!';
            break;
    }
}
const middleWare = applyMiddleware(thunk, logger());
const movieStore = createStore(reducer, middleWare);

movieStore.dispatch(dispatch => {
    dispatch({type : 'GET_MOVIES_PENDING'});
    axios.get()
    dispatch({});
});