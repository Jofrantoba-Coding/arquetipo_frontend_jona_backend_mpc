import React, { Component } from 'react';
import BorderLayout from '../../uilayouts/BorderLayout';
import Header from '../../uiutils/Header';
import Footer from '../../uiutils/Footer';

export class UiSesionHome extends Component {
  render() {
    return (
      <BorderLayout
        north={<Header />}
        south={<Footer />}
        center={
          <p>Bienvenido</p>
        }
      />
    );
  }
}