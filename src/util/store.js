/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';
import websocket from '@/util/websocket'

Vue.use(Vuex);

// 整合关联websocket
let ws_handle = {
    init: function(data){
        let userInfo = {
          name: data.my.userName,
          img: this.getAvatar(data.my.avatar),
          client_id: data.my.fd
        }
        store.dispatch('INIT_MY', userInfo)

        let currentSessionId = 0
        for (var i in data.user_list) {
          let user = data.user_list[i]
          let session = this.getSession(user.userName, user.avatar, user.fd)
          store.dispatch('ADD_SESSION', session)
          currentSessionId = user.fd
        }
        store.dispatch('SELECT_SESSION', currentSessionId)
    },
    getAvatar: function(number){
        let img = {
          2: '/static/img/2.9fb592e.png',
          3: '/static/img/3.1eeee7d.jpg',
        }
        return img[number]
    },
    getSession: function(name, img, client_id){
      return {
          id: client_id,
          user: {
              client_id: client_id,
              name: name,
              img: this.getAvatar(img)
          },
          messages: []
      }
    },
    msg: function(data) {
        store.dispatch('RECEIVE_MESSAGE', {
            client_id: data.from,
            content: data.data,
        })
    },
    new_user: function(data) {
        let user = data.user_info
        let session = this.getSession(user.userName, user.avatar, user.fd)
        store.dispatch('ADD_SESSION', session)
    }
}

let onMsg = function(evt) {
  let data = JSON.parse(evt.data)
  ws_handle[data.msg_type](data)
}
let WS = websocket(onMsg)

const now = new Date();
const store = new Vuex.Store({
    state: {
        // 当前用户
        user: {
            name: 'coffce',
            img: '/static/img/3.1eeee7d.jpg'
        },
        // 会话列表
        sessions: [
            // {
            //     id: 2,
            //     user: {
            //         name: 'webpack',
            //         img: '/static/img/3.1eeee7d.jpg'
            //     },
            //     messages: []
            // },
        ],
        // 当前选中的会话
        currentSessionId: 1,
        // 过滤出只包含这个key的会话
        filterKey: ''
    },
    mutations: {
        INIT_DATA (state) {
            // let data = localStorage.getItem('vue-chat-session');
            // if (data) {
                // state.sessions = JSON.parse(data);
            // }
        },
        // 发送消息
        SEND_MESSAGE ({ sessions, currentSessionId }, content) {
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: true
            });
            WS.doSendMsg(content ,session.user.client_id)
        },
        // 选择会话
        SELECT_SESSION (state, id) {
            state.currentSessionId = id;
        } ,
        // 搜索
        SET_FILTER_KEY (state, value) {
            state.filterKey = value;
        },
        // 接收消息
        RECEIVE_MESSAGE ({sessions}, data) {
            let session_id = data.client_id
            let session = sessions.find(item => item.id === session_id);
            session.messages.push({
                content: data.content,
                date: new Date(),
                self: false,
            });
        },
        INIT_MY (state, userInfo) {
            state.user = userInfo
        },
        ADD_SESSION (state, session) {
            state.sessions.push(session)
        },
    },
    actions: {
        INIT_DATA ({commit}) {
          commit('INIT_DATA')
        },
        SEND_MESSAGE ({commit}, content) {
          commit('SEND_MESSAGE', content)
        },
        SELECT_SESSION ({commit}, id) {
          commit('SELECT_SESSION', id)
        },
        SET_FILTER_KEY ({commit}, value) {
          commit('SET_FILTER_KEY', value)
        },
        RECEIVE_MESSAGE ({commit}, data) {
          commit('RECEIVE_MESSAGE', data)
        },
        INIT_MY ({commit}, userInfo) {
          commit('INIT_MY', userInfo)
        },
        ADD_SESSION ({commit}, session) {
          commit('ADD_SESSION', session)
        },
    },
    getters: {
        sessions: ({ sessions, filterKey }) => {
            let result = sessions.filter(session => session.user.name.includes(filterKey));
            return result;
        },
        currentId: ({ currentSessionId }) => currentSessionId,
        user: ({ user }) => user,
        session: ({ sessions, currentSessionId }) => sessions.find(session => session.id === currentSessionId),
        filterKey: ({filterKey}) => filterKey,
    }
});

store.watch(
    (state) => state.sessions,
    (val) => {
        // console.log('CHANGE: ', val);
        // localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);

export default store;
export const actions = {
    initData: ({ dispatch }) => dispatch('INIT_DATA'),
    sendMessage: ({ dispatch }, content) => dispatch('SEND_MESSAGE', content),
    selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
    search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value),
    initMyData: ({dispatch}, userInfo) => dispatch('INIT_MY', userInfo),
};
