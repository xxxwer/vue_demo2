<template>
    <div class="top-search">
        <div>
            <search v-model="searchValue" position="absolute" auto-scroll-to-top top="0px" @on-focus="searchOnFocus" @on-cancel="onCancel" @on-submit="onSubmit" placeholder="请输入关键字" ref="search"></search>
        </div>
        <group class="searched_content">
            <MyKeyword v-for="data in searched_keyword_data" :key="data.id" :article="data" :nowId="nowId"></MyKeyword>
        </group>
    </div>
</template>

<script>
    import MyKeyword from './MyKeyword'
    import { Search, Group } from 'vux'
    import myAjax from '@/util/myAjax'
    export default {
        name: 'mySearch',
        props: {
            nowId: {
                type: String,
                required: true,
            }
        },
        components: {
            Search,
            MyKeyword,
            Group,
        },
        data() {
            return {
                searchValue: '',
                searched_keyword_data: [],
            }
        },
        methods: {
            searchOnFocus(){
                $('.searched_content').css('display', 'block')
                $('.local_content').css('display', 'none')
            },
            setFocus() {
                this.$refs.search.setFocus()
            },
            onSubmit() {
                this.$refs.search.setBlur()
                this.$vux.toast.show({
                    type: 'text',
                    position: 'middle',
                    text: '查询中...'
                })
                let that = this
                myAjax.searchKeyword(function(ret) {
                    that.searched_keyword_data = ret.searched
                    if (ret.searched.length < 1) {
                        that.$vux.toast.hide()
                        that.$vux.toast.show({
                            type: 'text',
                            position: 'middle',
                            text: 'sorry，未找到'
                        })
                    } else {
                        that.$vux.toast.hide()
                    }
                }, that.searchValue)
            },
            onCancel() {
                $('.searched_content').css('display', 'none')
                $('.local_content').css('display', 'block')
                this.searched_keyword_data = []
            },
        }
    }
</script>

<style scoped lang="less">
@borderColor: #F7F8Fd;
@whiteColor: #FFFFFF;
.top-search {
    width: 100%;
    background-color: #bcccdc;
    border-bottom: 10px solid @borderColor;
}
.searched_content{
    display: none;
    margin-top: 54px;
}
</style>