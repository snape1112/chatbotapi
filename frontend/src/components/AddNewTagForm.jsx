import { Form, Input, Button, Checkbox, Typography, Row, Col, message } from 'antd';
import AddPatterns from './AddPatterns';
import AddResponses from './AddRespones';
import AddContext from "./AddContext"
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentJsonCode, setCurrentJsonFile, setMode } from '../redux/actions';
import { RollbackOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import APIService from '../services';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
const { Paragraph } = Typography;
const MyForm = () => {

    const { selected_file, current_json_code } = useSelector((state) => state.jsonFilesReducer)
    const dispatch = useDispatch()
    const [form] = Form.useForm();


    useEffect(() => {
        APIService.show_single_json_file({ filepath: selected_file })
            .then((resp) => {
                dispatch(setCurrentJsonCode(resp))
            })
    }, [selected_file])

    const onFinish = (values) => {

        
        let post_data = {
            ...values,
            filepath: selected_file,
            // context: [""]
        }

        console.log(post_data)

        APIService.add_new_tag_to_existing_file(post_data)
            .then((resp) => {
                console.log(resp)
                message.success("Added New Tag to Current File")
                form.resetFields()
                dispatch(setCurrentJsonCode(resp))
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Paragraph>
                <Button icon={<RollbackOutlined />} type="danger" onClick={() => { dispatch(setCurrentJsonFile("")); dispatch(setCurrentJsonCode("")); dispatch(setMode("")) }}>Go Back</Button><br></br>Current Selected File is : <b>{selected_file}</b>
            </Paragraph>

            <Row>
                <Col span={12}>
                    <Form
                        name="basic"
                        form={form}
                        // labelCol={{
                        //     span: 8,
                        // }}
                        // wrapperCol={{
                        //     span: 16,
                        // }}

                        layout="vertical"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tag Name"
                            name="tag"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input tag name!',
                                },
                            ]}
                        >
                            <Input style={{ width: '90%' }} />
                        </Form.Item>


                        <AddPatterns />
                        <AddResponses />

                        <AddContext />




                        <Form.Item
                        // wrapperCol={{
                        //     offset: 8,
                        //     span: 16,
                        // }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12}>
                    <SyntaxHighlighter language="javascript" style={dark}>
                        {JSON.stringify(current_json_code, null, 2)}
                    </SyntaxHighlighter>
                </Col>
            </Row>

        </>
    );
};

export default MyForm;