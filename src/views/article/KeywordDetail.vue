<template>
    <div class="keyword-detail">
        <MySearch :nowId="id"></MySearch>
        <div class="local_content">
            <tab>
                <tab-item @on-item-click="switchKeywordList('parent')">上级</tab-item>
                <tab-item @on-item-click="switchKeywordList('samelevel')">同级</tab-item>
                <tab-item @on-item-click="switchKeywordList('children')">下级</tab-item>
                <tab-item @on-item-click="hideKeywordList()"  id="tab-item-hide-keyword-list">{{ keyword_tab_text }}</tab-item>
            </tab>
            <group class="parent_keyword_list keyword-list">
                <MyKeyword v-for="data in parent_keyword_list" :key="data.id" :article="data" :nowId="id"></MyKeyword>
            </group>
            <group class="samelevel_keyword_list keyword-list">
                <MyKeyword v-for="data in samelevel_keyword_list" :key="data.id" :article="data" :nowId="id"></MyKeyword>
            </group>
            <group class="children_keyword_list keyword-list">
                <MyKeyword v-for="data in children_keyword_list" :key="data.id" :article="data" :nowId="id"></MyKeyword>
            </group>

            <divider><h4>{{ keyword }}</h4></divider>
            <div><textarea class="content" rows="20" @input="updateContent" :value="content"></textarea></div>
            <div class="content markdown" v-html="compiledMarkdown"></div>
        </div>
    </div>
</template>

<script>
    import { Tab, TabItem, Group, Divider } from 'vux'
    import MyKeyword from '../../components/MyKeyword'
    import MySearch from '../../components/MySearch'
    import util from '../../util/util'
    import myAjax from '@/util/myAjax'
    import marked from 'marked'
    window._ = require('lodash');
    export default {
        name: 'KeywordDetail',
        props: {
        },
        components: {
            Tab,
            TabItem,
            MySearch,
            MyKeyword,
            Group,
            Divider
        },
        data() {
            return {
                id: this.$route.params.id,
                keyword: '',
                content: '',
                keyword_tab_text: '隐藏列表',
                parent_keyword_list: [],
                samelevel_keyword_list: [],
                children_keyword_list: [],
            }
        },
        watch: {
            '$route': function (newQuestion, oldQuestion) {
                this.id = this.$route.params.id
            },
            id: function (newQuestion, oldQuestion) {
                this.pageInit()
            },
        },
        computed: {
        compiledMarkdown: function () {
                return marked(this.content, { sanitize: true })
            }
        },
        methods: {
            switchKeywordList(keywordType) {
                $('.keyword-list').css('display', 'none')
                $('.'+keywordType+'_keyword_list').css('display', 'block')
            },
            hideKeywordList() {
                $('.keyword-list').css('display', 'none')
            },
            pageInit() {
                $('#tab-item-hide-keyword-list').trigger('click')
                document.getElementsByClassName('weui-search-bar__cancel-btn')[0].click()
                if (util.device().ios) {
                    $('#tab-item-hide-keyword-list').trigger('touchend')
                }
                $('.local_content').css('display', 'block')
                $('.searched_content').css('display', 'none')

                let that = this
                myAjax.getKeywordDetail(function(ret){
                    that.parent_keyword_list = ret.parent_keyword
                    that.samelevel_keyword_list = ret.brother_keyword
                    that.children_keyword_list = ret.child_keyword
                    that.keyword = ret.keyword_content.keyword.keyword
                    that.content = ret.keyword_content.content.content
                    // console.log(ret)
                }, this.id)
            },
            updateContent: _.debounce(function (e) {
                this.content = e.target.value
            }, 300)
        },
        mounted() {
            this.pageInit()
        },
    }
</script>

<style scoped>
.keyword-list {
    display: none;
}
.content{
    width: 94%;
    padding: 10px;
    border: 0;
}
.content.markdown{
    margin-bottom: 70px;
    padding: 30px;
}
</style>