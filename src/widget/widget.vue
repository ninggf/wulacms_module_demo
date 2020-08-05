<template>
    <div class="widget">
        widget
        <hr>
        <p>bgcolor</p>
    </div>
</template>
<style id="demo-widget" lang="less">
.widget{
    p{
        background: green;
    }
}
</style>
<script>
    layui.define((exports) => {
        Vue.component('widget', {
            template: `$tpl$`,
            props: {
            },
            data: function() {
                return {}
            },
            mounted() {
                console.log('widget1初始化成功');
            },
        })
        const widget = {
            cfg:{
                name  : 'demo.widget',
                id    : 'demo.widget',
                component:"widget",
                width : 100,
                setUrl: '',
            },
           
        };

        exports('@demo.widget', widget)
    })
</script>