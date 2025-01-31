import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from './components/Signup.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import Forgot from './components/Forgot.jsx'
import Chat from './components/Chat.jsx'

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
        <Login />
        </AuthLayout>)
    }, {
      path: '/forgot',
      element: (<AuthLayout authentication={false}>
        <Forgot />
        </AuthLayout>)
    },{
      path: '/chat',
      element:(<AuthLayout authentication={false}>
        <Chat />
        </AuthLayout>)
    },
    {
      path: '/*',
      element: <div>404</div>
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={router}/>
  </Provider>,
)
