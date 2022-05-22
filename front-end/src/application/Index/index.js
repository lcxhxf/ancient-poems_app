/**
 * @description 首页界面
 */
import React, { useEffect, useRef, useState } from 'react';
import { SearchBar, List, JumboTabs, PullToRefresh, FloatingBubble, Toast } from 'antd-mobile'
import { SoundOutline } from 'antd-mobile-icons'
import PoemCard from '../../components/PoemCard/poemCard';
import { mockRequest } from './mock-request.js'
import './index.css'
import { useNavigate } from 'react-router-dom';
import servicePath from '../../config/apiUrl';
import axios from 'axios'
import store from '../../store';

var Mock = require('mockjs')

function Index(props) {

  let dataInit = store.getState()   // 得到redux全局的数据


  let navigate = useNavigate();

  // mock数据
  var Random = Mock.Random
  const groups = Array(26)
    .fill('')
    .map((_, i) => (Random.csentence(14, 20)))

  const itemCount = useRef(0)   // 记录第几个JumboTabs.Tab
  const [poemList, setPoemList] = useState([[], [], [], [], [], [], [], [], [], [], [], []])   // 存储每个分类请求的诗词
  const [randomPoem, setRandomPoem] = useState(dataInit.poemList[1])  // 存储随机十首的诗词
  const [dufuPoem, setDufuPoem] = useState(dataInit.poemList[2])  // 存储杜甫的诗词
  const [libaiPoem, setLibaiPoem] = useState(dataInit.poemList[3])  // 存储李白的诗词
  const [summerPoem, setSummerPoemPoem] = useState(dataInit.poemList[4])  // 存储夏天的诗词
  const [yueFuPoem, setYueFuPoem] = useState(dataInit.poemList[5])  // 存储乐府的诗词
  const [suShiPoem, setSuShiPoem] = useState(dataInit.poemList[6])  // 存储苏轼的诗词
  const [liQingzhaoPoem, setLiQingzhaoPoem] = useState(dataInit.poemList[7])  // 存储李清照的诗词
  const [patrioticPoem, setPatrioticPoem] = useState(dataInit.poemList[8])  // 存储爱国的诗词
  const [writeWaterPoem, setWriteWaterPoem] = useState(dataInit.poemList[9])  // 存储写水的诗词
  const [gracefulPoem, setGracefulPoem] = useState(dataInit.poemList[10])  // 存储婉约的诗词
  const [xinQiJiPoem, setXinQiJiPoem] = useState(dataInit.poemList[11])  // 存储辛弃疾的诗词


  let dataProps = {}    // 请求发送的对象参数

  const [data, setData] = useState([{ verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '雨打梨花深闭门，忘了青春，误了青春。', title: '唐寅 《一剪梅·雨打梨花深闭门》' }, { verse: '春宵一刻值千金，花有清香月有阴。', title: '苏轼 《春宵·春宵一刻值千金》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }, { verse: '人面不知何处去，桃花依旧笑春风。', title: '崔护 《题都城南庄》' }])
  const [poem, setPoem] = useState([{ 'title': '水调歌头·明月几时有', 'poet': '苏轼 [宋代]', 'content': '丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。' }, { 'title': '蝶恋花·春景', 'poet': '苏轼 [宋代]', 'content': '花褪残红青杏小。  燕子飞时，绿水人家绕。  枝上柳绵吹又少。  天涯何处无芳草。  墙里秋千墙外道。  墙外行人，墙里佳人笑。  笑渐不闻声渐悄。多情却被无情恼。' }, { 'title': '满庭芳', 'poet': '苏轼 [宋代]', 'content': '三十三年，今谁存者，算只君与长江。  凛然苍桧，霜干苦难双。  闻道司州古县，云溪上、竹坞松窗。  江南岸，不因送子，宁肯过吾邦。  摐摐。  疏雨过，风林舞破，烟盖云幢。  愿持此邀君，一饮空缸。  居士先生老矣，真梦里、相对残釭。  歌舞断，行人未起，船鼓已逄逄。' }, { 'title': '临江仙', 'poet': '苏轼 [宋代]', 'content': '尊酒何人怀李白，草堂遥指江东。  珠帘十里卷香风。  花开又花谢，离恨几千重。  轻舸渡江连夜到，一时惊笑衰容。  语音犹自带吴侬。  夜阑对酒处，依旧梦魂中。' }, { 'title': '定风波·重阳', 'poet': '苏轼 [宋代]', 'content': '与客携壶上翠微。江涵秋影雁初飞。  尘世难逢开口笑。年少，  菊花须插满头归。酩酊但酬佳节了。  云峤。登临不用怨斜晖。  古往今来谁不老。多少。  牛山何必更沾衣。' }])
  const [data1, setData1] = useState(groups)


  // 查询随机的十首古诗
  function randomTenPoems() {
    let key = '2'
    itemCount.current = 1
    axios({                           // 请求推荐的十首古诗
      method: 'post',
      url: servicePath.QueryRandomTenPoems,
      withCredentials: true
    }).then(
      res => {
        if (res.data.data == '随机查询诗词十首成功') {

          setRandomPoem(res.data.res)
          poemList[1] = res.data.res

          const action = {
            type: 'changePoemList',
            value: poemList,
            itemCount: itemCount.current,
            key: key
          }
          store.dispatch(action)
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
    randomTenPoems()
  }, poemList)
  // randomTenPoems()
  // 展示播放音频
  const [showPop, setShowPop] = useState(false)
  const isShowPop = (value) => {
    setShowPop(value)
  }


  const goSearch = () => {    // 路由跳转
    navigate('/index/index/search')
  }

  const queryPoem = (key) => {
    // console.log(key);
    if (key == '3') {
      dataProps = {   // 请求的数据格式
        'author': '杜甫',
      }
      itemCount.current = 2
      axios({
        method: 'post',
        url: servicePath.QuerySomeonePoems,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.data == '查询诗词十首成功') {

            setDufuPoem(res.data.res)
            poemList[2] = res.data.res

            const action = {
              type: 'changePoemList',
              value: poemList,
              itemCount: itemCount.current,
              key: key
            }
            store.dispatch(action)
            // dataInit = store.getState()
            // console.log('dataInit2', dataInit);
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
    if (key == '4') {
      dataProps = {   // 请求的数据格式
        'author': '李白',
      }
      itemCount.current = 3
      axios({
        method: 'post',
        url: servicePath.QuerySomeonePoems,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.data == '查询诗词十首成功') {

            setLibaiPoem(res.data.res)
            poemList[3] = res.data.res

            const action = {
              type: 'changePoemList',
              value: poemList,
              itemCount: itemCount.current,
              key: key
            }
            store.dispatch(action)
            // dataInit = store.getState()
            // console.log('dataInit2', dataInit);
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
    if (key == '5') {
      dataProps = {   // 请求的数据格式
        'type': '夏天',
      }
      itemCount.current = 4
      axios({
        method: 'post',
        url: servicePath.QuerySomeTypePoem,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.data == '查询某种类型诗词十首成功') {

            setSummerPoemPoem(res.data.res)
            poemList[4] = res.data.res

            const action = {
              type: 'changePoemList',
              value: poemList,
              itemCount: itemCount.current,
              key: key
            }
            store.dispatch(action)
            // dataInit = store.getState()
            // console.log('dataInit2', dataInit);
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
    if (key == '6') {
      dataProps = {   // 请求的数据格式
        'type': '乐府',
      }
      itemCount.current = 5
      axios({
        method: 'post',
        url: servicePath.QuerySomeTypePoem,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.data == '查询某种类型诗词十首成功') {

            setYueFuPoem(res.data.res)
            poemList[5] = res.data.res

            const action = {
              type: 'changePoemList',
              value: poemList,
              itemCount: itemCount.current,
              key: key
            }
            store.dispatch(action)
            // dataInit = store.getState()
            // console.log('dataInit2', dataInit);
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
    if (key == '7') {
      dataProps = {   // 请求的数据格式
        'author': '苏轼',
      }
      itemCount.current = 6
      axios({
        method: 'post',
        url: servicePath.QuerySomeonePoems,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.data == '查询诗词十首成功') {

            setSuShiPoem(res.data.res)
            poemList[6] = res.data.res

            const action = {
              type: 'changePoemList',
              value: poemList,
              itemCount: itemCount.current,
              key: key
            }
            store.dispatch(action)
          } else {
            Toast.show({
              content: '查询失败',
              duration: 1000,
            })
          }
        }
      )
    }
    if (key == '8') {
      dataProps = {   // 请求的数据格式
        'author': '李清照',
      }
      itemCount.current = 7
      axios({
        method: 'post',
        url: servicePath.QuerySomeonePoems,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.data == '查询诗词十首成功') {

            setLiQingzhaoPoem(res.data.res)
            poemList[7] = res.data.res

            const action = {
              type: 'changePoemList',
              value: poemList,
              itemCount: itemCount.current,
              key: key
            }
            store.dispatch(action)
          } else {
            Toast.show({
              content: '查询失败',
              duration: 1000,
            })
          }
        }
      )
    }
    if (key == '9') {
      dataProps = {   // 请求的数据格式
        'type': '爱国',
      }
      itemCount.current = 8
      axios({
        method: 'post',
        url: servicePath.QuerySomeTypePoem,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.data == '查询某种类型诗词十首成功') {

            setPatrioticPoem(res.data.res)
            poemList[8] = res.data.res

            const action = {
              type: 'changePoemList',
              value: poemList,
              itemCount: itemCount.current,
              key: key
            }
            store.dispatch(action)
          } else {
            Toast.show({
              content: '查询失败',
              duration: 1000,
            })
          }
        }
      )
    }
    if (key == '10') {
      dataProps = {   // 请求的数据格式
        'type': '写水',
      }
      itemCount.current = 9
      axios({
        method: 'post',
        url: servicePath.QuerySomeTypePoem,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.data == '查询某种类型诗词十首成功') {

            setWriteWaterPoem(res.data.res)
            poemList[9] = res.data.res

            const action = {
              type: 'changePoemList',
              value: poemList,
              itemCount: itemCount.current,
              key: key
            }
            store.dispatch(action)
          } else {
            Toast.show({
              content: '查询失败',
              duration: 1000,
            })
          }
        }
      )
    }
    if (key == '11') {
      dataProps = {   // 请求的数据格式
        'type': '婉约',
      }
      itemCount.current = 10
      axios({
        method: 'post',
        url: servicePath.QuerySomeTypePoem,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.data == '查询某种类型诗词十首成功') {

            setGracefulPoem(res.data.res)
            poemList[10] = res.data.res

            const action = {
              type: 'changePoemList',
              value: poemList,
              itemCount: itemCount.current,
              key: key
            }
            store.dispatch(action)
          } else {
            Toast.show({
              content: '查询失败',
              duration: 1000,
            })
          }
        }
      )
    }
    if (key == '12') {
      dataProps = {   // 请求的数据格式
        'author': '辛弃疾',
      }
      itemCount.current = 11
      axios({
        method: 'post',
        url: servicePath.QuerySomeonePoems,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.data == '查询诗词十首成功') {

            setXinQiJiPoem(res.data.res)
            poemList[11] = res.data.res

            const action = {
              type: 'changePoemList',
              value: poemList,
              itemCount: itemCount.current,
              key: key
            }
            store.dispatch(action)
          } else {
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
      <JumboTabs defaultActiveKey={dataInit.key} onChange={queryPoem}>
        <JumboTabs.Tab title='足迹' description='' key='1'>
          <PullToRefresh
            onRefresh={async () => {
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
              randomTenPoems()
            }}
          >
            <List style={{ minHeight: '100vh' }}>
              {randomPoem.map((item, index) => {
                return <PoemCard key={index} id={index} title={item.name} poet={item.author + ' [' + item.dynasty + ']'} content={item.content} poemId={item.id}/>
              })}
            </List>
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='杜甫的诗文' description='' key='3'>
          <PullToRefresh
            onRefresh={async () => {
              queryPoem('3')
            }}
          >
            {dufuPoem.map((item, index) => {
              // {console.log(item);}
              return <PoemCard key={index} id={index} title={item.name} poet='杜甫 [唐朝]' content={item.content} poemId={item.id} />
            })}
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='李白的诗文' description='' key='4'>
          <PullToRefresh
            onRefresh={async () => {
              queryPoem('4')
            }}
          >
            {
              libaiPoem.map((item, index) => {
                return <PoemCard key={index} id={index} title={item.name} poet='李白 [唐朝]' content={item.content}  poemId={item.id}/>
              })
            }
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='夏天名句' description='' key='5'>
          <PullToRefresh
            onRefresh={async () => {
              queryPoem('5')
            }}
          >
            {
              summerPoem.map((item, index) => {
                return <PoemCard key={index} id={index} title={item.name} poet={item.author + ' [' + item.dynasty + ']'} content={item.content} />
              })
            }
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='乐府' description='' key='6'>
          <PullToRefresh
            onRefresh={async () => {
              queryPoem('6')
            }}
          >
            {
              yueFuPoem.map((item, index) => {
                return <PoemCard key={index} id={index} title={item.name} poet={item.author + ' [' + item.dynasty + ']'} content={item.content} />
              })
            }
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='苏轼的诗文' description='' key='7'>
          <PullToRefresh
            onRefresh={async () => {
              queryPoem('7')
            }}
          >
            {
              suShiPoem.map((item, index) => {
                return <PoemCard key={index} id={index} title={item.name} poet={item.author + ' [' + item.dynasty + ']'} content={item.content} />
              })
            }
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='李清照的诗文' description='' key='8'>
          <PullToRefresh
            onRefresh={async () => {
              queryPoem('8')
            }}
          >
            {
              liQingzhaoPoem.map((item, index) => {
                return <PoemCard key={index} id={index} title={item.name} poet={item.author + ' [' + item.dynasty + ']'} content={item.content} />
              })
            }
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='爱国的诗文' description='' key='9'>
          <PullToRefresh
            onRefresh={async () => {
              queryPoem('9')
            }}
          >
            {
              patrioticPoem.map((item, index) => {
                return <PoemCard key={index} id={index} title={item.name} poet={item.author + ' [' + item.dynasty + ']'} content={item.content} />
              })
            }
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='写水诗文' description='' key='10'>
          <PullToRefresh
            onRefresh={async () => {
              queryPoem('10')
            }}
          >
            {
              writeWaterPoem.map((item, index) => {
                return <PoemCard key={index} id={index} title={item.name} poet={item.author + ' [' + item.dynasty + ']'} content={item.content} />
              })
            }
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='婉约风格诗文' description='' key='11'>
          <PullToRefresh
            onRefresh={async () => {
              queryPoem('11')
            }}
          >
            {
              gracefulPoem.map((item, index) => {
                return <PoemCard key={index} id={index} title={item.name} poet={item.author + ' [' + item.dynasty + ']'} content={item.content} />
              })
            }
          </PullToRefresh>
        </JumboTabs.Tab>
        <JumboTabs.Tab title='辛弃疾的诗文' description='' key='12'>
          <PullToRefresh
            onRefresh={async () => {
              queryPoem('11')
            }}
          >
            {
              xinQiJiPoem.map((item, index) => {
                return <PoemCard key={index} id={index} title={item.name} poet={item.author + ' [' + item.dynasty + ']'} content={item.content} />
              })
            }
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