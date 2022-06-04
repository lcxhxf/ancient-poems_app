/**
 * @description 添加我的诗单界面
 */
 import React, { useState } from 'react';
 import { NavBar, Space, Button, Input, List } from 'antd-mobile'
 import { useNavigate } from 'react-router-dom';
 import servicePath from '../../config/apiUrl';
 import axios from 'axios'
 import { Toast } from 'antd-mobile'
 import { Container } from './style';
 import { CSSTransition } from 'react-transition-group';
 
 function AddMyPoemList() {
 
     let navigate = useNavigate();
 
     // 从localStorage获取用户信息
     let userId = localStorage.getItem('userId')
     const [value, setValue] = useState('')  // 存储用户名
 
     const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画
     const back = () => {
         setShowStatus(false)
     }
 
 
     const userNameUpdate = () => {    // 修改用户名方法
 
         let dataProps = {
             'title': value,
             'userId': userId,
         }
         axios({
             method: 'post',
             url: servicePath.CreateList,
             data: dataProps,
             withCredentials: true
         }).then(
             res => {
                 // setIsLoading(false)
                 if (res.data.result == '创建表单成功') {
                     navigate('/index/my/myPoemList')
                 } else {
                     Toast.show({
                         content: '创建表单成功失败了',
                         duration: 1000,
                     })
                 }
             }
         )
     }
 
 
     const right = (
         <div style={{ fontSize: 24 }}>
             <Space style={{ '--gap': '16px' }}>
                 <Button size='mini' onClick={userNameUpdate}>
                     保存
                 </Button>
             </Space>
         </div>
     )
     return (
         <CSSTransition
             in={showStatus}
             timeout={300}
             classNames="fly"
             appear={true}
             unmountOnExit
             onExited={() => navigate('/index/my/myDetail')}
         >
             <Container>
                 <div className="">
                     <NavBar right={right} onBack={back}>
                         添加诗单
                     </NavBar>
                     <List header=''>
                         <List.Item>
                             <Input
                                 placeholder='请输入新的诗单名'
                                 value={value}
                                 onChange={val => {
                                     setValue(val)
                                 }}
                             />
                         </List.Item>
 
                     </List>
                 </div>
             </Container>
         </CSSTransition>
     )
 }
 
 export default React.memo(AddMyPoemList);