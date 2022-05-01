/**
 * @description 个人信息详情界面
 */
import React, { Fragment, useState } from 'react';
import './myDetail.css'
import { NavBar, List, Avatar } from 'antd-mobile'
import {
  UnorderedListOutline,
  PayCircleOutline,
  SetOutline,
} from 'antd-mobile-icons'
import returnImg from '../../assets/login/返回箭头.png'
import logoImg from '../../assets/login/古诗文logo.png'
import { useNavigate } from 'react-router-dom';
import servicePath from '../../config/apiUrl';
import axios from 'axios'
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';

function MyDetail(props) {

  let navigate = useNavigate();

  // 从localStorage拿到用户信息
  let userName = localStorage.getItem('userName')
  let headPicPath = localStorage.getItem('headPicPath')
  let personalizedSig = localStorage.getItem('personalizedSig')
  let sex = localStorage.getItem('sex')
  let brith = localStorage.getItem('brith')
  let myDate = new Date(brith);

  // 路由跳转
  const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画
  const back = () => {
    setShowStatus(false)
  }

  const goUpdateHeadPic = () => {
    navigate('/index/my/myDetail/updateHeadPic')
  }
  const goUpdateUserName = () => {
    navigate('/index/my/myDetail/updateUserName')
  }
  const goUpdatePassword = () => {
    navigate('/index/my/myDetail/updatePassword')
  }
  const goUpdateSex = () => {
    navigate('/index/my/myDetail/updateSex')
  }
  const goUpdatePersonalizedSig = () => {
    navigate('/index/my/myDetail/updatePersonalizedSig')
  }
  const goUpdateBrith = () => {
    navigate('/index/my/myDetail/updateBrith')
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate('/index/my')}
    >
      <Container>
        <Fragment>
          <div>
            <NavBar onBack={back}>个人信息</NavBar>
            <List header=''>
              <List.Item extra={<Avatar size={20} src={headPicPath} />} onClick={goUpdateHeadPic}>头像</List.Item>
              <List.Item extra={userName} onClick={goUpdateUserName}>
                用户名
              </List.Item>
              <List.Item extra={sex == 1 ? '男' : '女'} onClick={goUpdateSex}>
                性别
              </List.Item>
              <List.Item onClick={goUpdatePassword}>
                修改密码
              </List.Item>
              <List.Item extra={personalizedSig} onClick={goUpdatePersonalizedSig}>
                个性签名
              </List.Item>
              <List.Item extra={myDate.toLocaleDateString()} onClick={goUpdateBrith}>
                生日
              </List.Item>
            </List>
          </div>
        </Fragment>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(MyDetail);