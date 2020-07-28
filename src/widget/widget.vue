<template id="demo.widget">
    <div>demowidget</div>
</template>
<style id="demo-widget" lang="less">

</style>
<script>
    layui.define((exports) => {
        const widget = {
            cfg:{
                name  : 'Demo Widget',
                id    : 'demo.widget',
                width : 100,
                setUrl: '',
            },
            renderConfig() {

            },
            render() {
                alert("widget init")
            }
        };

        exports('@demo.widget', widget)
    })
</script>