/* Interfaces */
export interface MenuItem {
    id: number;
    descripcion: string;
    nivel: number;
    orden: number;
    path: string;
    tipo: string;
    numerosubmenu: number;
    icono?: string | null;
    submenus?: MenuItem[];
}

export interface MenuProps {
    data: MenuItem[];
    callback: (id: number) => void;
}