import React from 'react';
import logo from '../../favicon.png';
import profile from '../../assets/ProfilePhoto.jpg';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="h-[10vh] w-full flex justify-between items-center">
            <div className='ml-5 flex justify-start items-center '>
                <img src={logo} alt="logo" className='mx-4 size-8' />
                <h1 className='font-bold text-4xl'>RIZZ</h1>
            </div>
            <div className='mx-2 flex justify-center items-center gap-14 text-xl '>
                <a href="" className='hover:bg-slate-200 hover:text-black p-4 rounded-2xl'>Home</a>
                <a href="" className='hover:bg-slate-200 hover:text-black p-4 rounded-2xl'>About</a>
                <a href="" className='hover:bg-slate-200 hover:text-black p-4 rounded-2xl'>Help</a>
                <a href="" className='hover:bg-slate-200 hover:text-black p-4 rounded-2xl'>Contact</a>
            </div>
            <div className='mr-5  flex justify-end items-center'>
                <Link to="/login" className='mx-2 p-2 text-xl btn btn-floating bg-gray-500 text-white '>
                    Get Started
                </Link>
                <img src={profile} alt="Profile Photo" className='mx-2 size-8 rounded-full cursor-pointer' />
            </div>
        </div>
    )
}

export default Header