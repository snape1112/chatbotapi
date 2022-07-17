import React from 'react'
import { Form, Input, Button, Checkbox, notification, message } from 'antd';


import {useNavigate} from "react-router-dom"
import APIService from '../services';
const AddNewJsonFileForm = () => {

    const [form] = Form.useForm();

    let navigate = useNavigate();


    const onFinish = (values) => {
        console.log('Success:', values);
        APIService.add_folder_and_new_json_file(values)
        .then(resp=>{
            form.resetFields()
            navigate("/list-json-files")
            message.success("Successfully Added New Json File")
        })
        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div><Form
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

            form={form}
        >
            <Form.Item
                label="Folder Name"
                name="foldername"
                rules={[
                    {
                        required: true,
                        message: 'Please input foldername!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="File Name"
                name="filename"
                rules={[
                    {
                        required: true,
                        message: 'Please input filename!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            
       
            <Form.Item
                wrapperCol={{
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form></div>
    )
}

export default AddNewJsonFileForm