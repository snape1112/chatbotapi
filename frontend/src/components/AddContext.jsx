import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const formItemLayout = {
    // labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 4 },
    // },
    // wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 20 },
    // },
};
const formItemLayoutWithOutLabel = {
    // wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 20, offset: 4 },
    // },
};

const AddContext = (props) => {

    const { selected_file, loading, mode, tag_to_edit } = useSelector((state) => state.jsonFilesReducer)


    // const { initvalues } = props

    return (
        <div>
            <Form.List
                name="context"
                initialValue={tag_to_edit?.context ? tag_to_edit.context : [""]}
                rules={[]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Context' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: false,
                                            whitespace: true,
                                            message: "Please input context or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="context name" style={{ width: '90%' }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '90%' }}
                                icon={<PlusOutlined />}
                            >
                                Add Context
                            </Button>

                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </div>
    )
}

export default AddContext