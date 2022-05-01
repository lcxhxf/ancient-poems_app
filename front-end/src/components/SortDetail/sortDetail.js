/**
 * @description 分类详情页面
 */
import React, { Fragment, useState } from 'react';
import { NavBar, Space, PullToRefresh, List } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import { MoreOutline } from 'antd-mobile-icons'
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';
var Mock = require('mockjs')

function SortDetail() {
    var Random = Mock.Random
    let navigate = useNavigate();
    const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画

    const groups = Array(26)
        .fill('')
        .map((_, i) => (Random.csentence(14, 20)))
    const [data, setData] = useState([{verse:'雨打梨花深闭门，忘了青春，误了青春。',title:'唐寅 《一剪梅·雨打梨花深闭门》'}, {verse:'春宵一刻值千金，花有清香月有阴。',title:'苏轼 《春宵·春宵一刻值千金》'},{verse:'人面不知何处去，桃花依旧笑春风。',title:'崔护 《题都城南庄》'},{verse:'人面不知何处去，桃花依旧笑春风。',title:'崔护 《题都城南庄》'},{verse:'雨打梨花深闭门，忘了青春，误了青春。',title:'唐寅 《一剪梅·雨打梨花深闭门》'}, {verse:'春宵一刻值千金，花有清香月有阴。',title:'苏轼 《春宵·春宵一刻值千金》'},{verse:'人面不知何处去，桃花依旧笑春风。',title:'崔护 《题都城南庄》'},{verse:'人面不知何处去，桃花依旧笑春风。',title:'崔护 《题都城南庄》'},{verse:'雨打梨花深闭门，忘了青春，误了青春。',title:'唐寅 《一剪梅·雨打梨花深闭门》'}, {verse:'春宵一刻值千金，花有清香月有阴。',title:'苏轼 《春宵·春宵一刻值千金》'},{verse:'人面不知何处去，桃花依旧笑春风。',title:'崔护 《题都城南庄》'},{verse:'人面不知何处去，桃花依旧笑春风。',title:'崔护 《题都城南庄》'},{verse:'雨打梨花深闭门，忘了青春，误了青春。',title:'唐寅 《一剪梅·雨打梨花深闭门》'}, {verse:'春宵一刻值千金，花有清香月有阴。',title:'苏轼 《春宵·春宵一刻值千金》'},{verse:'人面不知何处去，桃花依旧笑春风。',title:'崔护 《题都城南庄》'},{verse:'人面不知何处去，桃花依旧笑春风。',title:'崔护 《题都城南庄》'}])
    const [poem, setPoem] = useState([{ 'title': '水调歌头·明月几时有', 'poet': '苏轼 [宋代]', 'content': '丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。' }, { 'title': '蝶恋花·春景', 'poet': '苏轼 [宋代]', 'content': '花褪残红青杏小。  燕子飞时，绿水人家绕。  枝上柳绵吹又少。  天涯何处无芳草。  墙里秋千墙外道。  墙外行人，墙里佳人笑。  笑渐不闻声渐悄。多情却被无情恼。' }, { 'title': '满庭芳', 'poet': '苏轼 [宋代]', 'content': '三十三年，今谁存者，算只君与长江。  凛然苍桧，霜干苦难双。  闻道司州古县，云溪上、竹坞松窗。  江南岸，不因送子，宁肯过吾邦。  摐摐。  疏雨过，风林舞破，烟盖云幢。  愿持此邀君，一饮空缸。  居士先生老矣，真梦里、相对残釭。  歌舞断，行人未起，船鼓已逄逄。' }, { 'title': '临江仙', 'poet': '苏轼 [宋代]', 'content': '尊酒何人怀李白，草堂遥指江东。  珠帘十里卷香风。  花开又花谢，离恨几千重。  轻舸渡江连夜到，一时惊笑衰容。  语音犹自带吴侬。  夜阑对酒处，依旧梦魂中。' }, { 'title': '定风波·重阳', 'poet': '苏轼 [宋代]', 'content': '与客携壶上翠微。江涵秋影雁初飞。  尘世难逢开口笑。年少，  菊花须插满头归。酩酊但酬佳节了。  云峤。登临不用怨斜晖。  古往今来谁不老。多少。  牛山何必更沾衣。' }])
    const [data1, setData1] = useState(groups)

    const back = () => {
        setShowStatus(false)
    }

    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
                <MoreOutline />
            </Space>
        </div>
    )

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => navigate('/index/sort')}
        >
            <Container>
                <Fragment>
                    <NavBar right={right} onBack={back}>
                        春天名句
                    </NavBar>
                    <PullToRefresh
                        onRefresh={async () => {
                            // await sleep(1000)
                            setData([...data1])
                        }}
                    >
                        <List style={{ minHeight: '100vh' }}>
                            {data.map((item, index) => (
                                <List.Item key={index}>
                                    <h3>{item.verse}</h3>
                                    <h3 style={{color:'#ceac51',fontSize:'10px',marginTop:'10px'}}>{item.title}</h3>
                                </List.Item>
                            ))}
                        </List>
                    </PullToRefresh>
                </Fragment>
            </Container>
        </CSSTransition>
    )
}

export default SortDetail