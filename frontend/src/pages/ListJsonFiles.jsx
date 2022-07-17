import React from 'react'
import { useEffect, useState } from 'react'
import APIService from '../services'
import JsonFile from '../components/JsonFile'
import { Row, Col, Typography, Progress, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import EditSingleTagForm from '../components/EditSingleTagForm'
import AddNewTagForm from '../components/AddNewTagForm'
import EditFileForm from '../components/EditFileForm'
import { setCurrentJsonFile } from '../redux/actions'
const { Title, Paragraph } = Typography;
const ListJsonFiles = () => {

    const dispatch = useDispatch()
    const { selected_file, loading, mode, tag_to_edit } = useSelector((state) => state.jsonFilesReducer)


    const [files, setFiles] = useState([])

    useEffect(() => {
        APIService.list_all_json_files()
            .then(response => setFiles(response))
    }, [])


    return (
        <>

            {loading ? <Spin size="large" /> : ""}


            {
                selected_file !== "" && mode === "add" ?
                    <AddNewTagForm /> :
                    selected_file !== "" && mode === "edit" && tag_to_edit == null ?

                        <EditFileForm /> :
                        selected_file !== "" && mode === "edit" && tag_to_edit !== null ?

                            <EditSingleTagForm />
                            :

                            <Row gutter={[16, 16]}>

                                {files.map((file, index) => {

                                    const folder_name = file.split('\\').slice(-2, -1)[0]
                                    const file_name = file.split('\\')[file.split('\\').length - 1]


                                    return (
                                        <Col span={6} key={index} className="jsonfile">
                                            <JsonFile folder_name={folder_name} file_name={file_name} filepath={file} />

                                        </Col>

                                    )
                                })}
                            </Row>
            }

        </>
    )
}

export default ListJsonFiles