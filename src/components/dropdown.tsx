import React, { useEffect } from 'react';

type DropdownItem = {
   itemName: string
   itemValue?: any
};

interface DropdownMenuProps {
   placeholder: string
   value: any
   items: DropdownItem[]
   onChangeHandler?: (val: any) => void
};

export function Dropdown({ placeholder, value, items, onChangeHandler }: DropdownMenuProps) {

   //? toggle dropdown menu
   const toggleList = (e: MouseEvent) => {
      let list = document.querySelector<HTMLUListElement>('.dropdown__list'),
         listContainer = list?.querySelector<HTMLDivElement>('.dropdown__container'),
         listContainerHeight = `${listContainer?.offsetHeight}px`;
      if (list) {
         if ((e.target as HTMLElement).closest('.dropdown__selected-display')) {
            list.classList.toggle('dropdown__list_show');
            list.style.height = list.classList.contains('dropdown__list_show') ? listContainerHeight : '0';
         } else {
            list.classList.remove('dropdown__list_show');
            list.style.height = '0';
         }
      }
   };

   useEffect(() => {
      //* add event listener when component mounts
      document.addEventListener('click', toggleList);

      //* remove the listener when component unmounts
      return () => {
         document.removeEventListener('click', toggleList);
      };
   }, []); //* empty dependency array ensures the effect runs only once

   var selectedDisplay = document.querySelector<HTMLSpanElement>('.dropdown__selected-display'),
      selectedValue = document.querySelector<HTMLInputElement>('.dropdown__selected-value');

   //? set a new value
   const selectValue = (e: React.MouseEvent<HTMLLIElement>) => {
      let item = e.currentTarget,
         prevSelected = e.currentTarget.parentElement?.querySelector<HTMLUListElement>('li.dropdown__item_selected'),
         itemValue = item.querySelector<HTMLInputElement>('input.dropdown__item-value')?.value,
         itemName = item.querySelector<HTMLSpanElement>('.dropdown__item-name')?.textContent;
         

      //* update displaying selected value
      if (selectedDisplay && selectedValue && itemValue !== undefined && itemName !== undefined) {
         selectedDisplay.textContent = itemName;
         selectedValue.value = itemValue;

         //* manually trigger onInputHandler event
         const event = new Event('input', { bubbles: true });
         selectedValue.dispatchEvent(event); // Dispatching event
      }

      //* highlight the selected item
      item.classList.add('dropdown__item_selected');
      //* unhighlight the selected item
      prevSelected?.classList.remove('dropdown__item_selected');
   };

   return (
      <div className='dropdown'>
         <input type="text" className="dropdown__selected-value" value={value} onInput={onChangeHandler} onChange={onChangeHandler} />
         <span className="dropdown__selected-display">{placeholder}</span>
         <ul className="dropdown__list">
            <div className="dropdown__container">
               {items.map((item: DropdownItem, index: number) => (
                  <li className="dropdown__item" onClick={(e) => selectValue(e)} key={index}>
                     <input type="text" className="dropdown__item-value" value={item.itemValue ? item.itemValue : item.itemName} readOnly />
                     <span className="dropdown__item-name">{item.itemName}</span>
                     {item.itemValue && <span className="dropdown__item-tip">{item.itemValue}</span>}
                  </li>
               ))}
            </div>
         </ul>
      </div>
   );
}