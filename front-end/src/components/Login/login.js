/**
 * @description 登录界面
 */
import React, { Fragment, useState } from 'react';
import './login.css'
import returnImg from '../../assets/login/返回箭头.png'
import logoImg from '../../assets/login/古诗文logo.png'
import { useNavigate } from 'react-router-dom';
import servicePath from '../../config/apiUrl';
import axios from 'axios'
import { Toast } from 'antd-mobile'

function Login(props) {
  const [userName,setUserName] = useState()
  const [password, setPassword] = useState()
  let navigate = useNavigate();

  const goBack = () => {    // 返回首页
    navigate('/index/index')
  }
  const goRegister = () => {    // 返回注册页
    navigate('/register')
  }
  const userNameChange = () => {    // 拿到用户名
    let name = document.getElementsByClassName("form-name")[0].value;
    setUserName(name)
  }
  const passwordChange = () => {    // 拿到密码
    let password = document.getElementsByClassName("form-password")[0].value;
    setPassword(password)
  }

  const checkLogin = ()=>{    // 登录方法

    if(!userName){
      Toast.show({
        content: '用户名不能为空',
        duration: 1000,
      })
      // alert('用户名不能为空')
        // message.error('用户名不能为空')
        return false
    }else if(!password){
      Toast.show({
        content: '密码不能为空',
        duration: 1000,
      })
      // alert('密码不能为空')
        // message.error('密码不能为空')
        return false
    }
    let dataProps = {
        'userName':userName,
        'password':password
    }
    axios({
        method:'post',
        url:servicePath.checkLogin,
        data:dataProps,
        withCredentials: true
    }).then(
       res=>{
            // setIsLoading(false)
            if(res.data.data=='登录成功'){
                localStorage.setItem('openId',res.data.openId)
                localStorage.setItem('userId',res.data.res[0].userId)
                localStorage.setItem('userName',res.data.res[0].userName)
                localStorage.setItem('headPicPath',res.data.res[0].headPicPath)
                localStorage.setItem('personalizedSig',res.data.res[0].personalizedSig)
                localStorage.setItem('sex',res.data.res[0].sex)
                localStorage.setItem('brith',res.data.res[0].brith)
                console.log('res.data.res.userId:'+res.data.res[0].userId);
                Toast.show({
                  content: '登录成功',
                  duration: 1000,
                })
                navigate('/index/my')
                
                // props.history.push('/index/my')
            }else{
                // message.error('用户名密码错误')
                Toast.show({
                  content: '用户名密码错误',
                  duration: 1000,
                })
                // alert('用户名密码错误')
            }
       }
    )
}

  return (
    <Fragment>
      <div className="header">
        <a><img src={returnImg} onClick={goBack} /></a>
        <span className="header-title" >登录</span>
      </div>
      <div className="login">
        <div className="container">
          <div className="logo">
            <img src={logoImg} alt="" />
          </div>
          <div className='form'>
            {/* <form action="/index/my"> */}
              <input type="text" name="name" className="form-name" placeholder="手机号/邮箱/用户名" onChange={userNameChange} pattern="[0-9-()()]{7,18}|\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}|[A-Za-z0-9_\-\u4e00-\u9fa5]+" />
              <input type="password" name="password" className="form-password" autoComplete="off" onChange={passwordChange} placeholder="密码" />
              <input type="submit" value="登录" className="form-submit" onClick={checkLogin}/>
            {/* </form> */}
          </div>
          <div className="footer">
            <div className="">登录遇到问题</div>
            <div className="" onClick={goRegister}> 没有账号，现在注册</div>
          </div>
        </div>
      </div>
    </Fragment>

  )
}

export default React.memo(Login);