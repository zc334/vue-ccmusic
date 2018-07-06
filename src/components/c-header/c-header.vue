<template>
    <div class="c-header">
        <h1 class="text">ccMusic</h1>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '~common/stylus/variable';

    .c-header 
        position: relative
        height: 44px
        text-align: center
        color: $color-theme
        font-size: 0
        .text
            display: inline-block
            vertical-align: top
            line-height: 44px
            font-size: $font-size-large
</style>
