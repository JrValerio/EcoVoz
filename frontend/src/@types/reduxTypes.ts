import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import store from '../redux/store';

// Define o tipo RootState como o tipo de retorno da função getState da store
export type RootState = ReturnType<typeof store.getState>;

// Define o tipo AppDispatch como o tipo da função dispatch da store
export type AppDispatch = typeof store.dispatch;

// Define o tipo AppThunk como uma ThunkAction que:
// - retorna void
// - recebe RootState como estado
// - recebe unknown como extraArgument
// - recebe Action<string> como tipo de action
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;