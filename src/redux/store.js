import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import memberReducer from "./member.slice";
import adminReducer from "./admin.slice";
import brandsReducer from "./brand.slice";
import categoriesReducer from "./category.slice";
import productsReducer from "./product.slice";

const adminPersistConfig = {
  key: "admin",
  storage: storage,
};

const memberPersistConfig = {
  key: "member",
  storage: storage,
};

export const store = configureStore({
  reducer: {
    member: persistReducer(memberPersistConfig, memberReducer),
    admin: persistReducer(adminPersistConfig, adminReducer),
    brands: brandsReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
