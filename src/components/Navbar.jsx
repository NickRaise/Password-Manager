import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white ' >
      <div className="mycontainer py-4 flex justify-between items-center">
        <div className="logo font-bold text-xl hover:cursor-pointer">
          <span  className='text-green-700'>&lt;</span>
          <span>Key</span><span className='text-green-700'>OP/&gt;</span>
          
        </div>
        <ul className='flex justify-between items-center gap-4'>
            <li className='hover:font-bold hover:cursor-pointer'>Home </li>
            <li className='hover:font-bold hover:cursor-pointer'>Contact</li>
            <li className='hover:font-bold hover:cursor-pointer'>About</li>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar