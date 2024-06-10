import { Component } from "react";
import { getDistritos, updateDistrito } from "../../services/distrito";
import { UiDistritoMantenimientoState } from "./UiDistritoMantenimientoState";
import { InterUiDistritoModalCrud } from "../uidistritomodal/InterUiDistritoModal";
import { InterUiDistritoMantenimiento } from "./InterUiDistritoMantenimiento";
import { UiDistritoMantenimientoProps } from "./UiDistritoMantenimientoProps";
import UiDistritoModal from "../uidistritomodal/UiDistritoModal";
import UiIcon from "../../uiutils/uiicon/UiIcon";
import UiButton from "../../uiutils/uibutton/UiButton";

class UiDistritoMantenimiento extends Component<UiDistritoMantenimientoProps, UiDistritoMantenimientoState> {
    constructor(props: UiDistritoMantenimientoProps) {
        super(props);
        this.state = {
            distritos: [],
            modalOpen: false,
            modalMode: 'create',
            selectedDistrito: null
        };
    }

    async componentDidMount() {
        this.fetchDistritos();
    }

    fetchDistritos = async () => {
        const data = await getDistritos(10, 0);
        this.setState({ distritos: data });
    }

    editModal = (distrito: InterUiDistritoMantenimiento) => {
        this.setState({
            modalOpen: true,
            modalMode: 'edit',
            selectedDistrito: distrito
        });
    }

    viewModal = (distrito: InterUiDistritoMantenimiento) => {
        this.setState({
            modalOpen: true,
            modalMode: 'view',
            selectedDistrito: distrito
        });
    }

    closeModal = () => {
        this.setState({
            modalOpen: false,
            selectedDistrito: null
        });
    }

    handleEditDistrito = async (updatedDistrito: InterUiDistritoModalCrud) => {
        await updateDistrito(updatedDistrito);
        this.closeModal();
        this.fetchDistritos();
    }

    render() {
        const { distritos, modalOpen, modalMode, selectedDistrito } = this.state;
        return (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                    <div className="flex gap-2">
                        <UiButton type="button" text={'Agregar'} color={'dark'} icon="Add" />
                        <UiButton type="button" text={'Exportar'} color={'green'} icon="Export" />
                    </div>
                    <label htmlFor="table-search" className="sr-only">Buscar</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
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
                        {distritos.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    }`}
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
                                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 px-3 py-2 text-xs font-medium rounded-lg me-2 mb-2">
                                        <UiIcon name="Delete" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                { modalOpen && (
                    <UiDistritoModal
                        onClose={this.closeModal}
                        onSubmit={this.handleEditDistrito}
                        mode={modalMode}
                        data={selectedDistrito}
                    />
                )}
                
            </div>
        );
    }
}

export default UiDistritoMantenimiento;