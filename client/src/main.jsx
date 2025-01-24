import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from './components/Signup.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import LoginForm from './components/Login/LoginForm.jsx'
import Home from './components/Home.jsx'
// import { LampDemo } from './components/ui/Lamp.jsx'

const router = createBrowserRouter([{
  path:'/',
  element: <App/>,
  children: [
    {
      path: '/',
      element: <Home/>
    }, {
      path: '/signup',
      element: (<AuthLayout authentication={false}>
        <Signup />
        </AuthLayout>)
    }, {
      path: '/login',
      element: (<AuthLayout authentication={false}>
        <LoginForm />
        </AuthLayout>)
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
