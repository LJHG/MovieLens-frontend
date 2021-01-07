import React from 'react'
import { Col, Rate, Row, Popover, Tag, Card } from 'antd';
import {
  StarTwoTone,
  StarFilled
} from '@ant-design/icons';
import { genMovieUrl, host } from '../config';
import { Link } from 'react-router-dom';
import axios from 'axios';


const info = {
  "_id": 1,
  "innerId": 42,
  "imdbId": "0114709",
  "tmdbId": "862",
  "name": "Toy Story",
  "image": "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg",
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
  "review": {
    "@type": "Review", "itemReviewed": { "@type": "CreativeWork", "url": "/title/tt0114709/" },
    "author": { "@type": "Person", "name": "alexkolokotronis" }, "dateCreated": "2009-02-03", "inLanguage": "English",
    "name": "Every Kid's Fantasy",
    "reviewBody": "Toy Story is the film that started Pixar Animated Studios into its long string of never ending success. What Pixar does is not just absorb the younger demographic and keep the older ones mildly entertained. It completely absorbs everyone watching no matter the age or the level of maturity, films of Pixar, starting from Toy Story, have kept a certain magical touch around it with an unexpected amount of depth. Everyone as a child imagines their toys will come alive and go on their own adventures. One of the great things Pixar does is that it does not attract audiences with its overloaded superstar casts but rather with its material. The only superstar here is Tom Hanks and Tim Allen is the next most aforementioned voice over. Unlike what most people think their is an actually a method to casting for animated films as there is to a live-action one. As a result of this Pixar stays faithful to its material and creates a great genuine and warm feeling around the film and its characters.", "reviewRating": { "@type": "Rating", "worstRating": "1", "bestRating": "10", "ratingValue": "10" }
  }
}

const content = (movieInfo) => {
  const tag_colors = ['#f50', '#2db7f5', '#87d068', '#108ee9']

  return (
    <div style={{ fontSize: 12, width: "150px" }}>
      <p style={{ margin: 2 }}>用户评分</p>
      <StarTwoTone />
      <span style={{ marginLeft: 5 }}>{movieInfo['aggregateRating']['ratingValue'].toFixed(1)}/5</span>
      <span style={{ margin: 12 }}>{movieInfo['aggregateRating']['ratingCount']}人评过</span>
      <p style={{ margin: 2 }}>预测评分</p>
      <StarFilled />
      <span style={{ marginLeft: 5 }}>4/5</span>
      <p style={{ margin: 2 }}>类型</p>
      <Row gutter={[2,4]}>
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

const MovieItem = () => {
  return (

    <Card cover={<img src={genMovieUrl(info['image'])} alt="movie-image" />} bodyStyle={{ padding: 6 }}>
      {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
      <Popover content={content.bind(this, info)} title={info['name']} placement="top" >
        <div style={{ textAlign: 'center' }}>
          <Link to={'/movies/' + info['_id']}>
            <div>{info['name']}</div>
          </Link>
          <div>
            <StarTwoTone /> <span>{info['aggregateRating']['ratingValue'].toFixed(1)}</span>
          </div>
        </div>
      </Popover>
    </Card>
  )
}

export default MovieItem