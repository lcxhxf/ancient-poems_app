/**
 * @description 浏览历史一首诗词详情界面
 */
import React, { Fragment, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import { NavBar, FloatingBubble, Toast } from 'antd-mobile'
import { SoundOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
import PoemCard from '../PoemCard/poemCard';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios'
import servicePath from '../../config/apiUrl';

function OnePoemDetail(props) {

    let dataProps = {}                          // 请求发送的对象参数
    // const data = {'author':'', 'analyse':'', 'annotation':'', 'background':'', 'content':'', 'dynasty':'', 'name':'', 'translation':'' }
    const [data, setData] = useState([{'author':'', 'analyse':'', 'annotation':'', 'background':'', 'content':'', 'dynasty':'', 'name':'', 'translation':'' }])                            // 请求后的结果
    // 点击的诗词对应数据
    const [poemDetail, setPoemDetail] = useState([])
    // 获取路由参数
    const param = useParams()


    function getOnePoem() {
        dataProps = {                   // 请求的数据格式
            'name': param.name,
        }
        axios({
            method: 'post',
            url: servicePath.NameSearch,
            data: dataProps,
            withCredentials: true
        }).then(
            res => {
                if (res.data.data == '按输入诗名查询一首诗词成功') {
                    setData(res.data.res1)
                } else {
                    Toast.show({
                        content: '查询失败',
                        duration: 1000,
                    })
                }
            }
        )
    }

    useEffect(() => {
        getOnePoem()
    }, [])


    let navigate = useNavigate();

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

    // console.log(data[0]);
    // const { author, analyse, annotation, background, content, dynasty, name, translation } = data
    // setPoemDetail([{ 'title': name, 'poet': author + '[' + dynasty + ']', 'content': content }, { 'title': '译文及注释', 'poet': '注释', 'content': annotation }, { 'title': '鉴赏', 'poet': '', 'content': analyse }, { 'title': '创作背景', 'poet': '', 'content': background }, { 'title': '全文翻译', 'poet': '', 'content': translation }])




    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => navigate('/index/sort/sortDetail/' + param.type)}
        >
            <Container>
                <Fragment>
                    <NavBar back='返回' onBack={back}>
                        诗词详情
                    </NavBar>
                    {/* {poemDetail.map((item, index) => {
                        // {console.log(item);}
                        return <PoemCard key={index} id={index} title={item.title} poet={item.poet} content={item.content} isShowPop={isShowPop} />
                    })} */}
                    <PoemCard  id='1' title={data.name} poet={data.author + '[' + data.dynasty + ']'} content={data.content} isShowPop={isShowPop} />
                    <PoemCard  id='2' title='译文及注释' poet='注释' content={data.annotation} isShowPop={isShowPop} />
                    <PoemCard  id='3' title='鉴赏' poet='' content={data.analyse} isShowPop={isShowPop} />
                    <PoemCard  id='4' title='创作背景' poet='' content={data.background} isShowPop={isShowPop} />
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

export default OnePoemDetail