import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import "./css/AppLayout.css"
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../redux/constants/Auth';
import { resetState } from '../redux/actions';
import { useDispatch } from 'react-redux';



export default (props) => {

  const dispatch = useDispatch()


  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: 'home',
      icon: <MailOutlined />,
    },
    {
      label: <Link onClick={() => dispatch(resetState())} to={"/list-json-files"}>List Json Files</Link>,
      key: 'listjsonfiles',
      icon: <MailOutlined />,
    },
    {
      label: <Link to={"/add-new-json"}>Add New Json File</Link>,
      key: 'addnewjsonfile',
      icon: <MailOutlined />,
    },
    {
      label: <Link to={"/login"}>Login</Link>,
      key: 'login',
      icon: <MailOutlined />,
    }
  ];

  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
        />

      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
          marginTop: 64,
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>

        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 380,
          }}
        >
          {props.content}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        <a href='https://akadimia.net' target="blank">Akadimia.net</a> ©2022 Created by <a href='https://developerslobby.com' target="blank">Developers Lobby</a>
      </Footer>
    </Layout>
  )

};