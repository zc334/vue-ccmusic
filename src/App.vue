<template>
    <div id="app">
        <c-header></c-header>
        <tab></tab>
        <router-view></router-view>
    </div>
</template>

<script>
    //引入组件
    import CHeader from 'components/c-header/c-header'
    import Tab from 'components/tab/tab'

    export default {
        //注册组件
        components: {
            CHeader,
            Tab
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "~common/stylus/variable";
    #app 
      color: $color-text
</style>
