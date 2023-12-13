import * as React from 'react';

interface CheckboxProps {
   text: string
   name: string
   id: string
}

export function Checkbox({ text, name, id }: CheckboxProps) {
   return (
      <div className="checkbox">
         <input type='checkbox' name={name} id={id} />
         <label htmlFor={id} className="checkbox__label">{text}</label>
         <span className="checkbox__button"></span>
      </div>
   )
}