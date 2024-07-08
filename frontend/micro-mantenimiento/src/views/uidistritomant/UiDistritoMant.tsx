/* React */
import React from "react";
import { Component } from 'react';

/* Librerias externas */
import { Formik, Form, Field, ErrorMessage } from 'formik';

/* Componentes */
import { UiDistritoMantState } from './UiDistritoMantState';
import { UiDistritoMantProps, validationUpdateSchema, validationCreateSchema } from './UiDistritoMantProps';
import { InterUiDistritoMantCreate, InterUiDistritoMantDelete, InterUiDistritoMantEdit, InterUiDistritoMantTitleCrud } from './InterUiDistritoMant';

/* Libreria Shared */
import { UiButton, UiIcon } from 'shared';

/* Librerias CSS */
import '../../resources/css/UiDistritoMant.css';
import 'shared/dist/main.css'


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

    render() {
        const { onClose, mode, departamentos, provincias } = this.props;
        const { defaultData } = this.state;
        const isEditable = mode === 'edit' || mode === 'create';

        return (
            <div
                id="crud-modal"
                className="crud-modal"
                onClick={onClose}
            >
                <div
                    className="crud-modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="crud-modal-header">
                        <h3 className="crud-modal-title">
                            {this.getTitle(mode)}
                        </h3>
                        <button
                            type="button"
                            className="crud-modal-close-button"
                            onClick={onClose}
                        >
                            <UiIcon name="Close" />
                        </button>
                    </div>

                    {mode === 'delete' ? (
                        <div className="crud-modal-body">
                            <p className="crud-modal-text">¿Está seguro de que desea eliminar este distrito?</p>

                            <div className="crud-modal-actions">
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
                                <Form className="crud-modal-form">
                                    <div className="crud-modal-grid">
                                        { mode === 'create' && (
                                            <div className="crud-modal-field">
                                                <label htmlFor="departamento-id" className="crud-modal-label">Departamento</label>
                                                <Field
                                                    as="select"
                                                    name="departamento.id"
                                                    id="departamento-id"
                                                    onChange={this.props.handleChangeDepartamento}
                                                    className="crud-modal-input"
                                                    readOnly={!isEditable}
                                                >
                                                    {departamentos?.map((departamento) => (
                                                        <option key={departamento.id} value={departamento.id}>
                                                            {departamento.descripcion}
                                                        </option>
                                                    ))}
                                                </Field>
                                                {isEditable && <ErrorMessage name="departamento.id" component="div" className="crud-modal-error-message" />}
                                            </div>
                                        )}

                                        <div className="crud-modal-field">
                                            <label htmlFor="provincia-id" className="crud-modal-label">Provincia</label>
                                            <Field
                                                as="select"
                                                name="provincia.id"
                                                id="provincia-id"
                                                className="crud-modal-input"
                                                readOnly={!isEditable}
                                            >
                                                {provincias?.map((provincia) => (
                                                    <option key={provincia.id} value={provincia.id}>
                                                        {provincia.descripcion}
                                                    </option>
                                                ))}
                                            </Field>
                                            {isEditable && <ErrorMessage name="provincia.id" component="div" className="crud-modal-error-message" />}
                                        </div>

                                        {mode !== 'create' && (
                                            <div className="crud-modal-field">
                                                <label htmlFor="id" className="crud-modal-label">ID</label>
                                                <Field
                                                    type="text"
                                                    name="id"
                                                    id="id"
                                                    className="crud-modal-input"
                                                    readOnly={isEditable}
                                                />
                                                {isEditable && <ErrorMessage name="id" component="div" className="crud-modal-error-message" />}
                                            </div>
                                        )}

                                        <div className="crud-modal-field">
                                            <label htmlFor="codigoDistrito" className="crud-modal-label">Código Distrito</label>
                                            <Field
                                                type="text"
                                                name="codigoDistrito"
                                                id="codigoDistrito"
                                                className="crud-modal-input"
                                                placeholder="Escribe el código del distrito"
                                                readOnly={!isEditable}
                                            />
                                            {isEditable && <ErrorMessage name="codigoDistrito" component="div" className="crud-modal-error-message" />}
                                        </div>

                                        <div className="crud-modal-field">
                                            <label htmlFor="descripcion" className="crud-modal-label">Descripción</label>
                                            <Field
                                                type="text"
                                                name="descripcion"
                                                id="descripcion"
                                                className="crud-modal-input"
                                                placeholder="Escribe la descripción"
                                                readOnly={!isEditable}
                                            />
                                            {isEditable && <ErrorMessage name="descripcion" component="div" className="crud-modal-error-message" />}
                                        </div>

                                        <div className="crud-modal-field">
                                            <label htmlFor="orden" className="crud-modal-label">Orden</label>
                                            <Field
                                                type="number"
                                                name="orden"
                                                id="orden"
                                                className="crud-modal-input"
                                                placeholder="Escribe el orden"
                                                readOnly={!isEditable}
                                            />
                                            {isEditable && <ErrorMessage name="orden" component="div" className="crud-modal-error-message" />}
                                        </div>

                                        <div className="crud-modal-divider"></div>

                                        <div className="crud-modal-actions">
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