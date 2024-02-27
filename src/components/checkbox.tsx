import * as React from 'react';

interface CheckboxProps {
   text: string
   name: string
   id: string
   onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export function Checkbox({ text, name, id, onChange }: CheckboxProps) {
   return (
      <div className="checkbox">
         <input type='checkbox' name={name} id={id} onChange={onChange} />
         <label htmlFor={id} className="checkbox__label">{text}</label>
         <span className="checkbox__button"></span>
      </div>
   )
}