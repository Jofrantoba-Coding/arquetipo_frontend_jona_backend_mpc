import { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UiDistritoMantenimientoState } from './UiDistritoMantenimientoState';
import { validationUpdateSchema, validationCreateSchema } from './UiDistritoMantenimientoValidation';
import { UiDistritoMantenimientoProps } from './UiDistritoMantenimientoProps';
import { getProvinciaByIdDepartamento } from '../../services/provincia';
import { InterUiDistritoMantenimientoCrud, InterUiDistritoMantenimientoDelete } from './InterUiDistritoMantenimiento';
import UiButton from '../../uiutils/uibutton/UiButton';
import { deleteDistrito, updateDistrito } from '../../services/distrito';

class UiDistritoMantenimiento extends Component<UiDistritoMantenimientoProps, UiDistritoMantenimientoState> {
    constructor(props: UiDistritoMantenimientoProps) {
        super(props);

        const { mode, data } = props;

        const defaultData: InterUiDistritoMantenimientoCrud = {
            descripcion: data?.descripcion,
            codigoDistrito: data?.codigodistrito,
            orden: data?.orden,
            provincia: {
                id: data?.idprovincia
            }
        };

        if (mode !== 'create') {
            defaultData.id = Number(props.data?.id);
        }

        this.state = {
            provincias: [],
            defaultData,
            showDeleteConfirmation: false,
        };
    }

    componentDidMount() {
        this.fetchProvincias();
    }

    async fetchProvincias() {
        const dataProvincia = await getProvinciaByIdDepartamento(Number(this.props.data?.iddepartamento));
        this.setState({ provincias: dataProvincia });
    }

    handleDelete = () => {
        this.setState({ showDeleteConfirmation: true });
    }

    handleCancelDelete = () => {
        this.setState({ showDeleteConfirmation: false });
    }

    handleUpdate = async (data: InterUiDistritoMantenimientoCrud) => {
        const dataUpdate = await updateDistrito(data);
        console.log(dataUpdate)
        this.props.onClose();
    }

    handleConfirmDelete = async (data: InterUiDistritoMantenimientoDelete) => {
        // Aquí puedes llamar a la función de eliminación
        // this.props.onDelete(this.state.defaultData.id);
        const dataDelete = await deleteDistrito(data)
        console.log(dataDelete)
        this.setState({ showDeleteConfirmation: false });
        this.props.onClose();
    }

    render() {
        const { onClose, onSubmit, mode } = this.props;
        const { provincias, defaultData, showDeleteConfirmation } = this.state;
        const isEditable = mode === 'edit' || mode === 'create';

        const getTitle = () => {
            if (showDeleteConfirmation) {
                return 'Eliminar Distrito';
            }
            if (mode === 'edit') {
                return 'Editar Distrito';
            }
            if (mode === 'create') {
                return 'Crear Distrito';
            }
            return 'Ver Distrito';
        };

        return (
            <div
                id="crud-modal"
                className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full max-h-full bg-gray-900 bg-opacity-50 flex"
                onClick={onClose}
            >
                <div
                    className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {getTitle()}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Cerrar modal</span>
                        </button>
                    </div>

                    {showDeleteConfirmation ? (
                        <div className="space-y-2 p-2">
                            <div className="p-4 space-y-2 text-center dark:text-white">
                                <p className="text-gray-500">¿Está seguro de que desea eliminar este distrito?</p>
                            </div>
                            
                            <div className="space-y-2">
                                
                                <div className="px-6 py-2">

                                    <div className="grid gap-4 grid-cols-2">
                                        <UiButton 
                                            type={'button'}
                                            color={'dark'}
                                            callback={this.handleCancelDelete}
                                            className={'justify-center'}
                                            text={'Cancelar'}
                                        />

                                        <UiButton 
                                            type={'button'}
                                            color={'red'}
                                            className={'justify-center'}
                                            callback={() => this.handleConfirmDelete({ id: defaultData?.id })}
                                            text={'Eliminar'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Formik
                            initialValues={defaultData}
                            validationSchema={mode === 'edit' ? validationUpdateSchema : validationCreateSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                const formattedValues = {
                                    ...values,
                                    orden: Number(values.orden),
                                    provincia: {
                                        id: Number(values.provincia.id)
                                    }
                                };
                                if (mode === 'edit') {
                                    formattedValues.id = Number(values.id);
                                }
                                onSubmit(formattedValues);
                                setSubmitting(false);
                                onClose();
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="p-4 md:p-5">
                                    <div className="grid gap-4 grid-cols-2">
                                        {mode !== 'create' && (
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900">ID</label>
                                                <Field
                                                    type="text"
                                                    name="id"
                                                    id="id"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                    readOnly={isEditable}
                                                />
                                                {isEditable && <ErrorMessage name="id" component="div" className="text-red-600 text-sm mt-1" />}
                                            </div>
                                        )}

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="codigoDistrito" className="block mb-2 text-sm font-medium text-gray-900">Código Distrito</label>
                                            <Field
                                                type="text"
                                                name="codigoDistrito"
                                                id="codigoDistrito"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                placeholder="Escribe el código del distrito"
                                                readOnly={!isEditable}
                                            />
                                            {isEditable && <ErrorMessage name="codigoDistrito" component="div" className="text-red-600 text-sm mt-1" />}
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900">Descripción</label>
                                            <Field
                                                type="text"
                                                name="descripcion"
                                                id="descripcion"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                placeholder="Escribe la descripción"
                                                readOnly={!isEditable}
                                            />
                                            {isEditable && <ErrorMessage name="descripcion" component="div" className="text-red-600 text-sm mt-1" />}
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="provincia-id" className="block mb-2 text-sm font-medium text-gray-900">Provincia</label>
                                            <Field
                                                as="select"
                                                name="provincia.id"
                                                id="provincia-id"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                readOnly={!isEditable}
                                            >
                                                {provincias.map((provincia) => (
                                                    <option key={provincia.id} value={provincia.id}>
                                                        {provincia.descripcion}
                                                    </option>
                                                ))}
                                            </Field>
                                            {isEditable && <ErrorMessage name="provincia.id" component="div" className="text-red-600 text-sm mt-1" />}
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="orden" className="block mb-2 text-sm font-medium text-gray-900">Orden</label>
                                            <Field
                                                type="number"
                                                name="orden"
                                                id="orden"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                placeholder="Escribe el orden"
                                                readOnly={!isEditable}
                                            />
                                            {isEditable && <ErrorMessage name="orden" component="div" className="text-red-600 text-sm mt-1" />}
                                        </div>

                                        <div className="col-span-2 my-2 border-b"></div>

                                        <div className="col-span-2  flex justify-between">
                                            {(mode === 'edit' || mode === 'create') && (
                                                <>
                                                    <UiButton 
                                                        type={'submit'}
                                                        disabled={isSubmitting}
                                                        color={'green'}
                                                        icon={'Save'}
                                                        text={mode === 'edit' ? 'Guardar' : 'Crear'}
                                                    />
                                                    {mode === 'edit' && (
                                                        <UiButton 
                                                            type={'button'}
                                                            color={'red'}
                                                            callback={this.handleDelete}
                                                            icon={'Delete'}
                                                            text={'Eliminar'}
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
            </div>
        );
    }
}

export default UiDistritoMantenimiento;