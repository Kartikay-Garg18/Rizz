import React from 'react';
import logo from '../../../public/favicon.png';
import profile from '../../assets/ProfilePhoto.jpg';

function Header() {
    return (
        <div className="m-2 h-[10vh] w-full flex justify-between items-center">
            <div className='ml-5 flex justify-start items-center '>
                <img src={logo} alt="logo" className='mx-4 size-8' />
                <h1 className='font-bold text-4xl'>RIZZ</h1>
            </div>
            <div className='mx-2 flex justify-center items-center gap-14 text-xl'>
                <a href="">Home</a>
                <a href="">About</a>
                <a href="">Help</a>
                <a href="">Contact</a>
            </div>
            <div className='mr-5  flex justify-end items-center'>
                <button className='mx-2 p-2 text-xl btn btn-floating bg-gray-500 text-white '>
                    Get Started
                </button>
                <img src={profile} alt="Profile Photo" className='mx-2 size-7 rounded-full' />
            </div>
        </div>
    )
}

export default Header