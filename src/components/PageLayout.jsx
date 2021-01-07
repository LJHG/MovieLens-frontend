import { HeartOutlined, PlusSquareOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { Layout, Menu, Row, Col } from 'antd';
import React from 'react';
import logo from '../images/logo.png';
import PageRouter from './PageRouter';

const { Header, Footer, Content } = Layout;

const { SubMenu } = Menu;

const PageLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "white" }}>
        <Row align="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={20} xxl={16}>
            <div className="header-wrapper">
              <div className="logo-container">
                <Link to="/">
                  <img src={logo} alt="logo" className="logo-img" />
                  <span className="logo-text">lensMovie</span>
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
                    选择分组
                </Link>
                </Menu.Item>
                <Menu.Item key="my_rating" icon={<HeartOutlined />}>
                  <Link to="/profile/about-your-ratings">
                    我的评分
                </Link>
                </Menu.Item>
                <SubMenu key="SubMenu" icon={<SettingOutlined />} title="切换推荐模式">
                  <Menu.Item key="setting:1">模式1</Menu.Item>
                  <Menu.Item key="setting:2">模式2</Menu.Item>
                  <Menu.Item key="setting:3">模式3</Menu.Item>
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