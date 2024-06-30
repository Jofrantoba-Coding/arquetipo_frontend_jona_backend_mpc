import React from 'react';
import { ButtonInterface } from './InterUiButton';
import UiIcon from '../uiicon/UiIcon';
import '../../resources/css/UiButton.css' 

const colorClasses = {
  blue: "button-blue",
  alternative: "button-alternative",
  dark: "button-dark",
  light: "button-light",
  green: "button-green",
  red: "button-red",
  yellow: "button-yellow",
  purple: "button-purple",
};

const UiButton: React.FC<ButtonInterface> = ({ type, text, icon, className, disabled = false, callback, href, color = 'red' }) => {
  const colorClass = colorClasses[color];

  if (type === 'link') {
    return (
      <a href={href} className={`button ${colorClass} ${className}`}>
        {text}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      className={`button ${colorClass} ${className}`} 
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