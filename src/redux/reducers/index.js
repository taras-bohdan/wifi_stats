import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import reducer from './reducer'

export default combineReducers({
	stats: reducer,
	login: loginReducer
})