import Sidebar from './Chat/Sidebar'
const Calling = () => {
  return (
    <div className='flex'>
      <Sidebar></Sidebar>
      <div className='h-screen w-screen flex justify-center flex-col gap-4 items-center var(--text-color)'>
          <p className='text-5xl animate-pulse'>Working in Progress !!!</p>
          <p className='text-5xl'>Will be Soon</p>
      </div>
    </div>
  )
}

export default Calling