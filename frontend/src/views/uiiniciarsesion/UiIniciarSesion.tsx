import React, { Component } from 'react';
import { UiIniciarSesionProps } from './UiIniciarSesionProps';
import { UiIniciarSesionState } from './UiIniciarSesionState';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ERRORS, INVALID } from '../../constants/validation';
import * as Yup from 'yup';
import UiButton from '../../uiutils/uibutton/UiButton';

const validationSchema = Yup.object({
  email: Yup.string().email(INVALID.EMAIL).required(ERRORS.REQUIRED),
  password: Yup.string().required(ERRORS.REQUIRED),
});

export class UiIniciarSesion extends Component<UiIniciarSesionProps, UiIniciarSesionState> {
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
      <div className="max-w-sm mx-auto p-4">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            this.props.login(values.email, values.password);
            setSubmitting(false);
          }}
        >
          <Form className="space-y-2 w-full">
            <div className="grid w-full items-center">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo Electrónico</label>
              <Field
                name="email"
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage name="email" component="div" className="text-[#DD3333] text-sm" />
            </div>
            <div className="grid w-full items-center">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
              <Field
                name="password"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <ErrorMessage name="password" component="div" className="text-[#DD3333] text-sm" />
            </div>
            <div className="w-full pt-[20px]">
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