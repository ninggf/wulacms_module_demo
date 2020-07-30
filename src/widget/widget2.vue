<template>
    <div>demowidget2</div>
</template>
<style id="demo-widget2" lang="less">

</style>
<script>
    layui.define((exports) => {
        const widget = {
            cfg:{
                name  : 'Demo Widget2',
                id    : 'demo.widget2',
                width : 50,
                setUrl: '',
            },
            renderConfig() {

            },
            render() {
                alert("widget2 init")
            }
        };

        exports('@demo.widget2', widget)
    })
</script>