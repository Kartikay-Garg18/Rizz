import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected(
    {children, authentication = true}
) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(!authentication && !authStatus){
            navigate({children})
        } else if(!authentication && authStatus){
            navigate('/')
        } else if(authentication && !authStatus){
            navigate('/login')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
  return loader ? <div>Loading...</div> : <>{children}</>
}

