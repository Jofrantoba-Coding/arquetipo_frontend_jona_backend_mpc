/* React */
import React, { Component } from 'react';

/* Interfaces */
import { UiIniciarSesionProps, validationSchema } from './UiIniciarSesionProps';
import { UiIniciarSesionState } from './UiIniciarSesionState';

/* Librerias externas */
import { Formik, Field, Form, ErrorMessage } from 'formik';

/* Estilos CSS */
import 'shared/dist/main.css'

/* Libreria Shared */
import { UiButton } from 'shared';
import '../../resources/css/UiIniciarSesion.css';

class UiIniciarSesion extends Component<UiIniciarSesionProps, UiIniciarSesionState> {
  state: UiIniciarSesionState = {
    email: '',
    password: '',
  };

  handlerLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (this.isValidData(email, password)) {
      this.props.login(email, password);
    } else {
      window.alert('Por favor, complete ambos campos.');
    }
  }

  isValidData(email: string, password: string): boolean {
    return email !== '' && password !== '';
  }

  handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            this.props.login(values.email, values.password);
            setSubmitting(false);
          }}
        >
          <Form className="form">
            <div className="form-group">
              <label htmlFor="email" className="label">Correo Electrónico</label>
              <Field
                name="email"
                type="email"
                className="input"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="label">Contraseña</label>
              <Field
                name="password"
                type="password"
                className="input"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="button-container">
                <UiButton 
                  type={'submit'}
                  text={'Iniciar Sesión'}
                />
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default UiIniciarSesion;