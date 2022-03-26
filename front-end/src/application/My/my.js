import React from 'react';
import { useNavigate } from 'react-router-dom';

function My (props) {

  let navigate = useNavigate();

  const goLogin = () => {
    navigate('/login')
  }
  return (
    <div>
      我的<br />
      <button onClick={goLogin}>未登录，去登录</button>
      <img src="" alt="" />
    </div>
  )
}

export default React.memo (My);