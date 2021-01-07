import { Row, Col, PageHeader, Typography } from 'antd';
import React from 'react';
import MovieItem from './MovieItem';

const { Title } = Typography

const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

const MovieList = () => {
  return (
    <>
      <PageHeader>
        <Title level={1}>pick movie groups</Title>
        <p className="page-header-text">Distribute 3 points among your favorite groups of movies below to enable or reconfigure the "bard" recommender.</p>
      </PageHeader>
      <div style={{ padding: "0 24px" }}>
        <Row gutter={[6, 50]}>
          {
            movies.map((value, index) => {
              return (
                <Col key={index} span={4}>
                  <MovieItem movieId={value}/>
                </Col>
              )
            })
          }
        </Row>
      </div>
    </>
  )
}

export default MovieList