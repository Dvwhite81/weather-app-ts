import { FC } from 'react';

interface AlertProps {
  message: string;
}

export function AlertComponent(className: string): FC<AlertProps> {
  return ({ message }) =>
    message
      ? <div className={`alert alert-${className}`}>{message}</div>
      : null
}

export const ErrorAlert = AlertComponent('danger');
export const WarningAlert = AlertComponent('warning');
