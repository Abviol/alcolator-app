import * as React from 'react';


interface BlockProps {
   children: React.ReactNode
   title: string
}

export function Block({children, title}: BlockProps) {
   return(
      <div className="block block-question">
         <div className="block__container">
            <h4 className="block__title">{ title }</h4>
            <div className="block__content">
               {children}
            </div>
         </div>
      </div>
   )
}