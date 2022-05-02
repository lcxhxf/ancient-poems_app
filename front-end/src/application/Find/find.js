/**
 * @description 发现界面
 */
import React from 'react';
import { Swiper, Toast, Image, Grid, Divider, Card, Button } from 'antd-mobile'
import './find.css'
import { useNavigate } from 'react-router-dom';

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const imgSrc = ['https://s2.loli.net/2022/04/01/FxgqQIXMlpRO8yw.jpg', 'https://s2.loli.net/2022/04/01/DYWmVF7yowX6Z3v.jpg', 'https://img0.baidu.com/it/u=1459704426,2088033720&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=214', 'https://img1.baidu.com/it/u=1980958255,1894189114&fm=26&fmt=auto']

const items = colors.map((color, index) => (    // 轮播图设置
  <Swiper.Item key={index}>
    {/* {console.log(index)} */}
    <div
      className='content'
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      <Image src={imgSrc[index]} />
    </div>
  </Swiper.Item>
))

function Find(props) {

  let navigate = useNavigate();

  const goFindDetail = () => {
    navigate('/index/find/findDetail')
  }

  return (
    <div>
      <Swiper autoplay>{items}</Swiper>
      <Divider />
      <Grid columns={2} gap={8}>
        <Grid.Item onClick={goFindDetail}>
          <div className='grid-demo-item-block find-grid ' style={{'backgroundColor': '#fbf7ee'}}>飞花令</div>
        </Grid.Item>
        <Grid.Item onClick={goFindDetail}>
          <div className='grid-demo-item-block find-grid' style={{'backgroundColor': '#fef2ef'}}>诗词接龙</div>
        </Grid.Item>
        <Grid.Item onClick={goFindDetail}>
          <div className='grid-demo-item-block find-grid' style={{'backgroundColor': '#f2fdee'}}>成语接龙</div>
        </Grid.Item>
        <Grid.Item>
          <div className='grid-demo-item-block find-grid' style={{'backgroundColor': '#f6effc'}}>考一考</div>
        </Grid.Item>
        <Grid.Item>
          <div className='grid-demo-item-block find-grid' style={{'backgroundColor': '#fff'}}>敬请期待</div>
        </Grid.Item>
      </Grid>
      
    </div>
  )
}

export default React.memo(Find);