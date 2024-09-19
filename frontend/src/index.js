import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/Login';
import Layout from './pages/Layout';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App/>
      {/* <Layout/> */}
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
