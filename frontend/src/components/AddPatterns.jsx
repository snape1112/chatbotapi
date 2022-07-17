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

const AddPatterns = () => {

    const { selected_file, tag_to_edit } = useSelector((state) => state.jsonFilesReducer)



    return (
        <div>
            <Form.List
                name="patterns"
                initialValue={tag_to_edit !== null ? tag_to_edit.patterns : null}
                rules={[
                    {
                        validator: async (_, names) => {
                            if (!names || names.length < 1) {
                                return Promise.reject(new Error('At least 1 pattern'));
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Patterns' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input pattern or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="pattern name" style={{ width: '90%' }} />
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
                                Add Pattern
                            </Button>

                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </div>
    )
}

export default AddPatterns