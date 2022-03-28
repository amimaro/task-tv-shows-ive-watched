import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "../components/AppLayout";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
