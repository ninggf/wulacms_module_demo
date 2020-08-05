<template>
    <div class="widget">
        index{{compdata}} 
        <hr>
        <p>bgcolor</p>
    </div>
</template>
<style id="demo-widget" lang="less">
    .widget{
        p {
            background: green;
        }
    }
</style>
<script>
    layui.define((exports) => {
        Vue.component('demo-index', {
            template: `$tpl$`,
            props   : {
                compdata:"",
            },
            mounted: function() {
                 console.log(this.compdata)
            }
        })

        exports('@demo.index', {
            init() {
                console.log('demo index inited')
            }
        })
    })
</script>