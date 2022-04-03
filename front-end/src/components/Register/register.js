import React, { Fragment, useState } from 'react';
import './register.css'
import returnImg from '../../assets/login/返回箭头.png'
import logoImg from '../../assets/login/古诗文logo.png'
import { useNavigate } from 'react-router-dom';
import servicePath from '../../config/apiUrl';
import axios from 'axios'
import { Toast } from 'antd-mobile'

function Register(props) {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  let navigate = useNavigate();
  const goBack = () => {
    navigate('/index/index')
  }
  const userNameChange = () => {    // 拿到用户名
    let name = document.getElementsByClassName("form-name")[0].value;
    setUserName(name)
  }
  const passwordChange = () => {    // 拿到密码
    let password = document.getElementsByClassName("form-password")[0].value;
    setPassword(password)
  }
  const confirmPasswordChange = () => {    // 拿到确认密码
    let confirmPassword = document.getElementsByClassName("confirmPassword")[0].value;
    setConfirmPassword(confirmPassword)
  }
  const register = () => {    // 注册方法

    if (!userName) {
      Toast.show({
        content: '用户名不能为空',
        duration: 1000,
      })
      // alert('用户名不能为空')
      // message.error('用户名不能为空')
      return false
    } else if (!password) {
      Toast.show({
        content: '密码不能为空',
        duration: 1000,
      })
      // alert('密码不能为空')
      // message.error('密码不能为空')
      return false
    } else if (!confirmPassword) {
      Toast.show({
        content: '确认密码不能为空',
        duration: 1000,
      })
      // alert('确认密码不能为空')
    } else if (password != confirmPassword) {
      Toast.show({
        content: '两次密码不一致',
        duration: 1000,
      })
      // alert('两次密码不一致')
      // document.getElementsByClassName("form-password")[0].innerHTML('')
      // document.getElementsByClassName("confirmPassword")[0].innerHTML('')
      return false
    }

    let dataProps = {
      'userName': userName,
      'password': password,
      'headPicPath':'https://s2.loli.net/2022/03/31/hPbn74XEKI9dVqW.png',
      'personalizedSig':'这个人很神秘，什么都没有写',
      'sex': 1,
      'brith':'2022-03-27'
    }
    axios({
      method: 'post',
      url: servicePath.register,
      data: dataProps,
      withCredentials: true
    }).then(
      res => {
        // setIsLoading(false)
        if (res.data.data == '注册成功') {
          
          alert('注册成功')
          navigate('/index/my')
          // props.history.push('/index/my')
        } else {
          // message.error('用户名密码错误')
          alert('注册失败了呢')
        }
      }
    )
  }
  return (
    <Fragment>
      <div className="header">
        <a><img src={returnImg} onClick={goBack} /></a>
        <span className="header-title" >注册</span>
      </div>
      <div className="login">
        <div className="container">
          <div className="logo">
            <img src={logoImg} alt="" />
          </div>
          <div className='form'>
            {/* <form action=""> */}
              <input type="text" name="name" className="form-name" placeholder="手机号/邮箱/用户名" onChange={userNameChange} pattern="[0-9-()()]{7,18}|\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}|[A-Za-z0-9_\-\u4e00-\u9fa5]+" />
              <input type="password" name="password" className="form-password" autoComplete="off" onChange={passwordChange} placeholder="密码" />
              <input type="password" name="confirmPassword" className="form-password confirmPassword" onChange={confirmPasswordChange} autoComplete="off" placeholder="确认密码" />
              <input type="submit" value="注册" className="form-submit" onClick={register} />
            {/* </form> */}
          </div>
          <div className="footer">
            <div className="">注册遇到问题</div>
            {/* <div className="">没有账号，现在注册</div> */}
          </div>
        </div>
      </div>
    </Fragment>

  )
}

export default React.memo(Register);