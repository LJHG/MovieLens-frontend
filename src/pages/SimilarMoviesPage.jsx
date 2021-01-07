import { PageHeader, Typography, Row, Col, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import MovieItem from '../components/MovieItem';
import { host } from '../config'
import axios from 'axios'

const { Title } = Typography

const SimilarMoviesPage = ({match}) => {

    const movieId = match.params.movieId;

    const [data, setData] = useState([])

    const [curMovieName,setCurMovieName] = useState("Toy Story");



    useEffect(() => {
        //获取相似电影信息
        axios.get(`${host}/movies/${movieId}/similar/1`).then(res => {
            // console.log(res.data.data);
            if (res.data.code !== 0) {
                console.log(res.data.msg)
            } else {
                setData(res.data.data);
            }
        }).catch((e) => {
            alert(e)
        })

        //获取当前电影名字
        axios.get(`${host}/movies/${movieId}`).then(res => {
            // console.log(res.data.data);
            if (res.data.code !== 0) {
                console.log(res.data.msg)
            } else {
                setCurMovieName(res.data.data.name);
            }
        }).catch((e) => {
            alert(e)
        })
    }, [])

    const pageChange = (page, pageSize) => {
        axios.get(`${host}/movies/${movieId}/similar/${page}`).then(res => {
            // console.log(res.data.data);
            if (res.data.code !== 0) {
                console.log(res.data.msg)
            } else {
                setData(res.data.data);
            }
        }).catch((e) => {
            alert(e)
        })
    }

    return (
        <>
            <PageHeader>
                <p className="page-header-text">LensMovie recommends these movies</p>
                <Title level={2}>与 {curMovieName} 相似的电影</Title>
            </PageHeader>
            <div style={{ padding: "0 24px" }}>
                <Row gutter={[10, 30]}>
                    {
                        data.map((value, index) => {
                            return (
                                <Col key={index} span={4}>
                                    <MovieItem movieId={value['movieId']} />
                                </Col>
                            )
                        })
                    }
                </Row>
                <Pagination simple defaultCurrent={1} pageSize={24} total={3931} style={{ textAlign: "center" }} onChange={pageChange} />
            </div>
        </>
    )
}

export default SimilarMoviesPage