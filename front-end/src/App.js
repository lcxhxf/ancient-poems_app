import React from 'react';
import ALLRoutes from '../src/routes/index';
import { useRoutes } from 'react-router';
import { GlobalStyle } from  './style';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ButtomTab from './components/ButtomTab/buttomTab';
import Login from './components/Login/login'

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
                    <Route path="/*" element={<ButtomTab />} ></Route>
                    <Route path="/login" element={<Login />} ></Route>
                </Routes>
            </div>
    </div>
  )
}

export default App;
