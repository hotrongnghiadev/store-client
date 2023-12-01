import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import memberReducer from "./member/user.slice";
import adminReducer from "./admin/user.slice";
import brandsReducer from "./admin/brand.slice";
import categoriesReducer from "./admin/category.slice";
import productsReducer from "./admin/product.slice";

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
