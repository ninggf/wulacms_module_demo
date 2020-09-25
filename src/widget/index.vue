<template>
    <div class="widget">
        index{{compdata}} 
        <hr>
        <p  >bgco1lor</p>
        <button type="button" @click="test" class="layui-btn layui-btn-primary">弹框测试</button>
        <button type="button" @click="test1" class="layui-btn">消息测试</button>
        <button type="button" @click="doajax" class="layui-btn layui-btn-normal">调用api</button>
        <button type="button" @click="doajax2" class="layui-btn layui-btn-warm">调用控制器</button>
        <button type="button" @click="doajax1" class="layui-btn layui-btn-danger">ajax错误测试</button>
    </div>
</template>
<style id="demo-widget" lang="less">
    .widget{
        p {
            background: skyblue;
        }
    }
</style>
<script>
    layui.define(['&coolay'],(exports) => {
        let coolay = layui['&coolay'];
        Vue.component('demo-index', {
            template: `$tpl$`,
            props   : {
                compdata:"",
            },
            methods:{
                test(){
                    coolay.dialog("@demo.bbbb")
                },
                test1(){
                    coolay.notice({
                        title:"测试标题",
                        content:"内容内内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容",
                        time:30000,
                    })
                },
                doajax(){
                    coolay.get('http://wxz.wulaphp.com',{
                        api:"rest.client.get",
                        device  : "web",
                        ver     : "1.0.0",
                        channel : "guanfang",
                    },res=>{
                        console.log(res)
                    });
                },
                doajax1(){
                    coolay.get('http://wxz.wulaphp.com',{
                        api:"rest.client.get",
                        // device  : "web",
                        // ver     : "1.0.0",
                        // channel : "guanfang",
                    },res=>{
                        console.log(res)
                    });
                },
                doajax2(){
                    coolay.get('http://wxz.wulaphp.com/ucenter/test',{
                        id:"2",
                    },res=>{
                        console.log(res)
                    });
                }
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