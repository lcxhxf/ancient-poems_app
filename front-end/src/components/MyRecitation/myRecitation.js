/**
 * @description 我的诗单界面
 */
 import React, { useState } from 'react';
 import { NavBar, Space, Button, Input, List } from 'antd-mobile'
 import { useNavigate } from 'react-router-dom';
 import servicePath from '../../config/apiUrl';
 import axios from 'axios'
 import { Toast } from 'antd-mobile'
 import { Container } from './style';
 import { CSSTransition } from 'react-transition-group';
 
 function MyRecitation() {
 
     let navigate = useNavigate();
 
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
             'userName': value,
             'userId': userId,
         }
         axios({
             method: 'post',
             url: servicePath.userNameUpdate,
             data: dataProps,
             withCredentials: true
         }).then(
             res => {
                 // setIsLoading(false)
                 if (res.data.data == '修改用户名成功') {
                     Toast.show({
                         content: '修改用户名成功',
                         duration: 1000,
                     })
                     if (res.data.res.changedRows > 0) {
                         localStorage.setItem('userName', value)
                         // console.log('设置完之后'+userName);
                     }
                     // console.log('res.data.res:'+res.data.res);
                     //   alert('注册成功')
                     navigate('/index/my')
                     // props.history.push('/index/my')
                 } else {
                     // message.error('用户名密码错误')
                     Toast.show({
                         content: '修改用户名失败了',
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
             onExited={() => navigate('/index/my')}
         >
             <Container>
                 <div className="">
                     <NavBar right={right} onBack={back}>
                         我的背诵
                     </NavBar>
                     <List header={'现在的用户名：' + userName}>
                         <List.Item>
                             <Input
                                 placeholder='请输入新的用户名'
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
 
 export default React.memo(MyRecitation);