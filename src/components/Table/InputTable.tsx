import React from 'react'

interface Validations {
    required?: string;
    validateEmail?: boolean;
    onlyNumbers?: boolean;
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  }

const InputTable = () => {
  return (
    <input>
    </input>
  )
}

export default InputTable