import { Component } from "react";
import { getDistritos } from "../../services/distrito";
import { UiDistritoGridState } from "./UiDistritoGridState";
import { InterUiDistritoGrid } from "./InterUiDistritoGrid";
import { UiDistritoGridProps } from "./UiDistritoGridProps";
import UiDistritoMantenimiento from "../uidistritomantenimiento/UiDistritoMantenimiento";
import UiIcon from "../../uiutils/uiicon/UiIcon";
import UiButton from "../../uiutils/uibutton/UiButton";

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
    }

    async componentDidMount() {
        this.fetchDistritos(0);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    fetchDistritos = async (page: number) => {
        if (this.state.isLoading) return;

        this.setState({ isLoading: true });

        const data = await getDistritos(10, page * 10);
        this.setState(prevState => ({
            distritos: [...prevState.distritos, ...data],
            currentPage: page,
            isLoading: false
        }));
    }

    handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !this.state.isLoading) {
            this.fetchDistritos(this.state.currentPage + 1);
        }
    }

    createModal = () => {
        this.setState({
            modalOpen: true,
            modalMode: 'create',
        })
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

    closeModal = () => {
        this.setState({
            modalOpen: false,
            selectedDistrito: null
        });
    }

    callbackDistrito = async () => {
        this.closeModal();
        this.fetchDistritos(0);
    }

    render() {
        const { distritos, modalOpen, modalMode, selectedDistrito, isLoading } = this.state;
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
                        {distritos.map((item, index) => (
                            <tr
                                key={`distrito-${item.id}`}
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                { modalOpen && (
                    <UiDistritoMantenimiento
                        onClose={this.closeModal}
                        onSubmit={this.callbackDistrito}
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
