import * as React from 'react';

interface RadioButtonProps {
   text: string
   name: string
   id: string
   onChange?: (any?: any) => void
}

export function RadioButton({ text, name, id, onChange }: RadioButtonProps ) {
   return (
      <div className="radio-button">
         <input type="radio" name={name} id={id} onChange={onChange} />
         <label htmlFor={id} className="radio-button__label">{text}</label>
         <span className="radio-button__button"></span>
      </div>
   )
}