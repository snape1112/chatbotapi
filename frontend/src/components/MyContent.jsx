import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import ListJsonFiles from '../pages/ListJsonFiles'
import AddNewJsonfile from '../pages/AddNewJsonFile'
import Login from '../pages/Login'
const MyContent = () => {
    return (

        <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/list-json-files' element={<ListJsonFiles/>}/>
            <Route path='/add-new-json' element={<AddNewJsonfile/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    )
}

export default MyContent