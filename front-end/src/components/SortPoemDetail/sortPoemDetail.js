/**
 * @description 搜索完点击诗词进入诗词详情界面
 */
 import React, { Fragment, useState } from 'react';
 import { useLocation, useParams } from 'react-router-dom'
 import { NavBar, FloatingBubble } from 'antd-mobile'
 import { SoundOutline } from 'antd-mobile-icons'
 import { useNavigate } from 'react-router-dom';
 import PoemCard from '../PoemCard/poemCard';
 import { Container } from './style';
 import { CSSTransition } from 'react-transition-group';
 import store from '../../store';
 
 function SortPoemDetail(props) {
   // 获取路由参数
   const param = useParams()
   // console.log(param.id);
   // const location = useLocation()
   // console.log('使用useLocation获取的location', location)
 
   // console.log(store.getState());
   const {  searchPoemList } = store.getState()
//    console.log('searchPoemList:',searchPoemList);
   const data = searchPoemList[param.id]
   // console.log(data);
   const { author, analyse, annotation, background, content, dynasty, name, translation } = data
   // const [store, setStore] = useState(store.getState())
 
   // store.subscribe(storeChange)
   // const storeChange = () => {
   //   setStore(store.getState())
   // }
 
   let navigate = useNavigate();
   // 点击的诗词对应数据
   const [poemDetail, setPoemDetail] = useState([{ 'title': name, 'poet': author+'[' + dynasty + ']', 'content': content }, { 'title': '译文及注释', 'poet': '注释', 'content': annotation }, { 'title': '鉴赏', 'poet': '', 'content': analyse }, { 'title': '创作背景', 'poet': '', 'content': background }, { 'title': '全文翻译', 'poet': '', 'content': translation }])
   // console.log(poemDetail);
   const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画
   const back = () => {
     setShowStatus(false)
   }
 
   // 展示播放音频
   const [showPop, setShowPop] = useState(false)
   const isShowPop = (value) => {
     setShowPop(value)
   }
 
 
 
 
   return (
     <CSSTransition
       in={showStatus}
       timeout={300}
       classNames="fly"
       appear={true}
       unmountOnExit
       onExited={() => navigate('/index/sort/sortDetail/'+param.type)}
     >
       <Container>
         <Fragment>
           <NavBar back='返回' onBack={back}>
             诗词详情
           </NavBar>
           {poemDetail.map((item, index) => {
             // {console.log(item);}
             return <PoemCard key={index} id={index} title={item.title} poet={item.poet} content={item.content} isShowPop={isShowPop} />
           })}
           {
             showPop == true ?
               <FloatingBubble
                 axis='xy'
                 magnetic='x'
                 style={{
                   '--initial-position-bottom': '64px',
                   '--initial-position-right': '24px',
                   '--edge-distance': '24px',
                 }}
               >
                 <SoundOutline fontSize={32} />
               </FloatingBubble>
               : ''
           }
         </Fragment>
       </Container>
     </CSSTransition>
   )
 }
 
 export default SortPoemDetail