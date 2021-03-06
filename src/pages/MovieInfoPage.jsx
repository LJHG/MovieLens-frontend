import React, { useEffect, useState } from 'react'
import { Button, Typography } from 'antd';
import { Col, Rate, Row, Tag, Space } from 'antd';
import { Link } from 'react-router-dom';
import {
  StarTwoTone,
  StarFilled
} from '@ant-design/icons';
import { WordCloud } from '@ant-design/charts';
import axios from 'axios';
import { host, genMovieUrl, genMovieUrlBig } from '../config'
import MovieItem from '../components/MovieItem'




const { Title } = Typography;


const DemoWordCloud = ({ movieId }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(host + '/movies/' + movieId + '/tags').then((res) => {
      const tag_list = res.data.data.tag_list;
      const random_nums_list_60 = [];
      for (let i = 0; i < 60; i++) {
        random_nums_list_60.push(Math.ceil(Math.random() * 1000))
      }
      random_nums_list_60.sort(function (a, b) {
        return b - a;
      })
      const temp_data = []
      for (let i = 0; i < 60; i++) {
        temp_data.push({ 'x': tag_list[i], 'value': random_nums_list_60[i] })
      }
      setData(temp_data)

    }).catch((e) => {
      alert(e);
    })
  }, [movieId]);

  let config = {
    height: 350,
    data: data,
    wordField: 'x',
    weightField: 'value',
    colorField: 'x',
    // color: '#122c6a',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [12, 48]
    },
    // interactions: [{ type: 'element-active' }],
    // state: { active: { style: { lineWidth: 3 } } }
  };
  return <WordCloud {...config} />;
}



const MovieInfoPage = ({ match }) => {

  const mid = match.params.movieId
  //根据当前url解析出movieid，然后向后台请求movieInfo
  //这里先临时写一个movieInfo
  const tmpMovieInfo = {
    "_id": 1,
    "innerId": 42,
    "imdbId": "0114709",
    "tmdbId": "862",
    "name": "Toy Story",
    "image": "",
    "genre": ["Adventure", "Animation", "Children", "Comedy", "Fantasy"],
    "contentRating": "G",
    "actor": [{ "@type": "Person", "url": "/name/nm0000158/", "name": "Tom Hanks" },
    { "@type": "Person", "url": "/name/nm0000741/", "name": "Tim Allen" },
    { "@type": "Person", "url": "/name/nm0725543/", "name": "Don Rickles" },
    { "@type": "Person", "url": "/name/nm0001815/", "name": "Jim Varney" }],
    "director": { "@type": "Person", "url": "/name/nm0005124/", "name": "John Lasseter" },
    "creator": [{ "@type": "Person", "url": "/name/nm0005124/", "name": "John Lasseter" },
    { "@type": "Person", "url": "/name/nm0230032/", "name": "Pete Docter" },
    { "@type": "Person", "url": "/name/nm0004056/", "name": "Andrew Stanton" },
    { "@type": "Person", "url": "/name/nm0710020/", "name": "Joe Ranft" },
    { "@type": "Person", "url": "/name/nm0923736/", "name": "Joss Whedon" },
    { "@type": "Person", "url": "/name/nm0004056/", "name": "Andrew Stanton" },
    { "@type": "Person", "url": "/name/nm0169505/", "name": "Joel Cohen" },
    { "@type": "Person", "url": "/name/nm0812513/", "name": "Alec Sokolow" },
    { "@type": "Organization", "url": "/company/co0008970/" },
    { "@type": "Organization", "url": "/company/co0017902/" }],
    "description": "Toy Story is a movie starring Tom Hanks, Tim Allen, and Don Rickles. A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    "datePublished": "1995-11-22",
    "duration": "PT1H21M",
    "keywords": ["toy", "rivalry", "cowboy", "cgi animation", "claw crane"],
    "aggregateRating": { "@type": "AggregateRating", "ratingCount": 68469, "bestRating": 5, "worstRating": 0.5, "ratingValue": 3.8866493701934814 },
    "trailer": {
      "@type": "VideoObject", "name": "Toy Story/Toy Story 2: 3D Double Feature", "embedUrl": "/video/imdb/vi2052129305",
      "thumbnail": { "@type": "ImageObject", "contentUrl": "https://m.media-amazon.com/images/M/MV5BMjAwOTYzODExMF5BMl5BanBnXkFtZTcwNDYyNjc4Mg@@._V1_.jpg" },
      "thumbnailUrl": "https://m.media-amazon.com/images/M/MV5BMjAwOTYzODExMF5BMl5BanBnXkFtZTcwNDYyNjc4Mg@@._V1_.jpg",
      "description": "Toy Story/Toy Story 2: #D Double Feature", "uploadDate": "2009-10-02T17:32:07Z"
    },
    "predict": 2.5,
    "review": {
      "@type": "Review",
      "itemReviewed": { "@type": "CreativeWork", "url": "/title/tt0114709/" },
      "author": { "@type": "Person", "name": "alexkolokotronis" },
      "dateCreated": "2009-02-03",
      "inLanguage": "English",
      "name": "Every Kid's Fantasy",
      "reviewBody": "Toy Story is the film that started Pixar Animated Studios into its long string of never ending success. What Pixar does is not just absorb the younger demographic and keep the older ones mildly entertained. It completely absorbs everyone watching no matter the age or the level of maturity, films of Pixar, starting from Toy Story, have kept a certain magical touch around it with an unexpected amount of depth. Everyone as a child imagines their toys will come alive and go on their own adventures. One of the great things Pixar does is that it does not attract audiences with its overloaded superstar casts but rather with its material. The only superstar here is Tom Hanks and Tim Allen is the next most aforementioned voice over. Unlike what most people think their is an actually a method to casting for animated films as there is to a live-action one. As a result of this Pixar stays faithful to its material and creates a great genuine and warm feeling around the film and its characters.",
      "reviewRating": { "@type": "Rating", "worstRating": "1", "bestRating": "10", "ratingValue": "10" }
    }
  }

  const [movieInfo, setMovieInfo] = useState(tmpMovieInfo)
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5, 6, 7, 8])

  useEffect(() => {
    //解析url
    const movieId = window.location.href.split('/').slice(-1)[0];

    //获取电影信息
    axios.get(host + '/movies/' + movieId).then((res) => {
      setMovieInfo(res.data.data)
    }).catch((e) => {
      alert(e)
    })

    //获取相似电影id列表
    axios.get(host + '/movies/' + movieId + '/similar').then((res) => {
      if (res.data.code === 0) {

        const movies_list = []
        res.data.data.forEach((item, index) => {
          movies_list.push(item['movieId'])
        })
        setSimilarMovies(movies_list);
      } else {
        alert(res.data.msg);
      }
    }).catch((e) => {
      alert(e)
    })

  }, [mid])

  const tag_colors = ['#f50', '#2db7f5', '#87d068', '#108ee9']
  return (
    <div>
      <div className='movieInfo-sub-content'>
        <div className="movieInfo-content1">
          <div style={{ marginRight: "20px" }}><img src={genMovieUrlBig(movieInfo['image'])} alt="" style={{ height: 400 }} /></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Title>{movieInfo['name']}</Title>
            <Space direction="vertical">
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
              <Space>
                <div style={{ marginTop: 12 }}>
                  <p style={{ margin: 2 }}>Predict by LensMovie</p>
                  <StarTwoTone twoToneColor="#ff3d00" />
                  <span style={{ marginLeft: 5 }}>{movieInfo['predict'].toFixed(1)}/5</span>
                </div>
                <div style={{ marginTop: 12 }}>
                  <p style={{ margin: 2 }}>User Rates</p>
                  <StarTwoTone />
                  <span style={{ marginLeft: 5 }}>{movieInfo['aggregateRating']['ratingValue'].toFixed(1)}/5</span>
                  <span style={{ margin: 12 }}>{movieInfo['aggregateRating']['ratingCount']}人评过</span>
                </div>
              </Space>
              <div style={{ marginTop: 8 }}>Genres</div>
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
              <div>Description</div>
              <div>{movieInfo['description']}</div>
            </Space>
          </div>
        </div>
      </div>

      <div className='movieInfo-sub-content'>
        <Title level={3}>Director</Title>
        <div>
          <span>{movieInfo['director']['name']}</span>
        </div>
        <Title level={3}>Actors</Title>
        <div>
          {
            movieInfo['actor'].map((item, index) => {
              return (
                <span key={index} style={{ marginRight: 12 }}>
                  {item['name']}
                </span>
              )
            })
          }
        </div>
      </div>

      <div className='movieInfo-sub-content'>
        <Title level={2}>Community Tags</Title>
        <DemoWordCloud movieId={movieInfo['_id']} />
        {/* <div style={{ height: 200, marginLeft: 100, marginRight: 100 }}>
          
        </div> */}
      </div>
      <div className='movieInfo-sub-content'>
        <Space direction="vertical">
          <Space direction="horizontal" align="center">
            <span style={{fontSize:"30px",fontWeight:500}}>Similar</span>
            <Button><Link to={`/movies/${mid}/similar`}>See More</Link></Button>
          </Space>
          <Row gutter={[6, 0]}>
            {
              similarMovies.map((value, index) => {
                return (
                  <Col key={index} span={3}>
                    <MovieItem movieId={value} />
                  </Col>
                )
              })
            }
          </Row>
        </Space>
      </div>
    </div>
  )
}

export default MovieInfoPage;