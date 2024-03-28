import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';
import { Provider } from 'react-redux';
import store from "./store/store";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {ToastContainer} from "react-toastify";
import React from "react";

function App() {
  return (
      <Provider store={store}>
          <ToastContainer></ToastContainer>
          <RouterProvider router={routes} />
          <PersistGate loading={null} persistor={persistStore(store)}/>
      </Provider>
  );
}

export default App;
