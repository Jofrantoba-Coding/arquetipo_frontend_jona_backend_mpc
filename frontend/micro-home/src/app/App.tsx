import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UiHome from '../views/uihome/UiHome';
import { UiNotFound } from '../uiutils/uinotfound/UiNotFound';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UiHome />}/>
        <Route path='*' element={<UiNotFound />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;