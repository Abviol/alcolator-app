import * as React from 'react';
import { IInputValidation, IQuestions } from '../models';

type Block = 'common' | 'warning'

interface BlockProps {
   children: React.ReactNode
   type?: Block
   title: string
   id?: string
   validation?: any
}

export function Block({ children, type, title, id, validation }: BlockProps) {

   var blockClass;
   switch(type) {
      case 'warning':
         blockClass = 'block block-warning';
         break;
      default: 
         blockClass = 'block block-common';
   }

   return(
      <div className={blockClass} id={id}>
         <div className="block__container">
            <h4 className="block__title">{ title }</h4>
            <div className="block__content">
               {children}
               {validation && (validation as any)[id as string].status === false && <p style={{ color: '#DC0000' }}>{(validation as any)[id as string].error }</p>}
            </div>
         </div>
      </div>
   )
}