//UiIniciarSesionImpl.tsx
import { login } from '../../services/auth';
import { UiIniciarSesion } from './UiIniciarSesion';

// Clase de implementación que hereda de la clase plantilla UiIniciarSesion
export class UiIniciarSesionImpl extends UiIniciarSesion {


  componentDidMount() {
    // Código que necesita ejecutarse después de que el componente se monte.
    console.log('UiIniciarSesionImpl se ha montado');
  }

  // Sobrescribir el método de inicio de sesión
  async login(email: string, password: string): Promise<void> {
    console.log(`New Iniciando sesión desde la clase de implementación con email: ${email} y contraseña: ${password}`);
    const auth = await login();
    if(auth.status) {
      window.location.href = '/home';
    }
    console.log('auth', auth)
    
  }

  // Sobrescribir otros métodos según sea necesario
  irCrearCuenta(): void {
    window.alert("Click a ir a cuenta");
    console.log('Navegando a la página de cuenta desde la clase de implementación');
    // Agregar la lógica específica para ir a la página de cuenta
  }

  irRecuperarClave(): void {
    window.alert("Click a ir a recuperar clave");
    // Lógica para ir a la página de recuperación de contraseña
    console.log('Navegando a la página de recuperación de contraseña');
  }

  isValidData(email: string, password: string): boolean {
    console.log('email:', email)
    console.log('password:', password)
    return true
  }
  
  render(): JSX.Element {
    return (
      <UiIniciarSesion
        login={this.login}
        irCrearCuenta={this.irCrearCuenta}
        irRecuperarClave={this.irRecuperarClave}
      />
    );
  }
}