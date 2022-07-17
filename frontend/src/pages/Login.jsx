import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';

import { useEffect } from 'react';
import { useSelector, connect } from "react-redux"
import { signIn } from '../redux/actions/Auth';
import { useNavigate } from 'react-router-dom';
import { showAuthMessage, authenticated } from '../redux/actions/Auth';
const Login = (props) => {

    const {
        hideAuthMessage,
        showLoading,
        loading,
        showMessage,
        message,
        authenticated,
        showAuthMessage,
        token,
        signIn,
        redirect
    } = props

    const navigate = useNavigate()

    // const {authmessage} = useSelector((state)=>state.auth)


    const onFinish = (values) => {

        // console.log('Success:', values);
        signIn(values)
        navigate("/")

        // setTimeout(() => {
        //     	}, 2000);

        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {

        if (token !== null && token!=="") {
            navigate(redirect)
        }
        // if (showMessage) {
        // 	setTimeout(() => {
        // 		hideAuthMessage();
        // 	}, 2000);
        // }
    }, []);

    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 8,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        // offset: 8,
                        // span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form></div>
    )
}
const mapStateToProps = (state) => {
    const { token, redirect } = state.auth;
    return { token, redirect }
}

const mapDispatchToProps = {
    showAuthMessage,
    authenticated,
    signIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)