import React, { useEffect, useState } from 'react'
import PageHeader from "../components/PageHeader";
import { Row, Col } from 'antd';
import { Divider } from 'antd';
import logo from '../images/m.jpg'
import { Card } from 'antd';
import { InputNumber } from 'antd';
import { Button } from 'antd';
import axios from 'axios'
import {host} from "../config"

const groups = [
    {'tags':['sci-fi','surreal','space']},
    {'tags':['action','superhero','visually appealing']},
    {'tags':['comedy','dark comedy','funny']},
    {'tags':['twist ending','mindfuck','nonlinear']},
    {'tags':['romance','animation','music']},
    {'tags':['classic','cinematography','masterpiece']},
]

const PickGroups = () =>{

    const points = [0,0,0,0,0,0]

    const [moviesData,setMoviesData] = useState([
        [{'image':'','name':''},{'image':'','name':''},{'image':'','name':''}],
        [{'image':'','name':''},{'image':'','name':''},{'image':'','name':''}],
        [{'image':'','name':''},{'image':'','name':''},{'image':'','name':''}],
        [{'image':'','name':''},{'image':'','name':''},{'image':'','name':''}],
        [{'image':'','name':''},{'image':'','name':''},{'image':'','name':''}],
        [{'image':'','name':''},{'image':'','name':''},{'image':'','name':''}],
    ])
    

    useEffect(()=>{
        //获取6类18部电影的相关信息
        axios.get(host+'/profile/setting/get-groups-info').then(res=>{
            console.log(res.data.data);
            setMoviesData(res.data.data);
        }).catch((e)=>{
            alert(e)
        })
    },[])


    function onChange(index,value) {
        console.log('changed index', index);
        console.log('changed', value);
        points[index] = value;

      }
    
      const buttokClickHandler = ()=>{
          console.log(points);
          //先扫一遍，确保不是全0
          let allZero = 1;
          for(let i = 0;i<6;i++){
              if(points[i] != 0)
                allZero = 0;
          }
          if(allZero){
              alert("请至少为一个类别分配点数!")
          }else{
              const data = {
                'group1':points[0],
                'group2':points[1],
                'group3':points[2],
                'group4':points[3],
                'group5':points[4],
                'group6':points[5]
                }
                
                axios.post(host+'/profile/settings/pick-groups',data).then(res=>{
                    if(res.data.code == 0){
                        //返回正确，跳转回首页
                        alert('类别点数分配成功!')
                        window.location.href='/#'
                    }else{
                        alert(res.data.msg);
                    }
                })
          }
      }
    

    return (
        <div className="movielens-content-container">
            <Row>
                {
                    groups.map((item,index)=>{
                        return (
                        <Card title={item['tags'][0]+"  "+item['tags'][1] +"  "+item['tags'][2]} style={{ width: 500 }}>
                            <div>
                                <div style={{"display":"inline","float":"left","margin":30}}>
                                    <img src={moviesData[index][0]['image']} alt="picture" style={{"height":70,"width":60}}/>
                                    <div>{moviesData[index][0]['name']}</div>
                                </div>
                                
                                <div style={{"display":"inline","float":"left","margin":30}}>
                                    <img src={moviesData[index][1]['image']} alt="picture" style={{"height":70,"width":60}}/>
                                    <div>{moviesData[index][1]['name']}</div>
                                </div>
                                
                                <div style={{"display":"inline","float":"left","margin":30}}>
                                    <img src={moviesData[index][2]['image']} alt="picture" style={{"height":70,"width":60}}/>
                                    <div>{moviesData[index][2]['name']}</div>
                                </div>
                            </div>
                            <InputNumber min={0} max={3} defaultValue={0} onChange={onChange.bind(this,index)} />
                        </Card>
                        )
                    })
                }
            </Row>
            <Button type="primary" onClick={buttokClickHandler}>确认</Button>
        </div>
    )
}

export default PickGroups