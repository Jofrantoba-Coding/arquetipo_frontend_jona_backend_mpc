import React from "react";
import { Component } from "react";
import { UiDistritoGridState } from "./UiDistritoGridState";
import { InterUiDistritoGrid } from "./InterUiDistritoGrid";
import { UiDistritoGridProps } from "./UiDistritoGridProps";
import UiIcon from "shared/UiIcon";
import UiButton from "shared/UiButton";
import { UiDistritoMantImpl } from "../uidistritomant/UiDistritoMantImpl";

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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                    <div className="flex gap-2">
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
                    <label htmlFor="table-search" className="sr-only">Buscar</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <UiIcon name="Search" />
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Buscar"
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-white uppercase bg-[#DD3333]">
                        <tr>
                            <th scope="col" className="px-6 py-3">Descripción</th>
                            <th scope="col" className="px-6 py-3">Código Distrito</th>
                            <th scope="col" className="px-6 py-3">Código Provincia</th>
                            <th scope="col" className="px-6 py-3">Código Departamento</th>
                            <th scope="col" className="px-6 py-3">Provincia</th>
                            <th scope="col" className="px-6 py-3">Departamento</th>
                            <th scope="col" className="px-6 py-3">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {distritos?.map((item, index) => (
                            <tr
                                key={`distrito-${item.id}`}
                                className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {item.descripcion}
                                </th>
                                <td className="px-6 py-4">{item.codigodistrito}</td>
                                <td className="px-6 py-4">{item.codigoprovincia}</td>
                                <td className="px-6 py-4">{item.codigodepartamento}</td>
                                <td className="px-6 py-4">{item.descripcionprovincia}</td>
                                <td className="px-6 py-4">{item.descripciondepartamento}</td>
                                <td className="px-6 py-4">
                                    <button 
                                        type="button" 
                                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 px-3 py-2 text-xs font-medium rounded-lg me-2 mb-2"
                                        onClick={() => this.viewModal(item)}
                                    >
                                        <UiIcon name="View" />
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 px-3 py-2 text-xs font-medium rounded-lg me-2 mb-2"
                                        onClick={() => this.editModal(item)}
                                    >
                                        <UiIcon name="Edit" />
                                    </button>
                                    <button
                                        type="button"
                                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 px-3 py-2 text-xs font-medium rounded-lg me-2 mb-2"
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
                    <div className="text-center p-4">
                        <span>Loading...</span>
                    </div>
                )}
            </div>
        );
    }
}

export default UiDistritoGrid;