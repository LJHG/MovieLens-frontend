import { PageHeader, Typography,Row,Col,Pagination } from 'antd';
import React,{useEffect,useState} from 'react';
import MovieItem from '../components/MovieItem';
import {host} from '../config'
import axios from 'axios'

const { Title } = Typography

const Genres = ({match}) => {
  // console.log(prop)
  const genre = match.params.genre
  // console.log(genre)
  const [data,setData] = useState([])

  useEffect(() => {
    axios.get(`${host}/explore/genres/${genre}/1`).then(res => {
      // console.log(res.data.data);
      if(res.data.code !== 0){
        console.log(res.data.msg)
      }else{
        setData(res.data.data);
      }
    }).catch((e) => {
      alert(e)
    })
  }, [genre])

  const pageChange = (page,pageSize)=>{
    console.log(page)
    axios.get(`${host}/explore/genres/${genre}/${page}`).then(res => {
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
        <p className="page-header-text">browsing by genre</p>
        <Title level={1}>{genre}</Title>
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
        <Pagination simple defaultCurrent={1} pageSize={24} total={3931} style={{textAlign:"center"}} onChange={pageChange}/>
      </div>
    </>
  )
}

export default Genres