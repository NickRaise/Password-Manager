import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white ' >
      <div className="p-2 md:mycontainer md:py-2 flex justify-between items-center">
        <div className="logo font-bold text-xl hover:cursor-pointer">
          <span  className='text-green-600'>&lt;</span>
          <span>Key</span><span className='text-green-600'>OP/&gt;</span>
          
        </div>
        <div className="github-btn">
          <button className='bg-green-500 flex gap-1 justify-around items-center w-28 p-1 px-1 rounded-2xl md:ring-1 ring-white hover:bg-green-600 ease-in-out'>
            <img className='invert w-7' src="icons/github.svg" alt="GitIcon" />
            <span className='text-white font-bold'>GitHub</span>
          </button>
        </div>
        </div>
    </nav>
  )
}

export default Navbar