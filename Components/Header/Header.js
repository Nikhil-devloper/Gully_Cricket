import React, { useState, useRef, useContext, useEffect } from 'react';
import useOutsideClick from "../useOutsideClick";
import Link from 'next/link'
import AppContext from "../AppContext";


function Header() {

  const [isOpen, setOpen] = useState(false);
  const [isOverVisible, setOverVisible] = useState(false);
  const ref = useRef();
  const { overCount, setOverChange, resetGame } = useContext(AppContext);

  useOutsideClick(ref, () => {
    setOpen(false)
  });

  return (
    <div className='fixed w-full z-10 top-0'>
      <nav className="bg-gray-900 px-2 sm:px-4 py-2.5 rounded absolute w-full" ref={ref}>
        <div className="container flex flex-wrap justify-between items-center mx-auto">

          <a className="flex items-center">
            <img src="/image/ball.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white uppercase">Cricket</span>
          </a>

          <button onClick={() => setOpen(prevState => !prevState)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>

          <div className={`${isOpen ? '' : 'hidden'} w-full md:block md:w-auto" id="navbar-default overflow-hidden`}>
            <ul className="flex flex-col p-4 mt-4rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  bg-gray-800 md:bg-gray-900 border-gray-700">

              <li>
                <Link href="/">
                  <a className="block md:text-2xl py-2 pr-4 pl-3 rounded md:bg-transparent md:text-primary-gold md:p-0 text-white" aria-current="page">Home</a>
                </Link>
              </li>

              <li>
                <Link href="/about">
                  <a href="#" className="block md:text-2xl py-2 pr-4 pl-3  rounded  md:border-0 md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent">About</a>
                </Link>
              </li>

              <li>

                <a onClick={() => { setOpen(prevState => !prevState); resetGame();  }} href="#" className="block md:text-2xl py-2 pr-4 pl-3  rounded  md:border-0 md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Reset</a>

              </li>

              <li className='flex-1'> </li>

              <li>
                <button id="dropdownDefault" data-dropdown-toggle="dropdown" class="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center bg-primary-gold w-full" type="button" onClick={() => setOverVisible(prevState => !prevState)}>Change Over </button>

                {isOverVisible && <div id="dropdown" class="z-10 rounded divide-y divide-gray-100 shadow bg-gray-700 w-full max-h-28 overflow-y-hidden text-2xl text-center">
                  <ul className="grid grid-cols-5 gap-6 min-w-full py-1 text-sm  text-gray-200" aria-labelledby="dropdownDefault">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(ele => <li className='cursor-pointer' onClick={() => {  setOverVisible(false); setOverChange(ele); setOpen(false) }}> {ele} </li>)}
                  </ul>
                </div>
                }
              </li>



            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Header