import React, { useEffect } from 'react'
import { Form, Input, Button, Card, Checkbox, Typography, Row, Col, message, Collapse } from 'antd';
import { RollbackOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux"
import { setCurrentJsonFile, setCurrentJsonCode, setMode, setTagToEdit } from '../redux/actions';
import APIService from '../services';


const { Paragraph } = Typography;

const { Panel } = Collapse;

const { Meta } = Card;


const EditFileForm = () => {

    const { selected_file, current_json_code } = useSelector((state) => state.jsonFilesReducer)
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    useEffect(() => {
        APIService.show_single_json_file({ filepath: selected_file })
            .then((resp) => {
                console.log(resp)
                dispatch(setCurrentJsonCode(resp))
            })
    }, [selected_file])


    // console.log(typeof current_json_code)

    const singleItemEdit = (item) => {
        console.log("Selected: ", item)
        dispatch(setTagToEdit(item))

    }


    return (
        <div>

            <Paragraph>
                <Button icon={<RollbackOutlined />} type="danger" onClick={() => { dispatch(setCurrentJsonFile("")); dispatch(setCurrentJsonCode("")); dispatch(setMode("")) }}>Go Back</Button><br></br>Current Selected File is : <b>{selected_file}</b>
            </Paragraph>

            <Row>
                <Col span={24}>

                    <Row gutter={16}>

                        {current_json_code ? current_json_code.map((item, card_index) => {
                            return (
                                <Col span={6}>

                                    <Card
                                        key={card_index}
                                        style={{marginBottom:"25px"}}
                                        hoverable
                                        // style={{ width: 240 }}
                                        actions={[
                                            <EditOutlined key="edit" onClick={() => singleItemEdit(item)} />,
                                        ]}
                                    >
                                        <Meta title={item.tag} />

                                        <div>
                                            <div>
                                                <h4>Patterns</h4>
                                                <ul>
                                                    {
                                                        item.patterns ?
                                                            item.patterns.map((pattern, pattern_index) => {

                                                                return <li key={pattern_index}>{pattern}</li>
                                                            })
                                                            :
                                                            ""
                                                    }
                                                </ul>
                                            </div>
                                            <div>
                                                <h4>Responses</h4>
                                                <ul>

                                                {
                                                    item.responses ?
                                                    item.responses.map((response, response_index) => {
                                                        
                                                        return <li key={response_index}>{response}</li>
                                                    })
                                                    :
                                                    ""
                                                }
                                                </ul>
                                            </div>
                                            <div>
                                                <h4>Context</h4>
                                                <ul>

                                                {
                                                    item.context ?
                                                    item.context.map((cntxt, cntxt_index) => {
                                                        
                                                        return <li key={cntxt_index}>{cntxt}</li>
                                                    })
                                                    :
                                                    ""
                                                }
                                                </ul>
                                            </div>
                                        </div>
                                    </Card>

                                </Col>
                            )
                        }) : ""}

                    </Row>



                </Col>
            </Row>



        </div>
    )
}

export default EditFileForm