/**
 * @description 我的界面
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './my.css'
import { Avatar, Button } from 'antd';
import { List } from 'antd-mobile'
import {
  SetOutline,
  EyeOutline,
  StarOutline,
  FileOutline,
  FillinOutline,
  ContentOutline,
  EyeInvisibleOutline,
  EditSOutline,
  CollectMoneyOutline,
  AntOutline
} from 'antd-mobile-icons'

function My(props) {

  let navigate = useNavigate();

  // 从localStorage取出用户信息
  let openId = localStorage.getItem('openId')
  let userName = localStorage.getItem('userName')
  let headPicPath = localStorage.getItem('headPicPath')
  let personalizedSig = localStorage.getItem('personalizedSig')
  let sex = localStorage.getItem('sex')
  let brith = localStorage.getItem('brith')

  // console.log('openId:'+openId);
  // console.log('userName:'+userName);
  // console.log('headPicPath:'+headPicPath);

  // 路由跳转
  const goLogin = () => {
    navigate('/login')
  }
  const goMyDetail = () => {
    navigate('/index/my/myDetail')
  }
  const goMyBrowsing = () => {
    navigate('/index/my/myBrowsing')
  }

  const goMyCollection = () => {
    navigate('/index/my/myCollection')
  }
  const goMyPoemList = () => {
    navigate('/index/my/myPoemList')
  }
  const goMyRecitation = () => {
    navigate('/index/my/myRecitation')
  }

  return (
    <div>
      {userName === null
        ?
        <div className="">
          <List>
            <Button block color='primary' size='large' onClick={goLogin}>未登录，去登录</Button>
          </List>

          <List header='     '>
            <List.Item prefix={<EyeInvisibleOutline />} onClick={goMyBrowsing }>
              我的浏览
            </List.Item>
            <List.Item prefix={<StarOutline />} onClick={goMyCollection}>
              我的收藏
            </List.Item>
            <List.Item prefix={<FileOutline />} onClick={goMyPoemList }>
              我的诗单
            </List.Item>
            <List.Item prefix={<ContentOutline />} onClick={goMyRecitation }>
              我的背诵
            </List.Item>
            <List.Item prefix={<FillinOutline />} onClick={() => { }}>
              我的标注
            </List.Item>
          </List>

          <List header='     '>
            <List.Item prefix={<EyeOutline />} onClick={() => { }}>
              护眼模式
            </List.Item>
            <List.Item prefix={<AntOutline />} onClick={() => { }}>
              深色模式
            </List.Item>
            <List.Item prefix={<CollectMoneyOutline />} onClick={() => { }}>
              列表模式
            </List.Item>
            <List.Item prefix={<EditSOutline />} onClick={() => { }}>
              字体选择
            </List.Item>
            <List.Item prefix={<SetOutline />} onClick={() => { }}>
              更多设置
            </List.Item>
          </List>
        </div>
        : <div className="">
          <List>
            <List.Item extra='主页' onClick={goMyDetail} >
              <div className="myInfo">
                <div className=""><Avatar size={80} src={headPicPath} className='myPic' /></div>
                <div className="myName">
                  <p className='myName-userName'>用户：{userName}</p>
                  <p className='myName-personalizedSig'>个性签名：{personalizedSig}</p>
                </div>
              </div>
            </List.Item>
          </List>

          <List header='     '>
          <List.Item prefix={<EyeInvisibleOutline />} onClick={goMyBrowsing }>
              我的浏览
            </List.Item>
            <List.Item prefix={<StarOutline />} onClick={goMyCollection}>
              我的收藏
            </List.Item>
            <List.Item prefix={<FileOutline />} onClick={goMyPoemList }>
              我的诗单
            </List.Item>
            <List.Item prefix={<ContentOutline />} onClick={goMyRecitation }>
              我的背诵
            </List.Item>
            <List.Item prefix={<FillinOutline />} onClick={() => { }}>
              我的标注
            </List.Item>
          </List>

          <List header='     '>
            <List.Item prefix={<EyeOutline />} onClick={() => { }}>
              护眼模式
            </List.Item>
            <List.Item prefix={<AntOutline />} onClick={() => { }}>
              深色模式
            </List.Item>
            <List.Item prefix={<CollectMoneyOutline />} onClick={() => { }}>
              列表模式
            </List.Item>
            <List.Item prefix={<EditSOutline />} onClick={() => { }}>
              字体选择
            </List.Item>
            <List.Item prefix={<SetOutline />} onClick={() => { }}>
              更多设置
            </List.Item>
          </List>
        </div>
      }
    </div>
  )
}

export default React.memo(My);