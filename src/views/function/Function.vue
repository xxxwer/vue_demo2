<template>
<div id="chat-app">
    <div class="sidebar">
        <chatCard></chatCard>
        <chatList></chatList>
    </div>
    <div class="main">
        <chatMessage></chatMessage>
        <chatText></chatText>
    </div>

    <div class="hide">
        <img src="@/assets/1.jpg">
        <img src="@/assets/2.png">
        <img src="@/assets/3.jpg">
        <img src="@/assets/bg.jpg">
    </div>
</div>
</template>

<script>
import { actions } from '@/util/store'

import chatCard from './chatCard'
import chatList from './chatList'
import chatText from './chatText'
import chatMessage from './chatMessage'

export default {
    components: {
        chatCard,
        chatList,
        chatMessage,
        chatText
    },
    created () {
        actions.initData(this.$store)
    }
}
</script>

<style lang="less" scoped>
#chat-app {
    margin: 20px auto;
    width: 800px;
    height: 600px;

    overflow: hidden;
    border-radius: 3px;

    .sidebar, .main {
        height: 100%;
    }
    .sidebar {
        float: left;
        width: 200px;
        color: #f4f4f4;
        background-color: #2e3238;
    }
    .main {
        position: relative;
        overflow: hidden;
        background-color: #eee;
    }
    .text {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
    }
    .message {
        height: ~'calc(100% - 160px)';
    }
    .hide {
        display: none;
    }
}
</style>
