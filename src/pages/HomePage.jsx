import { PageHeader, Typography,Row,Col,Pagination } from 'antd';
import React,{useEffect,useState} from 'react';
import MovieItem from '../components/MovieItem';
import {host} from '../config'
import axios from 'axios'
import {Link} from 'react-router-dom'

const { Title } = Typography

const HomePage = () => {

    const [topPicksData,setTopPicksData] = useState([]);
    const [rateMoreData,setRateMoreData] = useState([]);

    useEffect(()=>{
        //获取topPicks数据
        axios.get(host+'/explore/top-picks').then((res)=>{
            console.log(res.data.data);
            setTopPicksData(res.data.data);
        }).catch((e)=>{
            alert(e);
        });

         //获取rateMore数据
         axios.get(host+'/explore/rate-more').then((res)=>{
            setRateMoreData(res.data.data);
        }).catch((e)=>{
            alert(e);
        });
    },[])

    return (
        <div>
            {/* top-picks */}
            <PageHeader>
                {/* <p className="page-header-text">browsing by genre</p> */}
                <Title level={1}><Link to="/explore/top-picks"><span style={{color:"black"}}>Top picks</span></Link></Title>
            </PageHeader>
            <div style={{ padding: "0 24px" }}>
                <Row gutter={[10, 30]}>
                    {
                        topPicksData.map((value, index) => {
                            return (
                                <Col key={index} span={4}>
                                    <MovieItem movieId={value['_id']} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
            {/* rate-more */}
            <PageHeader>
                {/* <p className="page-header-text">browsing by genre</p> */}
                <Title level={1}><Link to="/explore/rate-more"><span style={{color:"black"}}>Rate More</span></Link></Title>
            </PageHeader>
            <div style={{ padding: "0 24px" }}>
                <Row gutter={[10, 30]}>
                    {
                        rateMoreData.map((value, index) => {
                            return (
                                <Col key={index} span={4}>
                                    <MovieItem movieId={value['_id']} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </div>
        
    )
}

export default HomePage