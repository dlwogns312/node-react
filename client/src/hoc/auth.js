import React, { useEffect } from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'
import {useNavigate} from 'react-router-dom'

export default function (SpecificComponent,option,adminRoute=null){
    function AuthenticationCheck(props){

        const dispatch=useDispatch();
        let navigate = useNavigate();

        useEffect(()=>{
            dispatch(auth()).then(response=>{
                if(!response.payload.isAuth)
                {
                    if(option){
                        navigate('/login')
                    }
                }else{
                    if(adminRoute&&!response.payload.isAdmin){
                        navigate('./')
                    }else{
                        if(!option){
                            navigate('/')
                        }
                    }

                }
            })
        },[])
        return (
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}