/**
 * @description 修改用户名界面
 */
 import React, { useState } from 'react';
 import { NavBar, Space, Button, Input, List } from 'antd-mobile'
 import { useNavigate, useParams } from 'react-router-dom';
 import servicePath from '../../config/apiUrl';
 import axios from 'axios'
 import { Toast } from 'antd-mobile'
 import { Container } from './style';
 import { CSSTransition } from 'react-transition-group';
 
 function UpdateMyPoemList() {
 
     let navigate = useNavigate();
     const param = useParams()
 
     // 从localStorage获取用户信息
     let userName = localStorage.getItem('userName')
     let userId = localStorage.getItem('userId')
     // console.log('userId: '+userId);
     const [value, setValue] = useState('')  // 存储用户名
 
     const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画
     const back = () => {
         setShowStatus(false)
     }
 
 
     const userNameUpdate = () => {    // 修改用户名方法
 
         let dataProps = {
            'listId': param.listid,
            'title': value
         }
         axios({
             method: 'post',
             url: servicePath.UpdateList,
             data: dataProps,
             withCredentials: true
         }).then(
             res => {
                 // setIsLoading(false)
                 if (res.data.result == '更新成功') {
                     navigate('/index/my/myPoemList')
                 } else {
                     // message.error('用户名密码错误')
                     Toast.show({
                         content: '更新失败了',
                         duration: 1000,
                     })
                     //   alert('注册失败了呢')
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
                         修改诗单名字
                     </NavBar>
                     <List header={'现在的用户名：' + param.title}>
                         <List.Item>
                             <Input
                                 placeholder='请输入新的诗单名字'
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
 
 export default React.memo(UpdateMyPoemList);