/* Interfaces */
import { InterUiDistritoGrid } from "../uidistritogrid/InterUiDistritoGrid";
import { InterUiDistritoMantCreate, InterUiDistritoMantEdit, InterUiDistritoMantDelete, InterUiProvincia, InterUiDepartamento } from "./InterUiDistritoMant";

/* Librerias externas */
import * as Yup from 'yup';

/* Librerias externas */
import { INVALID } from '../../constants/validation';

export interface UiDistritoMantProps {
    handleChangeDepartamento?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCreate?: (data: InterUiDistritoMantCreate) => Promise<void>;
    handleUpdate?: (data: InterUiDistritoMantEdit) => Promise<void>;
    handleDelete?: (data: InterUiDistritoMantDelete) => Promise<void>;
    provincias?: InterUiProvincia[];
    departamentos?: InterUiDepartamento[];
    mode: 'create' | 'edit' | 'view' | 'delete'
    data?: InterUiDistritoGrid | null;
    onClose: () => void;
    onSubmit: (data: InterUiDistritoMantCreate | InterUiDistritoMantEdit) => void;    
}

export const validationUpdateSchema = Yup.object({
    id: Yup.number().required(INVALID.REQUIRED).positive(INVALID.ID),
    descripcion: Yup.string().required(INVALID.REQUIRED),
    codigoDistrito: Yup.string().required(INVALID.REQUIRED),
    orden: Yup.number().required(INVALID.REQUIRED).min(0, INVALID.MIN_ZERO),
    provincia: Yup.object({
        id: Yup.number().required(INVALID.REQUIRED).positive(INVALID.ID)
    }).required(INVALID.REQUIRED)
});

export const validationCreateSchema = Yup.object({
    descripcion: Yup.string().required(INVALID.REQUIRED),
    codigoDistrito: Yup.string().required(INVALID.REQUIRED),
    orden: Yup.number().required(INVALID.REQUIRED).min(0, INVALID.MIN_ZERO),
    provincia: Yup.object({
        id: Yup.number().required(INVALID.REQUIRED).positive(INVALID.ID)
    }).required(INVALID.REQUIRED)
});