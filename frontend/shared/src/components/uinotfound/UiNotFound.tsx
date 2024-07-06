/* React */
import React, { Component } from 'react';

/* Componentes */
import UiButton from '../uibutton/UiButton';

/* Estilos */
import '../../resources/css/UiNotFound.css'

class UiNotFound extends Component {
  render() {
    return (
        <section className="section">
        <div className="container container-lg-padding">
            <div className="inner-container">
                <h1 className="title title-lg">404</h1>
                <p className="subtitle subtitle-lg">Lo sentimos. La página que buscas no existe.</p>
                <p className="description">Puede que hayas escrito mal la dirección, que la hayan cambiado o eliminado.</p>
                <UiButton
                    type='link'
                    href='/'
                    text={'Regresar al Home'}
                />
            </div>   
        </div>
    </section>
    );
  }
}

export default UiNotFound;
