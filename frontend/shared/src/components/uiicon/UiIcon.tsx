/* React */
import React from 'react';

/* Librerias externas */
import { FaBeer, FaEdit, FaEye, FaPowerOff, FaSave, FaBuilding, FaTimesCircle, FaTrash, FaPlus, FaFileExcel, FaSearch, FaTimes } from 'react-icons/fa';
import { IconType } from 'react-icons';

/* Interfaces */
import { InterUiIcon } from './InterUiIcon';

const UiIcon: React.FC<InterUiIcon> = ({ name, size, color, className }) => {
  const iconMap: { [key: string]: IconType } = {
    Beer: FaBeer,
    Power: FaPowerOff,
    Edit: FaEdit,
    Add: FaPlus,
    Search: FaSearch,
    Export: FaFileExcel,
    Build: FaBuilding,
    Close: FaTimes,
    CloseCircle: FaTimesCircle,
    Save: FaSave,
    Delete: FaTrash,
    View: FaEye
  };

  const IconComponent = iconMap[name];

  return <IconComponent size={size} color={color} className={className} />;
};

export default UiIcon;

