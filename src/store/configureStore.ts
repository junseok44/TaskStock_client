import { configureStore } from "@reduxjs/toolkit";
import chartReducer, { chartApi } from "./modules/chart";
import { themeReducer } from "./modules/theme";
import calendarReducer from "./modules/calendar";
import todoReducer, { todoApi } from "./modules/todo/todo";
import { authReducer } from "./modules/auth";
import projectReducer, { projectApi } from "./modules/project/project";
import homeReducer from "./modules/home";
import userReducer from "./modules/user";
import retrospectReducer from "./modules/retrospect/retrospect";
import { retrospectApi } from "./modules/retrospect/retrospect";
import { pushNotiReducer } from "./modules/pushNoti";
import getFriendsReducer, { getFriendsApi } from "./modules/getFriends";
import { badgeReducer } from "./modules/badge";
import { marketApi } from "./modules/market/market";
import marketReducer from "./modules/market/market";
import { tutorialReducer } from "./modules/tutorial";

const store = configureStore({
  reducer: {
    [chartApi.reducerPath]: chartApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [retrospectApi.reducerPath]: retrospectApi.reducer,
    [getFriendsApi.reducerPath]: getFriendsApi.reducer,
    [marketApi.reducerPath]: marketApi.reducer,
    user: userReducer,
    auth: authReducer,
    chart: chartReducer,
    home: homeReducer,
    theme: themeReducer,
    calendar: calendarReducer,
    todo: todoReducer,
    project: projectReducer,
    retrospect: retrospectReducer,
    friends: getFriendsReducer,
    market: marketReducer,
    pushNoti: pushNotiReducer,
    badge: badgeReducer,
    tutorial: tutorialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(chartApi.middleware)
      .concat(todoApi.middleware)
      .concat(projectApi.middleware)
      .concat(retrospectApi.middleware)
      .concat(getFriendsApi.middleware)
      .concat(marketApi.middleware),
});

export type RT = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
