/**
 * @description 搜索界面
 */
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { SearchBar, List, NumberKeyboard, Toast, PullToRefresh } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';
import servicePath from '../../config/apiUrl';
import axios from 'axios'
import PoemCard from '../PoemCard/poemCard';
import store from '../../store';

function Search() {

    const [visible, setVisible] = useState('')          // 对应数字键盘名字
    const [value, setValue] = useState([])              // 输入内容后，模糊查询推荐的内容
    const [value2, setValue2] = useState([])              // 搜索后，查询的结果
    const searchRef = useRef(null)
    let dataProps = {}                                  // 请求发送的对象参数

    const goIndex = () => {
        // navigate('/index/index')
        setShowStatus(false)
    }

    const [icon, setIcon] = useState(<LeftOutline onClick={goIndex} />)  // 设置搜索框的图片
    let navigate = useNavigate();

    const openKeyboard = (name) => {                    // 设置对应的键盘名字
        setVisible(name)
    }

    const actions = {                           // 键盘对应的动作
        onClose: () => {
            Toast.show('closed')
            setVisible('')
        },
        onInput: (key) => {
            Toast.show(key)
        },
        onDelete: () => {
            Toast.show('delete')
        },
    }
    function throttle(fun, time) {
        let t1 = 0 //初始时间
        return function () {
            let t2 = new Date() //当前时间
            if (t2 - t1 > time) {
                fun.apply(this, arguments)
                t1 = t2
            }
        }
    }

    const searchList = (val) => {               // 模糊查询展示
        // console.log('val',val);
        dataProps = {   // 请求的数据格式
            'input': val,
        }
        if (val != '') {
            axios({
                method: 'post',
                url: servicePath.FuzzySearch,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.data == '模糊查询成功') {
                        let data = []
                        for (let i = 0; i < 3; i++) {
                            data.push(res.data.res1[i].author)
                        }
                        for (let i = 0; i < 3; i++) {
                            data.push(res.data.res2[i].name)
                        }
                        setValue(data)
                    } else {
                        Toast.show({
                            content: '未查询到',
                            duration: 1000,
                        })
                    }
                }
            )
        }
        if (val == '') {
            setValue2([])
        }

        // if (val == '李') {
        //     setValue(['李白', '李清照', '李商隐'])
        // } else if (val == '苏') {
        //     setValue(['苏轼', '苏辙', '苏洵'])
        // } else {
        //     setValue([])
        // }
    }
    function listItemOnClick(e, index) {             // 点击推荐的item查询
        // console.log(e.target.innerText);
        // console.log(index);
        if (index >= 0 && index <= 2) {
            dataProps = {   // 请求的数据格式
                'author': e.target.innerText,
            }
            axios({
                method: 'post',
                url: servicePath.QuerySomeonePoems,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.data == '查询诗词十首成功') {
                        setValue2(res.data.res)
                        const action = {
                            type: 'changeSearchPoemList',
                            value: res.data.res,
                        }
                        store.dispatch(action)
                    } else {
                        Toast.show({
                            content: '未查询到',
                            duration: 1000,
                        })
                    }
                }
            )
        } else {
            dataProps = {   // 请求的数据格式
                'input': e.target.innerText,
            }
            axios({
                method: 'post',
                url: servicePath.Search,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.data == '搜索框查询成功') {
                        setValue2(res.data.res1)
                        const action = {
                            type: 'changeSearchPoemList',
                            value: res.data.res1,
                        }
                        store.dispatch(action)
                    } else {
                        Toast.show({
                            content: '未查询到',
                            duration: 1000,
                        })
                    }
                }
            )
        }
    }
    const search = (val) => {                   // 搜索
        dataProps = {   // 请求的数据格式
            'input': val,
        }
        if (val != null) {
            axios({
                method: 'post',
                url: servicePath.Search,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.data == '搜索框查询成功') {
                        setValue2(res.data.res1)
                        const action = {
                            type: 'changeSearchPoemList',
                            value: res.data.res1,
                        }
                        store.dispatch(action)
                    } else {
                        Toast.show({
                            content: '未查询到',
                            duration: 1000,
                        })
                    }
                }
            )
        }
    }
    const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画
    const queryRef = useRef();
    useEffect(() => {
        queryRef.current.focus();
    }, []);
    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => navigate('/index/index')}
        >
            <Container>
                <Fragment>
                    <List>
                        <List.Item>
                            <SearchBar ref={queryRef} placeholder='搜索' icon={icon} onChange={(val) => { throttle(searchList(val), 3500) }} onSearch={(val) => { search(val) }} onFocus={() => openKeyboard('demo1')} onBlur={() => { setVisible('') }} />
                        </List.Item>
                    </List>
                    <List style={{ minHeight: '100vh' }}>
                        {value.map((item, index) => (
                            <List.Item key={index} id={index} onClick={(e) => { listItemOnClick(e, index) }}>{item}</List.Item>
                        ))}
                    </List>
                    <List style={{ minHeight: '100vh', zIndex: '10', position: 'absolute', top: '.5798rem' }}>
                        <PullToRefresh
                            onRefresh={async () => {
                            }}
                        >
                            {value2.map((item, index) => {
                                // {console.log(item);}
                                return <PoemCard key={index} id={index} title={item.name} poet={item.author} content={item.content} />
                            })}

                            {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
                        </PullToRefresh>
                    </List>
                    <NumberKeyboard
                        visible={visible === 'demo1'}
                        onClose={actions.onClose}
                        onInput={actions.onInput}
                        onDelete={actions.onDelete}
                    />
                </Fragment>
            </Container>
        </CSSTransition>
    )
}

export default Search