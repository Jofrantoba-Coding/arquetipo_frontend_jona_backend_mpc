import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectRouter';
import ErrorBoundary from './ErrorBoundary';

// Componentes de Fallback
const FallbackLoading = () => <div>Cargando...</div>;
const FallbackError: React.FC = () => <div>Error al cargar el microservicio. Por favor, intenta más tarde.</div>;

const UiHome = React.lazy(() => import('microHome/UiHome'));
const UiHomeSesion = React.lazy(() => import('microHomeSesion/UiHomeSesion'));

const App = () => (
  <BrowserRouter>
    <ErrorBoundary fallback={<FallbackError />}>
      <Suspense fallback={<FallbackLoading />}>
        <Routes>
          <Route path='/' element={<ProtectedRoute />}>
            <Route path="/" element={<UiHomeSesion />} />
          </Route>
          <Route path='/login' element={<UiHome />}/>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  </BrowserRouter>
);

export default App;