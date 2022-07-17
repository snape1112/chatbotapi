import React, { useEffect, useState } from 'react'
import { FileTextOutlined, DownloadOutlined, EditOutlined, StarOutlined, FileAddOutlined } from '@ant-design/icons';
import { Typography, Space, Button, Row, Col, message, Collapse } from 'antd'
import { setCurrentJsonFile, setLoading, setMode } from '../redux/actions';
import { useDispatch } from 'react-redux';
import './css/JsonFile.css'
import APIService from '../services';

const { Panel } = Collapse;
const { Paragraph } = Typography;

const JsonFile = ({ folder_name, file_name, filepath }) => {
    const dispatch = useDispatch()

    // const [dlFiles, setDLFiles] = useState([])

    const addTagClickHandler = (filepath) => {


        dispatch(setLoading(true))



        setTimeout(function () {
            dispatch(setCurrentJsonFile(filepath))
            dispatch(setMode("add"))
            dispatch(setLoading(false))
        }, 1000);


    }

    const editFileClickHandler = (filepath) => {


        dispatch(setLoading(true))

        setTimeout(function () {

            dispatch(setCurrentJsonFile(filepath))
            dispatch(setMode("edit"))
            dispatch(setLoading(false))


        }, 1000);


    }
    
    const trainModelClickHandler = (filepath) => {

        APIService.train_model_from_json_file({ filepath: filepath })
            .then(resp => {
                message.success(resp)
            })
    }

    // useEffect(() => {

    //     APIService.single_folder_detail({ filepath: filepath })
    //         .then(resp => {
    //             // console.log(resp)
    //             setDLFiles(resp)
    //         })

    // }, [])



    return (
        <>

            <Space align="center" direction="vertical" size="middle" style={{ display: 'flex' }}>
                <FileTextOutlined style={{ fontSize: "100px" }} />

                <Paragraph><b>{folder_name}</b>/{file_name}</Paragraph>

                {/* <Collapse accordion>
                    <Panel header="Deep Learning Files" key="1">
                        <ul>
                            {dlFiles.map((dl_file, index)=>{
                                <li key={index}>{dl_file.filepath}-Created At: {dl_file.created_at}</li>
                            })}
                        </ul>
                        
                    </Panel>
                </Collapse> */}

                <Row>
                    <Col>
                        <Button type="primary" shape="round" icon={<StarOutlined />} size="medium" onClick={() => trainModelClickHandler(filepath)}>
                            Train Model
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" shape="round" icon={<EditOutlined />} size="medium" onClick={() => editFileClickHandler(filepath)}>
                            Edit File
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" shape="round" icon={<FileAddOutlined />} size="medium" onClick={() => addTagClickHandler(filepath)}>
                            Add Tag
                        </Button>
                    </Col>
                </Row>

            </Space>




        </>
    )
}

export default JsonFile