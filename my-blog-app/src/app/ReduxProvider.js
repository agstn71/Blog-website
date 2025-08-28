"use client";

import { Provider } from "react-redux"
import store from "@/redux/store.js";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function ReduxProvider({ children }) {
    const persistor = persistStore(store)
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate> 
    </Provider>;
}
