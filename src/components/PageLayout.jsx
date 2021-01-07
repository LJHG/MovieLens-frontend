import { HeartOutlined, PlusSquareOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { Layout, Menu, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import logo from '../images/logo.png';
import PageRouter from './PageRouter';
import axios from 'axios'
import { host } from '../config'

const { Header, Footer, Content } = Layout;

const { SubMenu } = Menu;

const PageLayout = () => {


  const [mode,setMode] = useState(1)

  const modeSelectHandler= (m) =>{
    axios.get(host+'/profile/settings/change-mode/'+m).then((res)=>{
      if(res.data.code === 0){
        setMode(m)
        window.location.href = '/'
      }else{
        alert(res.data.msg);
      }
    }).catch((e)=>{
      alert(e);
    })

    
  }
  
  useEffect(()=>{
    axios.get(host+'/profile/settings/get-mode').then((res)=>{
      if(res.data.code === 0){
        setMode(res.data.data)
      }else{
        alert(res.data.msg);
      }
    }).catch((e)=>{
      alert(e);
    })
  },[])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "white" }}>
        <Row align="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={16}>
            <div className="header-wrapper">
              <div className="logo-container">
                <Link to="/">
                  <img src={logo} alt="logo" className="logo-img" />
                  <span className="logo-text">LensMovie</span>
                </Link>
              </div>
              {/* <Search
                
                placeholder="input search text"
                enterButton="Search"
                size="middle"
                style={{maxWidth:"350px"}}
                // suffix={suffix}
                // onSearch={onSearch}
              /> */}
              <Menu mode="horizontal" theme="light">
                <Menu.Item key="pick_groups" icon={<PlusSquareOutlined />}>
                  <Link to="/profile/settings/pick-groups">
                    Choose categories
                </Link>
                </Menu.Item>
                <Menu.Item key="my_rating" icon={<HeartOutlined />}>
                  <Link to="/profile/rates">
                    My ratings
                </Link>
                </Menu.Item>
                <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Change mode" selectedKeys={[mode]} >
                  <Menu.Item key="info" disabled={true}>Current mode : {mode}</Menu.Item>
                  <Menu.Item onClick={modeSelectHandler.bind(this,1)} key="1">mode 1</Menu.Item>
                  <Menu.Item onClick={modeSelectHandler.bind(this,2)} key="2">mode 2</Menu.Item>
                  <Menu.Item onClick={modeSelectHandler.bind(this,3)} key="3">mode 3</Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </Col>
        </Row>
      </Header>
      <Content>
        <Row justify="center" align="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={16}>
            <PageRouter />
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
    </Layout>
  )
}

export default PageLayout