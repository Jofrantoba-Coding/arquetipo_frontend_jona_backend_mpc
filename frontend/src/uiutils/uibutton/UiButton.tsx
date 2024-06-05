import React from 'react';
import { ButtonInterface } from './InterUiButton';
import UiIcon from '../uiicon/UiIcon';

const UiButton: React.FC<ButtonInterface> = ({ type, text, icon, callback, href }) => {

  if (type === 'link') {
    return (
      <a href={href} className="button bg-[#DD3333] hover:bg-[#373737] text-white focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center">
        {text}
      </a>
    );
  }

  return (
    <button type={type} className="button bg-[#DD3333] hover:bg-[#373737] text-white focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 text-center" onClick={callback}>
      {text}
      { icon && (
        <UiIcon name={icon} />
      )}
    </button>
  );
};

export default UiButton;