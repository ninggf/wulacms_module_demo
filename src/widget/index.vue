<template>
    <div class="widget">
        widget
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
                console.log('widget1初始化成功');
            },
        })

        exports('@demo.index', {
            init() {
                console.log('demo index inited')
            }
        })
    })
</script>