import React from 'react'
import { Input,Form,message } from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import '../styles/RegisterStyles.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import { getUser } from '../redux/features/userSlice'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //form Handler
  const onFinishHandler =async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login', values)
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem('token', res.data.token)
         localStorage.setItem("user", JSON.stringify(res.data.user)); 
        dispatch(getUser(res.data.user));
         message.success('login successfully')
        navigate('/')

      }else{
        message.error(res.data.message)
      }
    
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('something went wrong')
    }
  }
  return (
    <div>
      <>
         <div className="form-container">
    <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
    <h3 className='text-center'>Login Page</h3>
      <Form.Item label='Email' name="email">
        <Input type='email' required/>
      </Form.Item>
      <Form.Item label='Password' name="password">
        <Input type='password' required/>
      </Form.Item>
      <Link to='/register' className='m-2 mt-5 text-decoration-none'>Not a user Register Here</Link>
      <button className='btn btn-primary mt-3'>Login</button>

    </Form>

    </div>
      </>
    </div>
  )
}

export default Login
