import React from 'react';
import { Component } from 'react';
import { UiIniciarSesionImpl } from '../uiiniciarsesion/UiIniciarSesionImpl';
import BorderLayout from '../../uilayouts/BorderLayout';
import UiTitleBar from '../../uiutils/uititlebar/UiTitleBar';
import UiFooterBar from '../../uiutils/uifooterbar/UiFooterBar';
import '../../resources/css/index.css';

class UiHome extends Component {
  render() {
    return (
      <BorderLayout
        north={<UiTitleBar />}
        south={<UiFooterBar />}
        center={
          <UiIniciarSesionImpl/>
        }
      />
    );
  }
}

export default UiHome
