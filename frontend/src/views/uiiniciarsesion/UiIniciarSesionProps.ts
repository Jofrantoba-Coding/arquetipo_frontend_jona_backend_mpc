import { NavigateFunction } from 'react-router-dom';
import { InterUiIniciarSesion } from './InterUiIniciarSesion';
import { INVALID } from '../../constants/validation';
import * as Yup from 'yup';

export interface UiIniciarSesionProps extends InterUiIniciarSesion {
    navigate: NavigateFunction;
}

export const validationSchema = Yup.object({
    email: Yup.string().email(INVALID.EMAIL).required(INVALID.REQUIRED),
    password: Yup.string().required(INVALID.REQUIRED),
});