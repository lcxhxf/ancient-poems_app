import React, { Fragment, useState } from 'react';
import './myDetail.css'
import { NavBar, Toast, List, Avatar } from 'antd-mobile'
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

function MyDetail(props) {

  let navigate = useNavigate();
  let userName = localStorage.getItem('userName')
  let headPicPath = localStorage.getItem('headPicPath')
  let personalizedSig = localStorage.getItem('personalizedSig')
  let sex = localStorage.getItem('sex')
  let brith = localStorage.getItem('brith')

  const back = () => {
    navigate('/index/my')
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
    <Fragment>
      <div className="header">
        <NavBar onBack={back}>个人信息</NavBar>
        <List header=''>
          <List.Item extra={<Avatar size={160} src={headPicPath} />} onClick={goUpdateHeadPic}>头像</List.Item>
          <List.Item extra={userName} onClick={goUpdateUserName}>
            用户名
          </List.Item>
          <List.Item extra={sex == 1?'男':'女'} onClick={goUpdateSex}>
            性别
          </List.Item>
          <List.Item onClick={goUpdatePassword}>
            修改密码
          </List.Item>
          <List.Item extra={personalizedSig} onClick={goUpdatePersonalizedSig}>
            个性签名
          </List.Item>
          <List.Item extra={brith} onClick={goUpdateBrith}>
            生日
          </List.Item>
        </List>
      </div>
    </Fragment>

  )
}

export default React.memo(MyDetail);