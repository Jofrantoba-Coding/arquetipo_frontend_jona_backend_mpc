import React from "react";
import { Component } from "react";
import { UiDistritoGridState } from "./UiDistritoGridState";
import { InterUiDistritoGrid } from "./InterUiDistritoGrid";
import { UiDistritoGridProps } from "./UiDistritoGridProps";
import UiDistritoMantImpl from "../uidistritomant/UiDistritoMantImpl";
import { UiButton, UiIcon } from 'shared';

import '../../resources/css/UiDistritoGrid.css';

class UiDistritoGrid extends Component<UiDistritoGridProps, UiDistritoGridState> {
    constructor(props: UiDistritoGridProps) {
        super(props);
        this.state = {
            distritos: [],
            modalOpen: false,
            modalMode: 'create',
            selectedDistrito: null,
            currentPage: 1, 
            isLoading: false,
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !this.state.isLoading) {
            this.props.loadingData?.(this.state.currentPage);
        }
    }

    createModal = () => {
        this.setState({
            modalOpen: true,
            modalMode: 'create',
        });
    }

    editModal = (distrito: InterUiDistritoGrid) => {
        this.setState({
            modalOpen: true,
            modalMode: 'edit',
            selectedDistrito: distrito
        });
    }

    viewModal = (distrito: InterUiDistritoGrid) => {
        this.setState({
            modalOpen: true,
            modalMode: 'view',
            selectedDistrito: distrito
        });
    }

    deleteModal = (distrito: InterUiDistritoGrid) => {
        this.setState({
            modalOpen: true,
            modalMode: 'delete',
            selectedDistrito: distrito
        });
    }

    closeModal = () => {
        this.setState({
            modalOpen: false,
            selectedDistrito: null
        });
    }

    callbackModal = async () => {
        this.props.loadingData?.(1);
    }

    render() {
        const { distritos } = this.props;
        const { modalOpen, modalMode, selectedDistrito, isLoading } = this.state;
        return (
            <div className="relative-overflow-x-auto shadow-md-sm-rounded-lg">
                <div className="flex-container md-flex-row space-y-4-md-space-y-0">
                    <div className="flex-gap-2">
                        <UiButton 
                            type="button" 
                            text={'Agregar'} 
                            color={'dark'} 
                            icon="Add" 
                            callback={this.createModal}
                        />
                        <UiButton 
                            type="button" 
                            text={'Exportar'} 
                            color={'green'} 
                            icon="Export" 
                        />
                    </div>
                    <div className="relative">
                        <div className="search-icon-container">
                            <UiIcon name="Search" />
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            className="search-input"
                            placeholder="Buscar"
                        />
                    </div>
                </div>
                <table className="table">
                    <thead className="table-head">
                        <tr>
                            <th scope="col">Descripción</th>
                            <th scope="col">Código Distrito</th>
                            <th scope="col">Código Provincia</th>
                            <th scope="col">Código Departamento</th>
                            <th scope="col">Provincia</th>
                            <th scope="col">Departamento</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {distritos?.map((item, index) => (
                            <tr
                                key={`distrito-${item.id}`}
                                className={`table-row ${index % 2 === 0 ? 'table-row-white' : 'table-row-gray'}`}
                            >
                                <th scope="row" className="table-cell">
                                    {item.descripcion}
                                </th>
                                <td className="table-cell">{item.codigodistrito}</td>
                                <td className="table-cell">{item.codigoprovincia}</td>
                                <td className="table-cell">{item.codigodepartamento}</td>
                                <td className="table-cell">{item.descripcionprovincia}</td>
                                <td className="table-cell">{item.descripciondepartamento}</td>
                                <td className="table-cell">
                                    <button 
                                        type="button" 
                                        className="table-action-button"
                                        onClick={() => this.viewModal(item)}
                                    >
                                        <UiIcon name="View" />
                                    </button>
                                    <button
                                        type="button"
                                        className="table-action-button"
                                        onClick={() => this.editModal(item)}
                                    >
                                        <UiIcon name="Edit" />
                                    </button>
                                    <button
                                        type="button"
                                        className="table-action-button"
                                        onClick={() => this.deleteModal(item)}
                                    >
                                        <UiIcon name="Delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                { modalOpen && (
                    <UiDistritoMantImpl
                        onClose={this.closeModal}
                        onSubmit={this.callbackModal}
                        mode={modalMode}
                        data={selectedDistrito}
                    />
                )}
                
                {isLoading && (
                    <div className="text-center">
                        <span>Loading...</span>
                    </div>
                )}
            </div>
        );
    }
}

export default UiDistritoGrid;