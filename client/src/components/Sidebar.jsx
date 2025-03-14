import React from 'react'

const Sidebar = () => {
  const cl = "my-3 h-10 w-10  rounded-full";
  return (

    <div className='ml-2 my-2 py-4 bg-gray-950 opacity-65 w-[5%] overflow-y-aut flex justify-start items-center flex-col rounded-r-xl'>

            <img src="https://img.icons8.com/?size=100&id=118377&format=png&color=FFFFFF" alt="Chat icon" className={cl} />
            <img src="https://img.icons8.com/?size=100&id=9672&format=png&color=FFFFFF" alt="Explore icon" className={cl} />
            <img src="https://img.icons8.com/?size=100&id=vfXAPwB00Ntn&format=png&color=FFFFFF" alt="Call icon" className={cl} />
            <img src="https://img.icons8.com/?size=100&id=364&format=png&color=FFFFFF" alt="Setting icon" className={cl} />
          
        </div>
  )
}

export default Sidebar