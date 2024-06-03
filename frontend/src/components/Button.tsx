import React from 'react';
import { ButtonInterface } from './InterButton';

const Button: React.FC<ButtonInterface> = ({ type, text, callback }) => {
  return (
    <button 
        type={type}
        className="button bg-[#DD3333] hover:bg-[#373737] text-white focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center"
        onClick={callback}
    >
      {text}
    </button>
  );
};

export default Button;
