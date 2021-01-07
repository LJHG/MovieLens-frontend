import { Button, Card, Row, Col, PageHeader, Typography, Statistic } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { host, genMovieUrl } from "../config";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import MovieItem from '../components/MovieItem';

const { Title } = Typography

const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

const MovieList = () => {
  return (
    <>
      <PageHeader>
        <Title level={1}>pick movie groups</Title>
        <p className="page-header-text">Distribute 3 points among your favorite groups of movies below to enable or reconfigure the "bard" recommender.</p>
        <div className="group-points-statistic">
          <span className="page-header-text" style={{ height: "30px", marginTop: "auto" }}>Remaining points: </span>
          {/* <Statistic value={Npoints} style={{ width: "50px", paddingLeft: "10px" }} formatter={(value) => <span style={{ color: "#F06624" }}>{value}</span>} /> */}
        </div>
      </PageHeader>
      <div style={{ padding: "0 24px" }}>
        <Row gutter={[24, 24]}>
          {
            movies.map((value, index) => {
              return (
                <Col key={index}>
                  <MovieItem />
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