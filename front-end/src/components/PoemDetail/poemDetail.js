/**
 * @description 诗词详情界面
 */
import React, { Fragment, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'
import { NavBar, FloatingBubble } from 'antd-mobile'
import { SoundOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
import PoemCard from '../PoemCard/poemCard';
import { Container } from './style';
import { CSSTransition } from 'react-transition-group';

function PoemDetail(props) {

  let navigate = useNavigate();
  // 点击的诗词对应数据
  const [poemDetail, setPoemDetail] = useState([{ 'title': '水调歌头·明月几时有', 'poet': '苏轼 [宋代]', 'content': '丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。' }, { 'title': '译文及注释', 'poet': '注释', 'content': '丙辰年的中秋节，高兴地喝酒直到第二天早晨，喝到大醉，写了这首词，同时思念弟弟苏辙。明月从什么时候才开始出现的？我端起酒杯遥问苍天。不知道在天上的宫殿，何年何月。我想要乘御清风回到天上，又恐怕在美玉砌成的楼宇，受不住高耸九天的寒冷。翩翩起舞玩赏着月下清影，哪像是在人间。月儿转过朱红色的楼阁，低低地挂在雕花的窗户上，照着没有睡意的自己。明月不该对人们有什么怨恨吧，为什么偏在人们离别时才圆呢？人有悲欢离合的变迁，月有阴晴圆缺的转换，这种事自古来难以周全。只希望这世上所有人的亲人能平安健康，即便相隔千里，也能共享这美好的月光。' }, { 'title': '鉴赏', 'poet': '', 'content': '这首词是中秋望月怀人之作，表达了对胞弟苏辙的无限思念。丙辰，是北宋神宗熙宁九年（公元1076年），当时苏轼在密州（今山东诸城）做太守，中秋之夜他一边赏月一边饮酒，直到天亮，于是做了这首《水调歌头》。词人运用形象描绘手法，勾勒出一种皓月当空、亲人千里、孤高旷远的境界氛围。苏轼一生，推崇儒学、讲究实务为主。但他也“龆龀好道”，中年以后，又曾表示过“归依佛僧”，经常处在儒释道的纠葛当中的。每当挫折失意之际，则老庄思想上升，借以帮助自己解释穷通进退的困惑。熙宁四年（公元1071年），他以开封府推官通判杭州，是为了避开汴京政争的漩涡。熙宁...' }, { 'title': '创作背景', 'poet': '', 'content': '此词作于宋神宗熙宁九年（1076年）中秋，当时作者在密州（今山东诸城）。词以月起兴，以与其弟苏辙七年未见之情为基础，围绕中秋明月展开想象和思考，把人世间的悲欢离合之情纳入对宇宙人生的哲理性追寻之中，表达了词人对亲人的思念和美好祝愿，也表达了在仕途失意时旷达超脱的胸怀和乐观的景致。' }, { 'title': '作者介绍', 'poet': '苏轼 [宋代]', 'content': '苏轼（1037年1月8日－1101年8月24日），字子瞻，号“东坡居士”，世称“苏东坡”。汉族，眉州人。北宋诗人、词人，宋代文学家，是豪放派词人的主要代表之一，“唐宋八大家”之一。在政治上属于旧党，但也有改革弊政的要求。其文汪洋恣肆，明白畅达，其诗题材广泛，内容丰富，现存诗3900余首。代表作品有《水调歌头·中秋》、《赤壁赋》、《江城子·乙卯正月二十日夜记梦》、《记承天寺夜游》等。' }])

  const [showStatus, setShowStatus] = useState(true);     // 控制页面跳转动画
  const back = () => {
    setShowStatus(false)
  }

  // 展示播放音频
  const [showPop, setShowPop] = useState(false)
  const isShowPop = (value) => {
    setShowPop(value)
  }


  // 获取路由参数
  const param = useParams()
  console.log(param.id);
  // const location = useLocation()
  // console.log('使用useLocation获取的location', location)
  
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

export default PoemDetail