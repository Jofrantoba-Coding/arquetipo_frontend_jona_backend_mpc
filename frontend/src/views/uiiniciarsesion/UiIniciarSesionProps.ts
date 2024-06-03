import { NavigateFunction } from 'react-router-dom';
import { InterUiIniciarSesion } from './InterUiIniciarSesion';
export interface UiIniciarSesionProps extends InterUiIniciarSesion {
    navigate: NavigateFunction;
}