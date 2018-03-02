<template>
    <div class="tab"  style="height:100%;">
        <transition name="myslide">
            <router-view></router-view>
        </transition>

        <tabbar slot="bottom" style="position: fixed;">
            <tabbar-item selected link="/Home">
                <img slot="icon" src="../assets/icon-home.png">
                <img slot="icon-active" src="../assets/icon-home-active.png">
                <span slot="label">Ranking</span>
            </tabbar-item>
            <tabbar-item link="/My">
                <img slot="icon" src="../assets/icon-my.png">
                <img slot="icon-active" src="../assets/icon-my-active.png">
                <span slot="label">Info</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import { ViewBox, Tabbar, TabbarItem } from 'vux'
    export default {
        name: 'master',
        data() {
            return {

            }
        },
        components: {
            ViewBox,
            Tabbar,
            TabbarItem
        }
    }
</script>

<style scoped>
    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
      }
    .weui-tabbar{
        background-color: #FFFFFF;
    }
    .plus-icon {
        position: absolute;
        top: -24px;
        left: -50%;
        width: 200%;
        height: 200%;
    }

    .myslide-enter-active, .myslide-leave-active, .myslide-enter, .myslide-leave-to{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }
    .myslide-enter-active {
        transition: all .5s ease;
    }
    .myslide-leave-active {
        transition: all .5s ;
    }
    .myslide-enter{
        transform: translateX(100%);
    }
    .myslide-leave-to {
        transform: translateX(100%);
    }

    .Router {
        position: absolute;
        width: 100%;
        transition: all .8s ease;
        top: 40px;
    }
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100%, 0);
        transform: translate(100%, 0);
        transition-duration: .5s;
    }
    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100%, 0);
        transform: translate(-100% 0);
        transition-duration: .5s;
    }


</style>