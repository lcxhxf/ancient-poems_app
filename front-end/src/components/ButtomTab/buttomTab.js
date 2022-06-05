/**
 * @description 底部tabbar及四个tab对应的页面
 */
import React, { useEffect, useRef, useState } from 'react';
import './buttomTab.css'
import { BrowserRouter as Router, Routes, Route, useHistory } from "react-router-dom";
import Index from '../../application/Index';
import Sort from '../../application/Sort/sort'
import Find from '../../application/Find/find'
import My from '../../application/My/my'
import MyDetail from '../MyDetail/myDetail';
import { useNavigate, useRoutes, useLocation, Outlet } from 'react-router-dom';
import indexImg from '../../assets/buttomTab/首页-fill.png'
import indexActiveImg from '../../assets/buttomTab/首页-fill (1).png'
import sortImg from '../../assets/buttomTab/分类.png'
import sortActiveImg from '../../assets/buttomTab/分类 (1).png'
import findImg from '../../assets/buttomTab/发现激活.png'
import findAvtiveImg from '../../assets/buttomTab/发现激活 (1).png'
import myImg from '../../assets/buttomTab/我的-我的.png'
import myActiveImg from '../../assets/buttomTab/我的-我的 (1).png'
import store from '../../store';

function ButtomTab() {

    // 初始化index的值
    const location = useLocation()
    const { pathname } = location
    let dataInit = store.getState()   // 得到redux全局的数据
    // console.log(pathname);
    let ref = 0
    // console.log(pathname);
    switch (pathname) {
        case '/index/index':
            ref = 0
            break;
        case '/index/sort':
            ref = 1
            break;
        case '/index/find':
            ref = 2
            break;
        case '/index/my':
            ref = 3
            break;
    }
    console.log('ref:',ref);
    const [index, setIndex] = useState(ref)



    // 根据点击跳转到路由相应的子路由
    let navigate = useNavigate();
    const goIndex = () => {
        const action = {
            type: 'changeIndex',
            index: 0
        }
        store.dispatch(action)
        navigate('/index/index')
        setIndex(0)
    }
    const goSort = () => {
        const action = {
            type: 'changeIndex',
            index: 1
        }
        store.dispatch(action)
        navigate('/index/sort')
        setIndex(1)
    }
    const goFind = () => {
        const action = {
            type: 'changeIndex',
            index: 2
        }
        store.dispatch(action)
        navigate('/index/find')
        setIndex(2)
    }
    const goMy = () => {
        const action = {
            type: 'changeIndex',
            index: 3
        }
        store.dispatch(action)
        navigate('/index/my')
        setIndex(3)
    }



    useEffect(() => {
        // goIndex()
    }, [])
    let element = useRoutes([
        {
            path: "/",
            element: <Index />,
        },
        {
            path: "/index/index",
            element: <Index />,
        },
        {
            path: "/index/sort",
            element: <Sort />,
        },
        {
            path: "/index/find",
            element: <Find />,
        },
        {
            path: "/index/my",
            element: <My />,
            // children: [
            //     {
            //         path: "/index/my/myDetail",
            //         element: <MyDetail />,
            //     }
            // ],
        },
    ]);

    return (

        <div className="body">
            <div className="router">
                {element}
                {/* <Routes>
                    <Route path="/index/index" element={<Index />} ></Route>
                    <Route path="/index/sort" element={<Sort />} ></Route>
                    <Route path="/index/find" element={<Find />} ></Route>
                    <Route path="/index/my" element={<My />} ></Route>
                </Routes> */}
            </div>
            <div className='tab'>
                <div className='tab-container'>
                    <div className='tabItem' onClick={goIndex} style={index === 0 ? { color: '#ceac51' } : {}}>
                        {index === 0 ? <img src={indexActiveImg} /> : <img src={indexImg} />}<br />
                        首页
                    </div>
                    <div className='tabItem' onClick={goSort} style={index === 1 ? { color: '#ceac51' } : {}}>
                        {index === 1 ? <img src={sortActiveImg} /> : <img src={sortImg} />}<br />
                        分类
                    </div>
                    <div className='tabItem' onClick={goFind} style={index === 2 ? { color: '#ceac51' } : {}}>
                        {index === 2 ? <img src={findAvtiveImg} /> : <img src={findImg} />}<br />
                        发现
                    </div>
                    <div className='tabItem' onClick={goMy} style={index === 3 ? { color: '#ceac51' } : {}}>
                        {index === 3 ? <img src={myActiveImg} /> : <img src={myImg} />}<br />
                        我的
                    </div>
                </div>
            </div>
            {/* <Outlet/> */}
        </div>

    )
}

export default ButtomTab