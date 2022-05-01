/**
 * @description 飞花令的详情页面
 */
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { NavBar, Space, PullToRefresh, List, SearchBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import { PieOutline, CloseOutline } from 'antd-mobile-icons'
import { Container, Buttom, NavBarStyle, ContentStyle } from './style';
import { CSSTransition } from 'react-transition-group';
import './findDetail.css'
import DialogBox from '../DialogBox/dialogBox';

var Mock = require('mockjs')

function FindDetail() {
    var Random = Mock.Random
    let navigate = useNavigate();
    const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画

    const [talkCount, setTalkCount] = useState([])      // 存储对话框
    const [Count, setCount] = useState(0)      // 控制第一次对话
    const [value, setValue] = useState()       // 输入框输入的值
 
    let ref = useRef();     // 存储返回的值


    const [lan, setLan] = useState(['山下兰芽短浸溪，松间沙路净无泥。','兰陵美酒郁金香，玉碗盛来琥珀光。','嗟余听鼓应官去，走马兰台类转蓬。','涉江采芙蓉，兰泽多芳草。','昆山玉碎凤凰叫，芙蓉泣露香兰笑。','兰溪三日桃花雨，半夜鲤鱼来上滩。','幽兰泣露新香死，画图浅缥松溪水。','木兰舟上如花女，采得莲房爱子多。'])



    // 控制第一次对话
    if (Count == 0) {
        setTimeout(() => {
            setTalkCount([...talkCount, { isRight: true, content: '我们来玩飞花令吧，今日飞“兰”字。' }, { isRight: false, content: '黄金百战穿金甲，不破楼兰终不还。' }])
        }, 1000)
        setCount(1)
    }

    const talk = () => {
        if(value.includes('兰')) {
            console.log('111');
            ref.current = lan[0]
            lan.shift()
        } else{
            console.log('222');
            ref.current = '"兰"呢？我们飞的"兰"字哦。'
        }
        let obj1 = { isRight: true, content: value}
        let obj2 = { isRight: false, content: ref.current }
        setTalkCount([...talkCount,obj1,obj2])
    }




    const groups = Array(26)
        .fill('')
        .map((_, i) => (Random.csentence(14, 20)))
    const [data, setData] = useState([{ verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }])
    const [poem, setPoem] = useState([{ 'title': '水调歌头·明月几时有', 'poet': '苏轼 [宋代]', 'content': '丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。' }, { 'title': '蝶恋花·春景', 'poet': '苏轼 [宋代]', 'content': '花褪残红青杏小。  燕子飞时，绿水人家绕。  枝上柳绵吹又少。  天涯何处无芳草。  墙里秋千墙外道。  墙外行人，墙里佳人笑。  笑渐不闻声渐悄。多情却被无情恼。' }, { 'title': '满庭芳', 'poet': '苏轼 [宋代]', 'content': '三十三年，今谁存者，算只君与长江。  凛然苍桧，霜干苦难双。  闻道司州古县，云溪上、竹坞松窗。  江南岸，不因送子，宁肯过吾邦。  摐摐。  疏雨过，风林舞破，烟盖云幢。  愿持此邀君，一饮空缸。  居士先生老矣，真梦里、相对残釭。  歌舞断，行人未起，船鼓已逄逄。' }, { 'title': '临江仙', 'poet': '苏轼 [宋代]', 'content': '尊酒何人怀李白，草堂遥指江东。  珠帘十里卷香风。  花开又花谢，离恨几千重。  轻舸渡江连夜到，一时惊笑衰容。  语音犹自带吴侬。  夜阑对酒处，依旧梦魂中。' }, { 'title': '定风波·重阳', 'poet': '苏轼 [宋代]', 'content': '与客携壶上翠微。江涵秋影雁初飞。  尘世难逢开口笑。年少，  菊花须插满头归。酩酊但酬佳节了。  云峤。登临不用怨斜晖。  古往今来谁不老。多少。  牛山何必更沾衣。' }])
    const [data1, setData1] = useState(groups)

    const back = () => {
        setShowStatus(false)
    }

    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
                <PieOutline />
            </Space>
        </div>
    )

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
            onExited={() => navigate('/index/find')}
        >
            <Container>
                <Fragment>
                    <NavBarStyle>
                        <NavBar backArrow={<CloseOutline />} right={right} onBack={back}>
                            飞花令：兰
                        </NavBar>
                    </NavBarStyle>
                    <ContentStyle>
                        <PullToRefresh
                            onRefresh={async () => {
                                // await sleep(1000)
                                setData([...data1])
                            }}
                        >
                            {
                                talkCount.map((item, index) => (
                                    <DialogBox key={index} isRight={item.isRight} content={item.content} />
                                ))
                            }
                        </PullToRefresh>
                    </ContentStyle>
                    <Buttom>
                        <SearchBar ref={queryRef} icon={null} onChange={(val) => { setValue(val) }} onSearch={() => {talk()}} onCancel={() => {talk()}} cancelText='发送' placeholder='请输入内容' showCancelButton={() => true} />
                    </Buttom>
                </Fragment>
            </Container>
        </CSSTransition>
    )
}

export default FindDetail