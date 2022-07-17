import React from 'react';
import { useState } from 'react'
import AppLayout from './components/AppLayout';
import { Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content, Breadcrumb } = Layout;
import MyContent from './components/MyContent';
import './App.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {

  return (
    <div className="App">

      <Provider store={store}>
        <BrowserRouter>
            <AppLayout content={<MyContent />} />
        
        </BrowserRouter>
        
      </Provider>

    




    </div>
  )
}

export default App
