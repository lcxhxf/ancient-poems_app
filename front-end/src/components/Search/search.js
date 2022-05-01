/**
 * @description 搜索界面
 */
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { SearchBar, List, NumberKeyboard, Toast } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';

function Search() {

    const [visible, setVisible] = useState('')          // 对应数字键盘名字
    const [value, setValue] = useState([])              // 输入内容后，模糊查询推荐的内容
    const searchRef = useRef(null)

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
    const searchList = (val) => {               // 模糊查询展示
        if (val == '李') {
            setValue(['李白', '李清照', '李商隐'])
        } else if (val == '苏') {
            setValue(['苏轼', '苏辙', '苏洵'])
        } else {
            setValue([])
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
                            <SearchBar ref={queryRef} placeholder='搜索' icon={icon} onChange={(val) => { searchList(val) }} onFocus={() => openKeyboard('demo1')} onBlur={() => { setVisible('') }} />
                        </List.Item>
                    </List>
                    <List style={{ minHeight: '100vh' }}>
                        {value.map((item, index) => (
                            <List.Item key={index}>{item}</List.Item>
                        ))}
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