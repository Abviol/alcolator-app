import * as React from 'react';

type Block = 'common' | 'warning'

interface BlockProps {
   children: React.ReactNode
   type?: Block
   title: string
}

export function Block({children, type, title}: BlockProps) {

   var blockClass;
   switch(type) {
      case 'warning':
         blockClass = 'block block-warning';
         break;
      default: 
         blockClass = 'block block-common';
   }

   return(
      <div className={blockClass}>
         <div className="block__container">
            <h4 className="block__title">{ title }</h4>
            <div className="block__content">
               {children}
            </div>
         </div>
      </div>
   )
}