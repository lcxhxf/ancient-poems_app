/**
 * @description 首页界面
 */
import React, { useState } from 'react';
import { SearchBar, List, JumboTabs, PullToRefresh, FloatingBubble, Toast } from 'antd-mobile'
import { SoundOutline } from 'antd-mobile-icons'
import PoemCard from '../../components/PoemCard/poemCard';
import { mockRequest } from './mock-request.js'
import './index.css'
import { useNavigate } from 'react-router-dom';
import servicePath from '../../config/apiUrl';
import axios from 'axios'

var Mock = require('mockjs')

function Index(props) {
  let navigate = useNavigate();

  // mock数据
  var Random = Mock.Random
  const groups = Array(26)
    .fill('')
    .map((_, i) => (Random.csentence(14, 20)))
  const [libaiPoem, setLibaiPoem] = useState([])
  const [data, setData] = useState([{ verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }])
  const [poem, setPoem] = useState([{ 'title': '水调歌头·明月几时有', 'poet': '苏轼 [宋代]', 'content': '丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。' }, { 'title': '蝶恋花·春景', 'poet': '苏轼 [宋代]', 'content': '花褪残红青杏小。  燕子飞时，绿水人家绕。  枝上柳绵吹又少。  天涯何处无芳草。  墙里秋千墙外道。  墙外行人，墙里佳人笑。  笑渐不闻声渐悄。多情却被无情恼。' }, { 'title': '满庭芳', 'poet': '苏轼 [宋代]', 'content': '三十三年，今谁存者，算只君与长江。  凛然苍桧，霜干苦难双。  闻道司州古县，云溪上、竹坞松窗。  江南岸，不因送子，宁肯过吾邦。  摐摐。  疏雨过，风林舞破，烟盖云幢。  愿持此邀君，一饮空缸。  居士先生老矣，真梦里、相对残釭。  歌舞断，行人未起，船鼓已逄逄。' }, { 'title': '临江仙', 'poet': '苏轼 [宋代]', 'content': '尊酒何人怀李白，草堂遥指江东。  珠帘十里卷香风。  花开又花谢，离恨几千重。  轻舸渡江连夜到，一时惊笑衰容。  语音犹自带吴侬。  夜阑对酒处，依旧梦魂中。' }, { 'title': '定风波·重阳', 'poet': '苏轼 [宋代]', 'content': '与客携壶上翠微。江涵秋影雁初飞。  尘世难逢开口笑。年少，  菊花须插满头归。酩酊但酬佳节了。  云峤。登临不用怨斜晖。  古往今来谁不老。多少。  牛山何必更沾衣。' }])
  const [data1, setData1] = useState(groups)
  // console.log(data1);

  // 展示播放音频
  const [showPop, setShowPop] = useState(false)
  const isShowPop = (value) => {
    setShowPop(value)
  }

  async function loadMore() {
    const append = await mockRequest()
    setData(val => [...val, ...append])
    // setHasMore(append.length > 0)
  }

  const goSearch = () => {    // 路由跳转
    navigate('/index/index/search')
  }

  const queryPoem = (key) => {
    // console.log(key);
    if (key == '4') {
      let dataProps = {   // 请求的数据格式
        'author': '李白',
      }

      axios({
        method: 'post',
        url: servicePath.QuerySomeonePoems,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.data == '查询诗词十首成功') {
            // Toast.show({
            //   content: '查询诗词十首成功',
            //   duration: 1000,
            // })
            console.log(res.data.res);
            setLibaiPoem(res.data.res)
          } else {
            // message.error('用户名密码错误')
            Toast.show({
              content: '查询失败',
              duration: 1000,
            })
          }
        }
      )
    }
  }

  return (
    <div className='Container '>
      <List>
        <List.Item>
          <SearchBar placeholder='搜索' onFocus={goSearch} />
        </List.Item>
      </List>
      <JumboTabs defaultActiveKey='1' onChange={queryPoem}>
        <JumboTabs.Tab title='足迹' description='' key='1'>
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            {poem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} id={index} title={item.title} poet={item.poet} content={item.content} isShowPop={isShowPop} />
            })}

            {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore} /> */}
          </PullToRefresh>

        </JumboTabs.Tab>
        <JumboTabs.Tab title='推荐' description='' key='2'>
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
                  <h3 style={{ color: '#ceac51', fontSize: '10px', marginTop: '10px' }}>{item.title}</h3>
                </List.Item>
              ))}
            </List>
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='苏轼的诗文' description='' key='3'>
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            {poem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} title={item.title} poet={item.poet} content={item.content} />
            })}
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='李白的诗文' description='' key='4'>
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            {libaiPoem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} title={item.name} poet='李白 [唐朝]' content={item.content} />
            })}
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='夏天名句' description='' key='5'>
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            {poem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} title={item.title} poet={item.poet} content={item.content} />
            })}
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab
          title='乐府'
          description=''
          key='6'
        >
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            {poem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} title={item.title} poet={item.poet} content={item.content} />
            })}
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='苏轼的诗文' description='' key='7'>
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            {poem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} title={item.title} poet={item.poet} content={item.content} />
            })}
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='李清照的诗文' description='' key='8'>
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            {poem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} title={item.title} poet={item.poet} content={item.content} />
            })}
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='杜甫的诗文' description='' key='9'>
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            {poem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} title={item.title} poet={item.poet} content={item.content} />
            })}
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='劝学诗文' description='' key='10'>
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            {poem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} title={item.title} poet={item.poet} content={item.content} />
            })}
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='送别诗文' description='' key='11'>
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            {poem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} title={item.title} poet={item.poet} content={item.content} />
            })}
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='辛弃疾的诗文' description='' key='12'>
          <PullToRefresh
            onRefresh={async () => {
              // await sleep(1000)
              setData([...data])
            }}
          >
            {poem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} title={item.title} poet={item.poet} content={item.content} />
            })}
          </PullToRefresh>
        </JumboTabs.Tab>
      </JumboTabs>
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

    </div>
  )
}

export default React.memo(Index);