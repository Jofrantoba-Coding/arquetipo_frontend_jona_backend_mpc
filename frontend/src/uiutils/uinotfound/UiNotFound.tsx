import { Component } from 'react';
import UiButton from '../uibutton/UiButton';

export class UiNotFound extends Component {
  render() {
    return (
        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#dd3333]">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-[#26292e] md:text-4xl">Lo sentimos. La página que buscas no existe.</p>
                    <p className="mb-4 text-lg font-light text-gray-500">Puede que hayas escrito mal la dirección, que la hayan cambiado o eliminado.</p>
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

