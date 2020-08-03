<template>
    <div class="widget">
        index
        <hr>
        <p>bgcolor</p>
    </div>
</template>
<style id="demo-widget" lang="less">
    p {
        background: green;
    }
</style>
<script>
    layui.define((exports) => {
        Vue.component('demo-index', {
            template: `$tpl$`,
            props   : {},
            data    : function () {
                return {}
            },
            mounted() {
            },
        })

        exports('@demo.index', {
            init() {
                console.log('demo index inited')
            }
        })
    })
</script>