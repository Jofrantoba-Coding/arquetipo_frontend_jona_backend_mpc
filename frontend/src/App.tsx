import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './protectRouter'
import { UiHome } from './views/uihome/UiHome';
import { UiSesionHome } from './views/uisesionhome/UiSesionHome';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<UiHome />}/>
        <Route path='/' element={<ProtectedRoute />}>
          <Route path="/home" element={<UiSesionHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;