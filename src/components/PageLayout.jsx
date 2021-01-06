import React from 'react'
import { Layout } from 'antd';
import PageHeader from './PageHeader'
//import { Content, Footer,Header } from 'antd/lib/layout/layout';
import PageRouter from './PageRouter'

const { Header, Footer, Sider, Content } = Layout;

const PageLayout = () =>{
    return (
        <Layout>
            <Header className="movielens-header">
                <PageHeader / >
            </Header>
            <Content>
                <PageRouter/>
            </Content>
            <Footer className="movielens-footer">
                this is footer
            </Footer>
            
        </Layout>
    )
}

export default PageLayout