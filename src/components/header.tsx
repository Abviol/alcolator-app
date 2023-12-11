import React from 'react';
import { app_title } from '../data/app.data';

export function Header() {
   return(
      <header className='header'>
         <div className="container">
            <div className="navbar">
               <div className="brand">
                  <span className='brand__text'>
                     {app_title}
                  </span>
               </div>
            </div>
         </div>
      </header>
   )
}