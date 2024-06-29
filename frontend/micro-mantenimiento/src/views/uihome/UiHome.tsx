import React from 'react';
import { Component } from 'react';
import { UiIniciarSesionImpl } from '../uiiniciarsesion/UiIniciarSesionImpl';
import BorderLayout from '../../uilayouts/BorderLayout';
import UiTitleBar from '../../uiutils/uititlebar/UiTitleBar';
import Footer from '../../uiutils/uifooterbar/UiFooterBar';

export class UiHome extends Component {
  render() {
    return (
      <BorderLayout
        north={<UiTitleBar />}
        south={<Footer />}
        center={
          <UiIniciarSesionImpl/>
        }
      />
    );
  }
}

