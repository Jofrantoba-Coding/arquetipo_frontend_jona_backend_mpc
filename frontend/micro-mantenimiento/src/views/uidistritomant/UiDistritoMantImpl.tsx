/* React */
import React from "react";

/* Servicios API */
import { getDepartamentosAll } from "../../services/api-mantenimientos/departamento";
import { createDistrito, deleteDistrito, updateDistrito } from "../../services/api-mantenimientos/distrito";
import { getProvinciaByIdDepartamento } from "../../services/api-mantenimientos/provincia";

/* Componentes */
import { InterUiDistritoMantCreate, InterUiDistritoMantEdit, InterUiDistritoMantDelete } from "./InterUiDistritoMant";
import UiDistritoMant from "./UiDistritoMant";
import { UiDistritoMantProps } from "./UiDistritoMantProps";

/* Libreria Shared */
import { showToast } from "shared";


class UiDistritoMantImpl extends UiDistritoMant {
  constructor(props: UiDistritoMantProps) {
    super(props);
    this.loadingData = this.loadingData.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeDepartamento = this.handleChangeDepartamento.bind(this);
  }

  async loadingData() {
    const departamentos = await getDepartamentosAll();
    let provincias = [];
    if (this.props.data?.iddepartamento) {
      provincias = await getProvinciaByIdDepartamento(Number(this.props.data.iddepartamento));
    }
    this.setState({
      departamentos,
      provincias
    });
  }

  handleChangeDepartamento = async (event: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const selectedDepartamentoId = event.target.value;
    const provincias = await getProvinciaByIdDepartamento(Number(selectedDepartamentoId));
    console.log('provincias', provincias)
    this.setState({ provincias });
  };

  handleCreate = async (data: InterUiDistritoMantCreate) => {
    const dataCreate = await createDistrito(data);
    showToast({ type: 'success', message: 'Distrito creado' })
    console.log('dataCreate', dataCreate)
    this.props.onClose();
  }

  handleUpdate = async (data: InterUiDistritoMantEdit) => {
    const dataUpdate = await updateDistrito(data);
    showToast({ type: 'success', message: 'Distrito actualizado' })
    console.log('dataUpdate', dataUpdate)
    this.props.onClose();
  }

  handleDelete = async (data: InterUiDistritoMantDelete) => {
    const dataDelete = await deleteDistrito(data)
    console.log('dataDelete', dataDelete)
    this.props.onClose();
  }

  loadProvinciasForDepartamento = async (departamentoId: number) => {
    const provincias = await getProvinciaByIdDepartamento(departamentoId);
    this.setState({ provincias });
  }

  componentDidMount() {
    this.loadingData();
  }

  render() {
    return (
      <UiDistritoMant
        {...this.props}
        handleCreate={this.handleCreate}
        handleUpdate={this.handleUpdate}
        handleDelete={this.handleDelete}
        handleChangeDepartamento={this.handleChangeDepartamento}
        provincias={this.state.provincias}
        departamentos={this.state.departamentos}
      />
    );
  }
}

export default UiDistritoMantImpl;