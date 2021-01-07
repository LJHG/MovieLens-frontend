import { Button, Card, Row, Col, PageHeader, Typography, Statistic } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { host,genMovieUrl } from "../config";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import MovieItem from '../components/MovieItem';

const { Title } = Typography

const groups = [
  { 'tags': ['sci-fi', 'surreal', 'space'] },
  { 'tags': ['action', 'superhero', 'visually appealing'] },
  { 'tags': ['comedy', 'dark comedy', 'funny'] },
  { 'tags': ['twist ending', 'mindfuck', 'nonlinear'] },
  { 'tags': ['romance', 'animation', 'music'] },
  { 'tags': ['classic', 'cinematography', 'masterpiece'] },
]



const PickGroups = () => {

  const [Npoints, setNpoints] = useState(3)

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const [moviesData, setMoviesData] = useState([
    [{ 'image': '', 'name': '' }, { 'image': '', 'name': '' }, { 'image': '', 'name': '' }],
    [{ 'image': '', 'name': '' }, { 'image': '', 'name': '' }, { 'image': '', 'name': '' }],
    [{ 'image': '', 'name': '' }, { 'image': '', 'name': '' }, { 'image': '', 'name': '' }],
    [{ 'image': '', 'name': '' }, { 'image': '', 'name': '' }, { 'image': '', 'name': '' }],
    [{ 'image': '', 'name': '' }, { 'image': '', 'name': '' }, { 'image': '', 'name': '' }],
    [{ 'image': '', 'name': '' }, { 'image': '', 'name': '' }, { 'image': '', 'name': '' }],
  ])


  useEffect(() => {
    //获取6类18部电影的相关信息
    axios.get(host + '/profile/setting/get-groups-info').then(res => {
      console.log(res.data.data);
      setMoviesData(res.data.data);
    }).catch((e) => {
      alert(e)
    })
  }, [])

  const addPoint = (index)=>{
    let newPoints = [...points];
    newPoints[index]++;
    setPoints(newPoints);
    setNpoints(Npoints-1);
  }

  const subPoint = (index)=>{
    let newPoints = [...points];
    newPoints[index]--;
    setPoints(newPoints);
    setNpoints(Npoints+1);
  }

  const buttokClickHandler = () => {
    console.log(points);
    //先扫一遍，确保不是全0
    let allZero = 1;
    for (let i = 0; i < 6; i++) {
      if (points[i] !== 0)
        allZero = 0;
    }
    if (allZero) {
      alert("请至少为一个类别分配点数!")
    } else {
      const data = {
        'group1': points[0],
        'group2': points[1],
        'group3': points[2],
        'group4': points[3],
        'group5': points[4],
        'group6': points[5]
      }

      axios.post(host + '/profile/settings/pick-groups', data).then(res => {
        if (res.data.code === 0) {
          //返回正确，跳转回首页
          alert('类别点数分配成功!')
          window.location.href = '/#'
        } else {
          alert(res.data.msg);
        }
      })
    }
  }


  return (
    <>
      <PageHeader>
        <Title level={1}>pick movie groups</Title>
        <p className="page-header-text">Distribute 3 points among your favorite groups of movies below to enable or reconfigure the "bard" recommender.</p>
        <div className="group-points-statistic">
          <span className="page-header-text" style={{ height: "30px", marginTop: "auto" }}>Remaining points: </span>
          <Statistic value={Npoints} style={{ width: "50px", paddingLeft: "10px" }} formatter={(value) => <span style={{ color: "#F06624" }}>{value}</span>} />
        </div>
      </PageHeader>
      <div style={{ padding: "0 24px" }}>
        <Row gutter={[16, 16]}>
          {
            groups.map((item, index) => {
              return (
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} key={index}>
                  <Card>
                    <Title level={5}>
                      {item['tags'][0] + ", " + item['tags'][1] + ", " + item['tags'][2]}
                    </Title>
                    <Row>
                      {
                        moviesData[index].map((item, _index) => {
                          return (
                            <Col className="group-item" key={_index}>
                              <img src={genMovieUrl(item['image'])} alt="movie-logo" style={{ "height": 90, "width": 60 }} />
                              <div className="group-representer-title">{item['name']}</div>
                            </Col>
                          )
                        })
                      }
                    </Row>
                    <div className="pointer-adder">
                      <Button icon={<PlusOutlined />} type="default" shape="circle" disabled={points[index]>2 || Npoints === 0} onClick={()=>{addPoint(index)}}/>
                      <Statistic value={points[index]} style={{ padding: "0 10px" }} formatter={(value) => <span style={{ color: "#F06624" }}>{value}</span>} />
                      <Button icon={<MinusOutlined />} type="default" shape="circle" disabled={points[index]<1 || Npoints === 3} onClick={()=>{subPoint(index)}}/>
                    </div>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
        <Button type="primary" onClick={buttokClickHandler}>确认</Button>
      </div>

    </>
  )
}

export default PickGroups