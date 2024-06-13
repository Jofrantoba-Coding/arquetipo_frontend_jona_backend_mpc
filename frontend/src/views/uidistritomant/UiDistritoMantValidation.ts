import * as Yup from 'yup';

export const validationUpdateSchema = Yup.object({
    id: Yup.number().required('Required').positive('Must be a valid province ID'),
    descripcion: Yup.string().required('Required'),
    codigoDistrito: Yup.string().required('Required'),
    orden: Yup.number().required('Required').min(0, 'Must be greater than or equal to 0'),
    provincia: Yup.object({
        id: Yup.number().required('Required').positive('Must be a valid province ID')
    }).required('Required')
});

export const validationCreateSchema = Yup.object({
    descripcion: Yup.string().required('Required'),
    codigoDistrito: Yup.string().required('Required'),
    orden: Yup.number().required('Required').min(0, 'Must be greater than or equal to 0'),
    provincia: Yup.object({
        id: Yup.number().required('Required').positive('Must be a valid province ID')
    }).required('Required')
});