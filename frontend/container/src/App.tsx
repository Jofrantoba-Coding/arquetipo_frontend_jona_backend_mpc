import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UiHome from 'microHome/UiHome'; // Importa el componente UiHome dinámicamente
import UiHomeSesion from 'microHomeSesion/UiHomeSesion';
import ProtectedRoute from './ProtectRouter';

const App = () => (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<ProtectedRoute />}>
      <Route path="/" element={<UiHomeSesion />} />
    </Route>
    <Route path='/login' element={<UiHome />}/>
  </Routes>
</BrowserRouter>
);

export default App;