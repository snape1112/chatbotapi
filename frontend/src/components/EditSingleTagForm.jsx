import React from 'react'
import { Form, Input, Button, Card, Checkbox, Row, Col, message, Collapse, Typography } from 'antd';
import { RollbackOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentJsonCode, setCurrentJsonFile, setEditedTag, setMode, setTagToEdit } from '../redux/actions';
import AddPatterns from './AddPatterns';
import AddResponses from './AddRespones';
import AddContext from './AddContext';
import APIService from '../services';
const { Paragraph } = Typography
const EditSingleTagForm = () => {

    const { selected_file, tag_to_edit, edited_tag } = useSelector((state) => state.jsonFilesReducer)
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const onFinish = (values) => {

        let old_tag = JSON.stringify(tag_to_edit)
        let edited_tag = JSON.stringify(values)

        if (old_tag === edited_tag) {
            message.error("You have not changed anything yet")
        } else {
            dispatch(setEditedTag(values))
            let post_data = {
                filepath: selected_file,
                old_tag: old_tag,
                edited_tag: edited_tag
            }


            APIService.edit_file(post_data)
                .then(resp => {
                    console.log(resp)
                    dispatch(setTagToEdit(values))
                    message.success("Tag Updated")
                    dispatch(setEditedTag(null))
                    dispatch(setTagToEdit(null))
                })

        }




    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>

            <Paragraph>
                <Button icon={<RollbackOutlined />} type="danger" onClick={() => { dispatch(setTagToEdit(null)) }}>Go Back</Button><br></br>Current Selected File is : <b>{selected_file}</b>
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
                            initialValue={tag_to_edit.tag}
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

            </Row>

        </div>
    )
}

export default EditSingleTagForm