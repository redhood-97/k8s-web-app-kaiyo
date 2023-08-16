import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store'; // Import your Redux store

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap your App component with Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
