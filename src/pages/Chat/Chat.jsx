/**
 * Created by huangfushan on 2019-08-13 18:31
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as io from 'socket.io-client';
import { connect } from 'react-redux';
import { Button } from '../../components/widget';
import { icon } from '../../images';
import { getStorage } from '../../utils';
import { C_STORAGE } from '../../common/constants';
import { Actions } from '../../redux/actions';
import Header from '../../components/Header';
import './index.less';

@connect(
  state => ({
    isLinkSocket: state.auth.isLinkSocket,
    isAuthenticated: state.auth.isAuthenticated,
  }),
  {
    updateAuth: Actions.auth.updateAuth,
    clearAuth: Actions.auth.clearAuth,
  }
)
export default class Chat extends Component {

  static propTypes = {
    isLinkSocket: PropTypes.bool.isRequired,
    updateAuth: PropTypes.func.isRequired,
    clearAuth: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isLinkSocket: false,
    isAuthenticated: false,
  };

  constructor (props) {
    super(props);
    this.state = {
      isShowChat: true, // 是否显示im
      users: [], // 所有在线用户
      usersTem: [], // 左侧显示的用户列表
      recordList: [
        // {
        //   id: 1,
        //   type: 'user',
        //   name: '孙悟空',
        //   time: '2017-10-30 18:50:12',
        //   isSelf: false,
        //   content: '激情永激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散不散激情永激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散不散激情永激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散不散激情永激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散不散',
        //   src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        // },
        // {
        //   id: 2,
        //   type: 'user',
        //   name: '尔康',
        //   time: '2017-10-30 18:50:12',
        //   isSelf: true,
        //   content: '海可枯 石可烂 激情永激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散不散激情永激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散激情永不散不散',
        //   src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        // },
        // {
        //   id: 3,
        //   type: 'system',
        //   name: '猪八戒',
        //   time: '2017-10-30 18:50:12',
        //   content: '加入了群聊',
        // },
        // {
        //   id: 4,
        //   type: 'user',
        //   name: 'yanbao',
        //   time: '2017-10-30 18:50:12',
        //   isSelf: true,
        //   content: '海可枯 石可烂 ',
        //   src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        // },
      ], // 聊天信息列表
      count: 0, // 当前在线人数
    };
  }

  componentDidMount () {
    this.loadSocket();
  }

  componentWillUnmount () {
    this.logout();
  }

  loadSocket () {
    const that = this;
    const username = getStorage(C_STORAGE.USERNAME);
    if (!username) {
      this.logout();
      return;
    }
    const url = location.hostname;
    that.socket = io.connect(`http://${url}:8081/`);

    // 测试是否链接上websocket
    that.socket.on('connect', () => console.log('连接socket服务器成功'));

    that.socket.emit('login', username);

    // 有新的消息发送
    that.socket.on('newMsg', (user, msg, color) => {
      this._displayNewMsg(user, msg, color);
    });

    // 登录聊天室成功
    that.socket.on('loginSuccess', (nickName, users) => {
      this.props.updateAuth({ isLinkSocket: true });
      const arr = [];
      users.map((item, index) => {
        arr.push({ name: item, id: index });
      });
      that.setState({
        users: arr,
        count: arr.length,
        usersTem: arr,
      });
    });

    //登录失败
    that.socket.on('loginFail', () => {
      console.log('socket服务器连接成功，但是用户登录失败');
      this.logout();
    });

    // 重复登录
    that.socket.on('repeatLogin', (nickName, users) => {
      console.log(nickName, users);
      setTimeout(() => {
        this.props.clearAuth();
      }, 3000);
    });

    // 监听错误消息
    that.socket.on('error', (err) => {
      console.log('err', err);
    });

    // 监听系统消息
    this.socket.on('system', (nickName, users, type) => {
      if (users.length) {
        const arr = [];
        users.map((item, index) => {
          arr.push({ name: item, id: index });
        });
        that.setState({
          users: arr,
          usersTem: arr,
          count: arr.length,
        });
      }

      let typeNew;
      if (type === 'login') {
        typeNew = '加入了';
      }
      if (type === 'logout') {
        typeNew = '离开了';
      }
      this._displayNewMsg('system', `${nickName}${typeNew}群聊`, 'color');
    });
    // }
  }

  //断开socket连接
  logout = () => {
    this.props.updateAuth({ isLinkSocket: false });
    if (this.socket) {
      this.socket.close();
    }
  };

  // 显示消息
  _displayNewMsg = (user, msg, color) => {
    // console.log(user, msg, color)
    const { recordList } = this.state;
    let obj = {};
    const id = recordList.length + 1;
    // const time = (new Date()).format('yyyy-MM-dd hh:mm:ss')
    const time = (new Date()).toLocaleString();
    const msgNew = this._showEmoji(msg);
    // 如果是自己发的消息
    if (user === getStorage(C_STORAGE.USERNAME)) {
      obj = {
        id: id,
        type: 'user',
        name: user,
        time: time,
        isSelf: true,
        content: msgNew,
        src: 'https://dummyimage.com/600x400/000/fff',
      };
    }
    // 系统消息
    if (user === 'system') {
      obj = {
        id: id,
        type: 'system',
        name: '',
        time: time,
        content: msgNew,
      };
    }
    // 其他用户发送的消息
    if (user !== getStorage(C_STORAGE.USERNAME) && user !== 'system') {
      obj = {
        id: id,
        type: 'user',
        name: user,
        time: time,
        isSelf: false,
        content: msgNew,
        src: 'https://dummyimage.com/600x400/000/fff',
      };
    }
    recordList.push(obj);
    this.setState({ recordList: recordList }, () => {
      // console.log(recordList)
      const container = document.getElementById('recordList');
      container.scrollTop = container.scrollHeight;
      this.textarea.value = '';
    });
  };

  // 初始化表情选择列表
  _initEmoji () {
    const emojis = [];
    const url = location.href.split('#')[0];
    for (let i = 1; i < 70; i++) {
      emojis.push(i);
    }
    return (
      <div className="emojis" id="emojis">
        {
          emojis.map(item =>
            (<span
              key={item}
              title={item}
              className="face"
              onClick={() => this.faceClick(item)}
            ><img src={`${url}images/emoji/${item}.gif`} />
            </span>))
        }
      </div>
    );
  }

  // 将用户发送的表情包转义
  _showEmoji = (msg) => {
    const url = location.href.split('#')[0];
    let match;
    let result = msg;
    const reg = /\[emoji:\d+\]/g;
    let emojiIndex;
    const totalEmojiNum = 70;
    while (match === reg.exec(msg)) {
      emojiIndex = match[0].slice(7, -1);
      // console.log(match)
      if (emojiIndex <= totalEmojiNum) {
        result = (<img src={`${url}images/emoji/${emojiIndex}.gif`} />);
      }
    }
    return result;
  };

  // 表情点击事件
  faceClick (i) {
    let msg = this.textarea.value;
    this.textarea.value = `${msg}[emoji:${i}]`;
    this.textarea.focus();
    this.socket.emit('postMsg', `[emoji:${i}]`, 'color');
    this._displayNewMsg(getStorage(C_STORAGE.USERNAME), `[emoji:${i}]`, 'color');
  }

  // 按发送按钮发送消息
  handleSubmit = (e) => {
    e.preventDefault();

    const msg = this.textarea.value;
    if (msg) {
      this.socket.emit('postMsg', msg, 'color');
      this._displayNewMsg(getStorage(C_STORAGE.USERNAME), msg, 'color');
    }
  };

  // 按下回车按钮发送消息
  handleEnter = (e) => {
    e.preventDefault();

    const msg = this.textarea.value;
    if (e.keyCode === 13 && msg.trim().length !== 0) {
      this.handleSubmit(e);
    }
  };

  // 搜索用户
  handleSearch = (e) => {
    const key = e.target.value.trim();
    const { users } = this.state;
    const arr = [];
    users.map((item) => {
      if (item.name.indexOf(key) > -1) {
        arr.push(item);
      }
    });
    this.setState({ usersTem: arr, });
    if (key.trim().length === 0) {
      this.setState({
        usersTem: users,
      });
    }
  };

  // 清空聊天记录
  handleClear = () => {
    this.setState({
      recordList: [],
    });
  };

  handleChangeIsShowChat = () => {
    this.setState({
      isShowChat: !this.state.isShowChat
    });
  };

  render () {
    const { isShowChat, recordList, usersTem, count, } = this.state;
    return (
      <div className="chat-page">
        <Header />
        {
          isShowChat ?
            <div className="chat">
              <div className="chat-left">
                <div className="search">
                  <input type="text" onChange={this.handleSearch} placeholder="输入关键字查询" />
                </div>
                <ul>
                  {
                    usersTem.map(item => (
                      <li key={item.name} className={item.name === getStorage(C_STORAGE.USERNAME) ? 'on' : ''}>
                        <img src={icon.github} alt="github" />
                        <span className="name" title={item.name}>{item.name}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="chat-right">
                <div className="chat-right-box">
                  <div className="chat-right-box-header">
                    <div className="total">当前在线人数:<span className="count">{count}</span></div>
                    <span onClick={this.handleChangeIsShowChat}>
                      <img src={icon.close} alt='close' />
                    </span>
                  </div>
                  <div className="record-list" id="recordList">
                    {
                      recordList.map((item) => {
                        if (item.type === 'system') { // 系统消息
                          return (
                            <div key={item.id} className="system">
                              系统消息：{item.name}{item.content}
                              <span className="time">{item.time}</span>
                            </div>
                          );
                        }
                        // 普通用户的消息
                        return (
                          <div key={item.id}
                               className={item.isSelf ? 'record-list-item record-list-item-right' : 'record-list-item'}>
                            <div className="avatar">
                              <img src={item.src} alt="avatar" />
                            </div>
                            <div className="content">
                              {
                                !item.isSelf && (
                                  <p className="content-title">
                                    <span className="name">{item.name}</span>
                                    <span className="time">{item.time}</span>
                                  </p>
                                )
                              }
                              <div className="content-text">
                                {/*<div className="arrow">*/}
                                {/*<i />*/}
                                {/*<em />*/}
                                {/*</div>*/}
                                {item.content}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                  <div className="chat-right-box-edit">
                    <div className="tool">
                        <span className="tool-l">
                          <span className="tools tools-face" title="表情">
                            {/*<Dropdown overlay={this._initEmoji()} placement="topLeft" trigger={['click']}>*/}
                            <img src={icon.smile} alt="smile" />
                            {/*</Dropdown>*/}
                          </span>
                          <span className="tools tools-img" title="发送图片">
                            <img src={icon.picture} alt='picture' />
                          </span>
                          <span className="tools tools-clear" title="清空聊天记录">
                            <img src={icon.clear} onClick={this.handleClear} />
                          </span>
                        </span>
                    </div>
                    <div className="send-box">
                      <Button className="send" onClick={this.handleChangeIsShowChat}>关闭</Button>
                      <Button className="send" onClick={this.handleSubmit}>发送</Button>
                    </div>
                    <div className="msg-input">
                      <textarea placeholder="在这里输入信息" onKeyUp={this.handleEnter}
                                ref={textarea => this.textarea = textarea} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="chat-min" onClick={this.handleChangeIsShowChat}>
              <div className="chat-min-box">
                <img src={icon.chat} alt="chat" />
                <span className="des">聊天室</span>
              </div>
            </div>
        }
      </div>
    );
  }
}
