<template>
    <cell :title="getKeywordString(article.id)" :value="article.click_number" :link="getLinkUrl(article.id)">
    </cell>
</template>

<script>
    import { Cell } from 'vux'
    export default {
        name: 'mykeyword',
        props: {
            article: {
                type: Object,
                required: true,
            },
            nowId: {
                type: String,
                required: true,
            }
        },
        components: {
            Cell,
        },
        data() {
            return {

            }
        },
        methods: {
            getLinkUrl(id) {
                if (id === this.nowId) {
                    return null
                }
                return '/article/detail/' + id
            },
            getKeywordString(id) {
                let str = this.article.keyword
                if (parseInt(id) === parseInt(this.nowId)) {
                    str = '现在位置 >> ' + str
                }
                return str
            },
        }
    }
</script>

<style scoped lang="less">

</style>