<template>
    <form class="widget3" >
            <div>
                <label>输入框</label><input type="text" placeholder="请输入安全码">
            </div>
    </form>
</template>
<script>
    layui.define((exports) => {
        Vue.component('widget3', {
            template: `$tpl$`,
            props: {
                info: "",
                mt: {
                    default: 0,
                },
            },
            data: function() {
                return {}
            },
            mounted() {
            },
        })
        const widget = {
            cfg:{
                name  : 'demo.widget3',
                id    : 'demo.widget3',
                component:"widget3",
                width : 50,
                setUrl: '',
            },
           
        };
        // exports('&widget3',{name:'coolay-form'});
        exports('@demo.widget3',widget);
    })
</script>
<style id="coolay-form" lang="less">
    .cooly-form {
        width: 100%;
        min-height: 200px;
        background: #fff;
        padding: 20px;
        height: 100%;
        overflow: scroll;
    }
</style>