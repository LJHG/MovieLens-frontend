import { PageHeader, Typography,Row,Col,Pagination } from 'antd';
import React,{useEffect,useState} from 'react';
import MovieItem from '../components/MovieItem';
import {host} from '../config'
import axios from 'axios'

const { Title } = Typography

const RateMore = () => {
  const [data,setData] = useState([])

  useEffect(() => {
    axios.get(`${host}/explore/rate-more/1`).then(res => {
      // console.log(res.data.data);
      if(res.data.code !== 0){
        console.log(res.data.msg)
      }else{
        setData(res.data.data);
      }
    }).catch((e) => {
      alert(e)
    })
  }, [])

  const pageChange = (page,pageSize)=>{
    axios.get(`${host}/explore/rate-more/${page}`).then(res => {
      // console.log(res.data.data);
      if(res.data.code !== 0){
        console.log(res.data.msg)
      }else{
        setData(res.data.data);
      }
    }).catch((e) => {
      alert(e)
    })
  }

  return (
    <>
      <PageHeader>
        <p className="page-header-text">help LensMovie know you better</p>
        <Title level={1}>Rate more</Title>
      </PageHeader>
      <div style={{ padding: "0 24px" }}>
        <Row gutter={[10, 30]}>
          {
            data.map((value, index) => {
              return (
                <Col key={index} span={4}>
                  <MovieItem movieId={value['_id']} />
                </Col>
              )
            })
          }
        </Row>
        <Pagination simple defaultCurrent={1} pageSize={24} total={10500} style={{textAlign:"center"}} onChange={pageChange}/>
      </div>
    </>
  )
}

export default RateMore