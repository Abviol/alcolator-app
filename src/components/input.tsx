import * as React from 'react';

interface InputProps {
   placeholder: string
}

export function Input({placeholder}: InputProps) {
   return (
      <input type="text" className="input input-question" placeholder={placeholder} />
   )
}