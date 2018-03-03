<template>
    <div class="home">
        <MySearch :nowId="'null'"></MySearch>
        <div class="local_content">
            <group>
                <MyKeyword v-for="data in ranking_keyword_list" :key="data.id" :article="data" :nowId="'null'"></MyKeyword>
            </group>
            <div class="page-btn">
                <XButton :disabled="!has_previous_page" text="<" :mini="true" action-type="button" @click.native="loadPrevious()"></XButton>
                {{ current_page }} of {{ num_pages }}
                <XButton :disabled="!has_next_page" text=">" :mini="true" action-type="button" @click.native="loadNext()"></XButton>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast, Group, XButton } from 'vux'
    import myAjax from '../../util/myAjax'
    import MyKeyword from '../../components/MyKeyword'
    import MySearch from '../../components/MySearch'
    export default {
        name: 'home',
        data() {
            return {
                ranking_keyword_list: [],
                current_page: 1,
                num_pages: 0,
                has_next_page: false,
                has_previous_page: false,
            }
        },
        components: {
            Toast,
            Group,
            MyKeyword,
            MySearch,
            XButton,
        },
        methods: {
            testJquery(){
                var randomString = function(n) {
                    if(!n) {
                        n = 5;
                    }
                    var text = '';
                    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    for(var i=0; i < n; i++) {
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    }
                    return text;
                }
                $('#testJquery').text(randomString(10))

            },
            goDetailPage(){
                console.log('here')
            },
            loadRankingData(page){
                let that = this
                myAjax.getRankingData(function(ret){
                    that.ranking_keyword_list = ret.keywords
                    that.num_pages = ret.num_pages
                    that.has_previous_page = ret.has_previous
                    that.has_next_page = ret.has_next
                    that.current_page = ret.now_page
                }, page);
            },
            loadNext(){
                if (this.has_next_page) {
                    this.loadRankingData(this.current_page + 1)
                }
            },
            loadPrevious(){
                if (this.has_previous_page) {
                    this.loadRankingData(this.current_page - 1)
                }
            }
        },
        mounted() {
            if (this.ranking_keyword_list.length == 0) {
                this.loadRankingData(1)
            }
        },
        computed: {

        }
    }
</script>

<style scoped lang="less">
    @borderColor: #F7F8Fd;
    @whiteColor: #FFFFFF;
    .page-btn{
        text-align: center;
    }
    .local_content{
        margin-bottom: 70px;
    }
</style>