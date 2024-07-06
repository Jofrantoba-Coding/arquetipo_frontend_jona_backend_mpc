/* React */
import React, { Component } from 'react';

/* Componentes */
import BorderLayout from '../../uilayouts/BorderLayout';
import UiTitleBar from '../../uiutils/uititlebar/UiTitleBar';
import Footer from '../../uiutils/uifooterbar/UiFooterBar';

class UiHome extends Component {
  render() {
    return (
      <BorderLayout
        north={<UiTitleBar />}
        south={<Footer />}
        center={<></>}
      />
    );
  }
}

export default UiHome;