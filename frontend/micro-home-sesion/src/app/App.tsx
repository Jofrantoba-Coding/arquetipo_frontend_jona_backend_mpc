import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UiSesionHome from '../views/uisesionhome/UiSesionHome';
import { UiNotFound } from '../uiutils/uinotfound/UiNotFound';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UiSesionHome />} />
        <Route path='*' element={<UiNotFound />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;