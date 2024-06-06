import { FaBeer, FaEdit, FaEye, FaPowerOff, FaTrash } from 'react-icons/fa';
import { IconInterface } from './InterUiIcon';
import { IconType } from 'react-icons';

const UiIcon: React.FC<IconInterface> = ({ name, size, color, className }) => {
  const iconMap: { [key: string]: IconType } = {
    Beer: FaBeer,
    Power: FaPowerOff,
    Edit: FaEdit,
    Delete: FaTrash,
    View: FaEye
  };

  const IconComponent = iconMap[name];

  return <IconComponent size={size} color={color} className={className} />;
};

export default UiIcon;

