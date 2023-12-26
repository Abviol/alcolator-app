import * as React from 'react';

interface InputProps {
   placeholder?: string
   onInput?: (any: any) => void
}

export function Input({placeholder, onInput}: InputProps) {
   return (
      <input type="text" className="input input-question" placeholder={placeholder} onInput={onInput} />
   )
}