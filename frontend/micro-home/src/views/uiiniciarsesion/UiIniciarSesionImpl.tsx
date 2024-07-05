import React from 'react';
import UiIniciarSesion from './UiIniciarSesion';
import { UiIniciarSesionProps } from './UiIniciarSesionProps';
import { getLogin } from '../../services/api-auth/auth';

class UiIniciarSesionImpl extends UiIniciarSesion {

  constructor(props: UiIniciarSesionProps) {
    super(props);
    this.login = this.login.bind(this);
    this.irCrearCuenta = this.irCrearCuenta.bind(this);
    this.irRecuperarClave = this.irRecuperarClave.bind(this);
  }

  async login(email: string, password: string): Promise<void> {
    console.log(`Iniciando sesión desde la clase de implementación con email: ${email} y contraseña: ${password}`);
    // Lógica para iniciar sesión, por ejemplo, llamada a una API o autenticación
    try {
      // Lógica de autenticación (supongamos que aquí hay una llamada a una API)
      const response = await getLogin({email, password})
      
      if (response) {
        // Autenticación exitosa, redirigir a la página de inicio
        window.location.href = '/';
      } else {
        // Mostrar mensaje de error
        window.alert(response.error.message || 'Error de inicio de sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      window.alert('Error al iniciar sesión');
    }
  }

  irCrearCuenta(): void {
    // Lógica para ir a la página de creación de cuenta
    console.log('Navegando a la página de creación de cuenta desde la clase de implementación');
    // Por ejemplo, redirigir a '/registro'
    window.location.href = '/registro';
  }

  irRecuperarClave(): void {
    // Lógica para ir a la página de recuperación de contraseña
    console.log('Navegando a la página de recuperación de contraseña desde la clase de implementación');
    // Por ejemplo, redirigir a '/recuperar-clave'
    window.location.href = '/recuperar-clave';
  }

  isValidData(email: string, password: string): boolean {
    // Lógica para validar los datos de inicio de sesión (ejemplo simple aquí, puede ser más complejo)
    return email !== '' && password !== '';
  }

  render() {
    return (
      <div>
        {super.render()}
      </div>
    );
  }

  static defaultProps: Partial<UiIniciarSesionProps> = {
    login: UiIniciarSesionImpl.prototype.login,
    irCrearCuenta: UiIniciarSesionImpl.prototype.irCrearCuenta,
    irRecuperarClave: UiIniciarSesionImpl.prototype.irRecuperarClave,
  };
}

export default UiIniciarSesionImpl;