import { configureStore } from '@reduxjs/toolkit';
import entityReducer from './entity'


export const store = configureStore({
  reducer: {
    entity: entityReducer
  },
});
