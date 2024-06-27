import React from 'react';
import { ButtonInterface } from './InterUiButton';
import UiIcon from '../uiicon/UiIcon';

const colorClasses = {
  blue: "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
  alternative: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100",
  dark: "bg-gray-800 hover:bg-gray-900 focus:ring-gray-300",
  light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-100",
  green: "bg-green-700 hover:bg-green-800 focus:ring-green-300",
  red: "bg-red-700 hover:bg-red-800 focus:ring-red-300",
  yellow: "bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300",
  purple: "bg-purple-700 hover:bg-purple-800 focus:ring-purple-300",
};

const UiButton: React.FC<ButtonInterface> = ({ type, text, icon, className, disabled = false, callback, href, color = 'red' }) => {
  const colorClass = colorClasses[color];

  if (type === 'link') {
    return (
      <a href={href} className={`button text-white font-medium rounded-md text-sm px-5 py-2.5 text-center ${colorClass} ${className}`}>
        {text}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      className={`button flex gap-2 items-center text-white font-medium rounded-md text-sm px-5 py-2.5 text-center ${colorClass} ${className}`} 
      disabled={disabled}
      onClick={callback}
    >
      { icon && (
        <UiIcon name={icon} className=""/>
      )}
      {text}
    </button>
  );
};

export default UiButton;