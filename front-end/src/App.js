import React from 'react';
import ALLRoutes from '../src/routes/index';
import { useRoutes } from 'react-router';
import { GlobalStyle } from  './style';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ButtomTab from './components/ButtomTab/buttomTab';
import Login from './components/Login/login'
import Register from './components/Register/register'
import MyDetail from './components/MyDetail/myDetail';
import UpdateHeadPic from './components/UpdateHeadPic/updateHeadPic';
import UpdateUserName from './components/UpdateUserName/updateUserName';
import UpdatePassword from './components/UpdatePassword/updatePassword';
import UpdateSex from './components/UpdateSex/updateSex'
import UpdatePersonalizedSig from './components/UpdatePersonalizedSig/UpdatePersonalizedSig'
import UpdateBrith from './components/UpdateBrith/updateBrith'

function App() {
  let routes = useRoutes(ALLRoutes);
  // console.log(routes);

  //改变font-size
  (function (doc, win) {
    var docEI = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientataionchange' : 'resize',
      recalc = function () {
        var clientWidth = docEI.clientWidth;
        if (!clientWidth) return;
        //100是字体大小，375是开发时浏览器窗口的宽度，等比计算
        docEI.style.fontSize = 100 * (clientWidth / 375) + 'px';
      }

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);

  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <div className="router">
                <Routes>
                    <Route path="/*" element={<ButtomTab />} ></Route>                  {/*tabbar界面*/}
                    <Route path="/login" element={<Login />} ></Route>                  {/*登录界面*/}
                    <Route path="/register" element={<Register />} ></Route>            {/*注册界面*/}
                    <Route path="/index/my/myDetail" element={<MyDetail />} ></Route>   {/*个人信息详情界面*/}

                    <Route path="/index/my/myDetail/updateHeadPic" element={<UpdateHeadPic />} ></Route>      {/*修改头像界面*/}
                    <Route path="/index/my/myDetail/updateUserName" element={<UpdateUserName />} ></Route>    {/*修改用户名界面*/}
                    <Route path="/index/my/myDetail/updatePassword" element={<UpdatePassword />} ></Route>    {/*修改密码界面*/}
                    <Route path="/index/my/myDetail/updateSex" element={<UpdateSex />} ></Route>              {/*修改性别界面*/}
                    <Route path="/index/my/myDetail/updatePersonalizedSig" element={<UpdatePersonalizedSig />} ></Route>       {/*修改个性签名界面*/}
                    <Route path="/index/my/myDetail/updateBrith" element={<UpdateBrith />} ></Route>          {/*修改生日界面*/}
                </Routes>
            </div>
    </div>
  )
}

export default App;
