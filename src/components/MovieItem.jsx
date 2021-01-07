import React, { useState, useEffect } from 'react'
import { Col, Rate, Row, Tag, Card, Typography, Popover } from 'antd';
import {
  StarTwoTone} from '@ant-design/icons';
import { genMovieUrl, host } from '../config';
import { Link } from 'react-router-dom';
import axios from 'axios';

const tag_colors = ['#f50', '#2db7f5', '#87d068', '#108ee9']

const { Paragraph } = Typography

const DetailContent = ({ movieInfo }) => {
  return (
    <div style={{ fontSize: 12, width: "150px" }}>
      <Paragraph style={{ fontSize: 14 }}>{movieInfo['name']}</Paragraph>
      <p style={{ margin: 2 }}>Average</p>
      <p>
        <StarTwoTone />
        <span style={{ marginLeft: 5 }}>{movieInfo['aggregateRating']['ratingValue'].toFixed(1)}/5</span>
        <span style={{ margin: 12 }}>{movieInfo['aggregateRating']['ratingCount']} ratings</span>
      </p>
      <p style={{ margin: 2 }}>Predict</p>
      <p>
        <StarTwoTone twoToneColor="#ff3d00" />
        <span style={{ marginLeft: 5 }}>{movieInfo['predict'].toFixed(1)}/5</span>
      </p>
      <p style={{ marginBottom: 5 }}>Genres</p>
      <Row gutter={[2, 4]}>
        {
          movieInfo['genre'].map((item, index) => {
            return (
              <Col key={index}>
                <Link to={'/explore/genres/' + item}>
                  <Tag color={tag_colors[index % 4]}>{item}</Tag>
                </Link>
              </Col>
            )
          })
        }

      </Row>
      <div>
        <Rate allowHalf defaultValue={0} onChange={(value) => {
          const data = { 'movieId': movieInfo['_id'], 'rating': value }
          axios.post(host + '/profile/rate', data).then((res) => {
            if (res.data.code !== 0) {
              alert(res.data.msg);
            }
          }).catch((e) => {
            alert(e);
          })
        }} />
      </div>
    </div>
  )
}

const MovieItem = ({ movieId }) => {

  const [info, setInfo] = useState({
    "_id": 1,
    "name": "Toy Story",
    "image": "",
    "genre": ["Adventure", "Animation", "Children", "Comedy", "Fantasy"],
    "aggregateRating": { "@type": "AggregateRating", "ratingCount": 68469, "bestRating": 5, "worstRating": 0.5, "ratingValue": 3.8866493701934814 },
    "predict": 3.34343
  })

  const [loading,setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`${host}/movies/${movieId}`).then(res => {
      // console.log(res.data.data);
      setInfo(res.data.data);
    }).catch((e) => {
      alert(e)
    }).finally(()=>{
      setLoading(false)
    })
  }, [movieId])


  return (
    <Link to={'/movies/' + info['_id']}>
      <Card cover={<img src={genMovieUrl(info['image'])} alt="" />} bodyStyle={{ padding: "10px 10px" }} loading={loading}  >
        <Popover content={<DetailContent movieInfo={info} />} placement="top" >
          <div>
            <Paragraph ellipsis={true} >{info['name']}</Paragraph>
            <div>
              <StarTwoTone /> <span>{info['aggregateRating']['ratingValue'].toFixed(1)}</span>
            </div>
          </div>
        </Popover>
      </Card>
    </Link>
  )
}

export default MovieItem