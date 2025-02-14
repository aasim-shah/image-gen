import { configureStore } from "@reduxjs/toolkit";
import aiModelsReducer from "./features/aiModels";

const store = configureStore({
  reducer: {
    models: aiModelsReducer,
  },
});

export const resetStore = () => store.dispatch({ type: "RESET" });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
