import React from 'react';
import { useNavigate } from 'react-router-dom';
import './my.css'
import { Avatar } from 'antd';
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
  let openId = localStorage.getItem('openId')
  let userName = localStorage.getItem('userName')
  let headPicPath = localStorage.getItem('headPicPath')
  let personalizedSig = localStorage.getItem('personalizedSig')
  let sex = localStorage.getItem('sex')
  let brith = localStorage.getItem('brith')

  // console.log('openId:'+openId);
  // console.log('userName:'+userName);
  console.log('headPicPath:'+headPicPath);

  const goLogin = () => {
    navigate('/login')
  }
  const goMyDetail = () => {
    navigate('/index/my/myDetail')
  }
  return (
    <div>
      {userName === null
        ? <button onClick={goLogin}>未登录，去登录</button>
        : <div className="">

          {/* <div className='myInfo'>
            <h1>用户：{userName} 登录成功！</h1><br />
            <Avatar size={220} src={headPicPath} /><br />
            <h1>个性签名：{personalizedSig}</h1>
            <h1>性别：{sex === 1 ? '男' : '女'}</h1>
            <h1>生日：{brith}</h1>
          </div> */}
          <List>
            <List.Item extra='主页' onClick={goMyDetail} className="myInfo">
              <div className="myInfo">
                <div className=""><Avatar size={80} src={headPicPath} className='myPic'/></div>
                <div className="myName">
                  <p className='myName-userName'>用户：{userName}</p>
                  <p className='myName-personalizedSig'>个性签名：{personalizedSig}</p>
                </div>
              </div>
            </List.Item>
          </List>

          <List header='     '>
          <List.Item prefix={<EyeInvisibleOutline />} onClick={() => { }}>
              我的浏览
            </List.Item>
            <List.Item prefix={<StarOutline />} onClick={() => { }}>
              我的收藏
            </List.Item>
            <List.Item prefix={<FileOutline />} onClick={() => { }}>
              我的诗单
            </List.Item>
            <List.Item prefix={<ContentOutline />} onClick={() => { }}>
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