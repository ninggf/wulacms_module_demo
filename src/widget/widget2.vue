<template>
    <div class="widget2">
        widget2
        <hr>
        <p>bgcolor</p>
    </div>
</template>
<style id="demo-widget2" lang="less">
.widget2{
    p{
        background: yellow;
    }
    }
</style>
<script>
    layui.define((exports) => {
        Vue.component('widget2', {
            template: `$tpl$`,
            props: {
            },
            data: function() {
                return {}
            },
            mounted() {
            },
        })
        const widget = {
            cfg:{
                name  : 'demo.widget2',
                id    : 'demo.widget2',
                component:"widget2",
                width : 50,
                setUrl: '',
            },
           
        };

        exports('@demo.widget2', widget)
    })
</script>