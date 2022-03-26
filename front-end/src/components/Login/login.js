import React, { Fragment } from 'react';
import './login.css'
import returnImg from '../../assets/login/返回箭头.png'
import logoImg from '../../assets/login/古诗文logo.png'
import { useNavigate } from 'react-router-dom';

function Login(props) {
  let navigate = useNavigate();
  const goBack = () => {
    navigate('/index/index')
  }
  return (
    <Fragment>
      <div className="header">
        <a><img src={returnImg} onClick={goBack}/></a>
        <span className="header-title" >登录</span>
      </div>
      <div className="login">
        <div className="container">
          <div className="logo">
            <img src={logoImg} alt=""/>
          </div>
          <div className='form'>
            <form action="">
              <input type="text" name="name" className="form-name" placeholder="手机号/邮箱/用户名" pattern="[0-9-()()]{7,18}|\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}|[A-Za-z0-9_\-\u4e00-\u9fa5]+" />
              <input type="password" name="password" className="form-password" autoComplete="off" placeholder="密码" />
              <input type="submit" value="登录" className="form-submit" />
            </form>
          </div>
          <div className="footer">
            <div className="">登录遇到问题</div>
            <div className=""> 没有账号，现在注册</div>
          </div>
        </div>
      </div>
    </Fragment>

  )
}

export default React.memo(Login);