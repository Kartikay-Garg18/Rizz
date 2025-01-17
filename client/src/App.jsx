import React, {useState} from 'react'
import LoginForm from './components/Login/LoginForm.jsx';
import SignUp from './components/SignUp/SignUp.jsx'

function App() {

  let [toggle, settoggle] = useState(false);
  return (
    <>
      <div className="loginBtn flex justify-end m-4">
        <button className='border p-2 bg-green-500 text-white font-bold rounded-lg w-1/12 text-lg' onClick={() => settoggle(!toggle)}>{toggle ? 'SignUp' : 'SignIn'}</button>
      </div>
      <div className="first display flex justify-center items-center h-screen flex-col -m-20 mx-auto w-screen">
        <h1 className='font-bold text-4xl text-center my-10'>{toggle ? 'Welcome to Rizz 🤗' : 'Register Here' }</h1>

        {toggle ? <LoginForm /> : <SignUp />}
      </div>
    </>
  )
}

export default App
