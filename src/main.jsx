import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.css';
import './mobile-fixes.css';
import './mobile-nav-fix.css';
createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
