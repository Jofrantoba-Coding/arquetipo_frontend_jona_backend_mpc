import React from "react";
import { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { UiDistritoMantState } from './UiDistritoMantState';
import { UiDistritoMantProps, validationUpdateSchema, validationCreateSchema } from './UiDistritoMantProps';
import { InterUiDistritoMantCreate, InterUiDistritoMantDelete, InterUiDistritoMantEdit, InterUiDistritoMantTitleCrud } from './InterUiDistritoMant';
import UiButton from '../../uiutils/uibutton/UiButton';
import UiIcon from '../../uiutils/uiicon/UiIcon';

class UiDistritoMant extends Component<UiDistritoMantProps, UiDistritoMantState> {
    constructor(props: UiDistritoMantProps) {
        super(props);

        const { mode, data } = props;

        const defaultData: InterUiDistritoMantCreate | InterUiDistritoMantEdit = {
            descripcion: data?.descripcion,
            codigoDistrito: data?.codigodistrito,
            orden: data?.orden,
            provincia: {
                id: data?.idprovincia
            }
        };

        if (mode !== 'create') {
            (defaultData as InterUiDistritoMantEdit).id = data?.id;
        }

        this.state = {
            departamentos: [],
            provincias: [],
            defaultData
        };
    }

    getTitle = (mode: 'delete' | 'edit' | 'create' | 'view') => {
        const titles: InterUiDistritoMantTitleCrud = {
            delete: 'Eliminar Distrito',
            edit: 'Editar Distrito',
            create: 'Crear Distrito',
            view: 'Ver Distrito',
        };

        return titles[mode];
    }

    handleSubmit = async (data: InterUiDistritoMantCreate | InterUiDistritoMantEdit | InterUiDistritoMantDelete) => {
        if(this.props.mode === 'create') {
            await this.props.handleCreate?.(data as InterUiDistritoMantCreate)
        }
        if(this.props.mode === 'edit') {
            await this.props.handleUpdate?.(data as InterUiDistritoMantEdit)
        }
        if(this.props.mode === 'delete') {
            this.props.handleDelete?.(data as InterUiDistritoMantDelete)
        }
    };
    

    handleChangeDepartamento = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        console.log('event listener', selectedValue)
    }

    render() {
        const { onClose, mode, departamentos, provincias } = this.props;
        const { defaultData } = this.state;
        const isEditable = mode === 'edit' || mode === 'create';

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
                            {this.getTitle(mode)}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <UiIcon name="Close" />
                            <span className="sr-only">Cerrar modal</span>
                        </button>
                    </div>

                    {mode === 'delete' ? (
                        <div className="space-y-2 p-2">
                            <div className="p-4 space-y-2 text-center ">
                                <p className="text-gray-500">¿Está seguro de que desea eliminar este distrito?</p>
                            </div>

                            <div className="space-y-2">

                                <div className="px-6 py-2">

                                    <div className="grid gap-4 grid-cols-2">
                                        <UiButton
                                            type={'button'}
                                            color={'dark'}
                                            callback={onClose}
                                            className={'justify-center'}
                                            text={'Cancelar'}
                                        />

                                        <UiButton
                                            type={'button'}
                                            color={'red'}
                                            className={'justify-center'}
                                            callback={() => this.handleSubmit({ id: (defaultData as InterUiDistritoMantEdit).id })}
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
                            onSubmit={ (values, { setSubmitting }) => {
                                const formattedValues = {
                                  ...values,
                                  orden: Number(values.orden),
                                  provincia: {
                                    id: Number(values.provincia.id)
                                  }
                                };
                                if (mode === 'edit') {
                                  (formattedValues as InterUiDistritoMantEdit).id = Number((values as InterUiDistritoMantEdit).id);
                                    this.handleSubmit(formattedValues);
                                } else if (mode === 'create') {
                                    this.handleSubmit(formattedValues);
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="p-4 md:p-5">
                                    <div className="grid gap-4 grid-cols-2">
                                        { mode === 'create' && (
                                            <div className="col-span-2">
                                                <label htmlFor="departamento-id" className="block mb-2 text-sm font-medium text-gray-900">Departamento</label>
                                                <Field
                                                    as="select"
                                                    name="departamento.id"
                                                    id="departamento-id"
                                                    onChange={this.handleChangeDepartamento}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                    readOnly={!isEditable}
                                                >
                                                    {departamentos?.map((departamento) => (
                                                        <option key={departamento.id} value={departamento.id}>
                                                            {departamento.descripcion}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {isEditable && <ErrorMessage name="departamento.id" component="div" className="text-red-600 text-sm mt-1" />}
                                            </div>
                                        )}

                                        <div className="col-span-2">
                                            <label htmlFor="provincia-id" className="block mb-2 text-sm font-medium text-gray-900">Provincia</label>
                                            <Field
                                                as="select"
                                                name="provincia.id"
                                                id="provincia-id"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                readOnly={!isEditable}
                                            >
                                                {provincias?.map((provincia) => (
                                                    <option key={provincia.id} value={provincia.id}>
                                                        {provincia.descripcion}
                                                    </option>
                                                ))}
                                            </Field>
                                            {isEditable && <ErrorMessage name="provincia.id" component="div" className="text-red-600 text-sm mt-1" />}
                                        </div>

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
                                                    { isSubmitting }
                                                    <UiButton
                                                        type={'submit'}
                                                        disabled={false}
                                                        color={'green'}
                                                        icon={'Save'}
                                                        text={mode === 'edit' ? 'Guardar' : 'Crear'}
                                                    />
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

export default UiDistritoMant;