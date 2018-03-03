<template>
    <div class="my">
        <div class="user-info">
            <div class="user-img">
                <img src="@/assets/vuelogo.png" />
            </div>
            <div class="name-mobile">
                <p>{{name}}</p>
                <p>{{mobile}}</p>
            </div>
        </div>
        <group>
            <cell title="demo" is-link :link="{path:'/'}"></cell>
            <cell title="github" is-link :link="{path:'/'}"></cell>
        </group>
    </div>
</template>

<script>
    import { Group, Cell, CellBox, Flexbox, FlexboxItem } from 'vux'
    export default {
        name: 'my',
        data() {
            return {
                name: 'xxxwer',
                mobile: 'wertrust@126.com'
            }
        },
        methods:{
            toWaitPay(){
                this.$router.push({
                    path:'/MyOrders',
                    query:{
                        selected:'waitPay'
                    }
                })
            },
            toWaitGet(){
                this.$router.push({
                    path:'/MyOrders',
                    query:{
                        selected:'waitGet'
                    }
                })
            },
            toWaitAccess(){
                this.$router.push({
                    path:'/MyOrders',
                    query:{
                        selected:'waitAccess'
                    }
                })
            },
            toService(){

            }
        },
        components: {
            Group,
            Cell,
            CellBox,
            Flexbox,
            FlexboxItem,
        }
    }
</script>

<style scoped lang="less">
    .user-info {
        width: 100%;
        height: 140px;
        display: flex;
        align-items: center;
        @width77: 77px;
        >div {
            height: @width77;
        }
        .user-img {
            width: @width77;
            border-radius: 50%;
            overflow: hidden;
            margin-left: 30px;
            background-color: #fff;
            text-align: center;
            img {
                width: 80%;
                height: 80%;
                margin-top: 14px;
            }
        }
        .name-mobile {
            padding: 5px 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
    }
    .order-type-box{
        width: 100%;
        display: flex;
        >div{
            flex: 1;
            height: 55px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                width: 24px;
                height: 24px;
                margin-bottom: 5px;
            }
        }
    }
</style>