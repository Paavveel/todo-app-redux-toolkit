import React from 'react';
import styles from '../styles/modules/button.module.scss';
import { getClasses } from '../utils/utils';

const buttonTypes = {
  primary: 'primary',
  secondary: 'secondary',
};

function Button({ type, variant = 'primary', children, ...props }) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
      {...props}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, id, ...props }) {
  return (
    <select
      id={id}
      className={getClasses([styles.button, styles.button__select])}
      {...props}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
