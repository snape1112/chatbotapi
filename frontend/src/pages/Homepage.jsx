import React from 'react'
import { Button, message } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../redux/constants/Auth';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';
const Homepage = () => {

  let navigate = useNavigate()

  let dispatch = useDispatch()


  const logoutHandler = () => {
    localStorage.removeItem(AUTH_TOKEN)
    dispatch(logout())
    message.success("Logout Successfully")

    navigate("/login")
  }
  return (
    <div>
      <Button type="primary" size="medium" icon={<PoweroffOutlined />} onClick={() => logoutHandler()}>
        Logout
      </Button>
    </div>
  )
}

export default Homepage