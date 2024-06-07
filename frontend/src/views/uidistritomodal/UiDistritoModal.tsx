import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UiDistritoModalProps } from './UiDistritoModalProps';
import { InterUiDistritoUpdate } from './InterUiDistritoModal';
import { validationUpdateSchema, validationCreateSchema } from './UiDistritoModalValidation';
import UiIcon from '../../uiutils/uiicon/UiIcon';
import { getProvinciaByIdDepartamento } from '../../services/provincia';

const UiDistritoModal: React.FC<UiDistritoModalProps & { mode: 'edit' | 'create' | 'view' }> = ({ onClose, onSubmit, data, mode }) => {
    const isEditable = mode === 'edit' || mode === 'create';

    const [provincias, setProvincias] = useState([])

    const fetchProvincias = async () => {
        const dataProvincia = await getProvinciaByIdDepartamento(Number(data?.iddepartamento))
        setProvincias(dataProvincia)
    }

    const defaultData = {
        id: Number(data?.id),
        descripcion: data?.descripcion,
        codigoDistrito: data?.codigodistrito,
        orden: Number(data?.orden),
        provincia: {
            id: Number(data?.idprovincia)
        }
    }

    useEffect(() => {
        fetchProvincias()
    }, [])

    return (
        <div
            id="crud-modal"
            className={`fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full max-h-full bg-gray-900 bg-opacity-50 flex`}
            onClick={onClose}
        >
            <div
                className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {mode === 'edit' ? 'Editar Distrito' : mode === 'create' ? 'Crear Distrito' : 'Ver Distrito'}
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

                <Formik
                    initialValues={{
                        id: defaultData?.id || '',
                        descripcion: defaultData?.descripcion || '',
                        codigoDistrito: defaultData?.codigoDistrito || '',
                        orden: defaultData?.orden || 0,
                        provincia: {
                            id: defaultData?.provincia?.id || ''
                        }
                    }}
                    validationSchema={mode === 'edit' ? validationUpdateSchema : validationCreateSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const formattedValues: InterUiDistritoUpdate = {
                            ...values,
                            id: Number(values.id),
                            orden: Number(values.orden),
                            provincia: {
                                id: Number(values.provincia.id)
                            }
                        };
                        onSubmit(formattedValues);
                        setSubmitting(false);
                        onClose();
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
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
                                        {provincias.map((provincia: any) => (
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

                                <div className="col-span-2">
                                    {(mode === 'edit' || mode === 'create') && (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="text-white inline-flex gap-[5px] items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >
                                            <UiIcon name="Save" />
                                            <span>{mode === 'edit' ? 'Guardar' : 'Crear'}</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default UiDistritoModal;