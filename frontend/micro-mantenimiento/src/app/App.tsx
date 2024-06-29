import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../protectRouter'
import { UiHome } from '../views/uihome/UiHome';
import { UiSesionHome } from '../views/uisesionhome/UiSesionHome';
import { UiNotFound } from '../uiutils/uinotfound/UiNotFound';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute />}>
          <Route path="/" element={<UiSesionHome />} />
        </Route>
        <Route path='/login' element={<UiHome />}/>
        <Route path='*' element={<UiNotFound />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;