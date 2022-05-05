/**
 * @description 分类界面
 */
import React, { useEffect, useState } from 'react';
import { Tabs, IndexBar, Toast, Grid } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import './sort.css'
import servicePath from '../../config/apiUrl';
import axios from 'axios'

function Sort(props) {
  let navigate = useNavigate();
  const [type, setType] = useState([])  // 存放诗文的类型种类
  const [author, setAuthor] = useState([{"name":"李白"},{"name":"杜甫"},{"name":"苏轼"},{"name":"王维"},{"name":"杜牧"},{"name":"陆游"},,{"name":"白居易"},{"name":"辛弃疾"},{"name":"李清照"},{"name":"刘禹锡"},{"name":"李商隐"},{"name":"陶渊明"},{"name":"孟浩然"},{"name":"柳宗元"},{"name":"王安石"},{"name":"欧阳修"},{"name":"温庭筠"},{"name":"杨万里"},{"name":"诸葛亮"},{"name":"范仲淹"},{"name":"张九龄"},{"name":"元稹"},{"name":"李煜"},{"name":"司马迁"},{"name":"岑参"},{"name":"韩愈"},{"name":"齐己"},{"name":"贾岛"},{"name":"曹操"},{"name":"柳永"},{"name":"李贺"},{"name":"张籍"},{"name":"曹植"},{"name":"皎然"},{"name":"孟郊"},{"name":"贯休"},{"name":"许浑"},{"name":"罗隐"},{"name":"张祜"},{"name":"王建"},{"name":"韦庄"},{"name":"王勃"},{"name":"姚合"},{"name":"晏殊"},{"name":"卢纶"},{"name":"岳飞"},{"name":"屈原"},{"name":"钱起"},{"name":"秦观"},{"name":"马致远"},{"name":"黄庭坚"},{"name":"卓文君"}])  // 存放诗文的作者分类
  const [dynasty, setDynasty] = useState([])  // 存放诗文的朝代分类
  const [form, setForm] = useState([])  // 存放诗文的形式分类
  
  function getType() {            // 请求古诗的类型
    axios({                           
      method: 'post',
      url: servicePath.SearchType,
      withCredentials: true
    }).then(
      res => {
        if (res.data.data == '查询诗词的类型成功') {
          
          setForm(res.data.res.slice(0,4))
          setType(res.data.res.slice(4))
        } else {
          Toast.show({
            content: '查询失败',
            duration: 1000,
          })
        }
      }
    )
    axios({                           
      method: 'post',
      url: servicePath.SearchDynasty,
      withCredentials: true
    }).then(
      res => {
        if (res.data.data == '查询所有朝代成功') {
          setDynasty(res.data.res)
        } else {
          Toast.show({
            content: '查询失败',
            duration: 1000,
          })
        }
      }
    )
  }
  useEffect(() => {
    getType()
  },[])
  

  // mock假数据
  const getRandomList = (min, max) => {
    return new Array(Math.floor(Math.random() * (max - min) + min)).fill('')
  }
  
  const groups = [{ title: '类型', items: type }, { title: '作者', items: author }, { title: '朝代', items: dynasty }, { title: '形式', items: form }]

  const goSortDetail = (e) => {
    console.log(e.target.innerText);
    navigate('/index/sort/sortDetail/'+e.target.innerText)
  }
  return (
    <div>
      <Tabs>
        <Tabs.Tab title='诗文' key='1'>
          <div style={{ height: window.innerHeight }}>
            <IndexBar>
              {groups.map(group => {
                const { title, items } = group
                return (
                  <IndexBar.Panel
                    index={title}
                    title={`${title}`}
                    key={`标题${title}`}
                  >
                    <Grid columns={4} gap={18}>
                    {items.map((item, index) => (
                        <Grid.Item key={index} onClick={(e) => {goSortDetail(e)}}>
                        <div className='grid-demo-item-block'>{item.name}</div>
                      </Grid.Item>
                      ))}
                    </Grid>
                  </IndexBar.Panel>
                )
              })}
            </IndexBar>
          </div>
        </Tabs.Tab>
        <Tabs.Tab title='名句' key='2'>
          诗文
        </Tabs.Tab>
        <Tabs.Tab title='古籍' key='3'>
          古籍
        </Tabs.Tab>
        <Tabs.Tab title='作者' key='4'>
          作者
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}

export default React.memo(Sort);