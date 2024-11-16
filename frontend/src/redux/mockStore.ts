import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';

const mockStore = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type MockRootState = ReturnType<typeof mockStore.getState>;
export type MockAppDispatch = typeof mockStore.dispatch;

export default mockStore;
