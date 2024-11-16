import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import store from '../redux/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
