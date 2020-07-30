<template>
    <div>demowidget2</div>
</template>
<style id="demo-widget" lang="less">

</style>
<script>
    layui.define((exports) => {
        const widget = {
            name  : 'Demo Widget',
            id    : 'demo.widget',
            width : 100,
            setUrl: '',
            init() {

            }
        };
        exports('@demo.widget', widget)
    })
</script>