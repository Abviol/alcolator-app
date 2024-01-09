import React from 'react';
import { app_title } from '../data/app.data';
import { Link } from 'react-router-dom'

interface HeaderProps {
   title: string
   goBackButton?: boolean
}

export function Header({ title, goBackButton }: HeaderProps) {

   return (
      <header className='header'>
         {goBackButton &&
            <Link to='/'>
               <button className="header__icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" fill="currentColor"></path></svg>
               </button>
            </Link>
         }
         <div className="container">
            <div className="navbar">
               <div className="brand">
                  <span className='brand__text'>
                     {title}
                  </span>
               </div>
            </div>
         </div>
      </header>
   )
}