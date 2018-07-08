<template>
    <div class="recommend">
        <div class="recommend-content">
            <div class="slider-wrapper" v-if="recommends.length">
                <slider>
                    <div v-for="item in recommends">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="radioList">
                <h2 class="radioTit">电台</h2>
                <ul class="radio">
                    <li v-for="item in radio" class="radioItem">
                        <img :src="item.picUrl" alt="" class="radioPic">
                        <span class="dis">{{item.Ftitle}}</span>
                        <span class="playPic">
                            <img src="../../common/image/play.png" alt="" class="icon">
                        </span>
                    </li>
                </ul>
            </div>
            <div class="recommend-list">
                <h2 class="list-title">热门歌单推荐</h2>
                <ul class="list">
                  <li class="musicList" v-for="item in songList">
                    <img :src="item.picUrl" alt="" class="musicPic">
                    <div class="detail">
                      <h3 class="desc">{{item.songListDesc}}</h3>
                      <p class="author">{{item.songListAuthor}}</p>
                    </div>
                    <span class="playPic">
                      <img src="../../common/image/play.png" alt="" class="icon">
                    </span>
                  </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getRecommend } from "api/recommend";
import { ERR_OK } from "api/config";
import Slider from "base/slider";
import playIcon from 'common/image/play.png'
export default {
  data() {
    return {
      recommends: [],
      radio: [],
      songList: [],
    };
  },
  created() {
    this._getRecommend();
  },
  methods: {
    //获取轮播图数据
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data.slider)
          this.recommends = res.data.slider;
          this.radio = res.data.radioList;
          this.songList = res.data.songList;
        }
      });
    }
  },
  components: {
    Slider
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/reset';

.radioList
.recommend-list 
  width: 100%;
  height: width ;
  padding 10px 0 0 10px
  box-sizing border-box
  .radioTit
  .list-title
    height 40px;
    line-height 40px;
    padding-left 10px;
  .radio
  .list
    width: 100%;
    height: 100%;
    overflow hidden
    .radioItem
    .musicList
      dispaly flex 
      align-items center 
      width 50%
      height width 
      float left
      box-sizing border-box
      padding-right 8px
      margin-bottom 10px
      overflow hidden
      background-color $color-background
      position relative
      .radioPic
      .musicPic 
        display block
        width 100%
        height 100%
      .dis
      .detail
        display block
        width 100%
        height 44px
        color: $color-text
        font-size $font-size-medium
        line-height 44px
        background-color $color-background-c
        padding-left 5px;
        box-sizing border-box
        .desc
          width 100%
          height 50%
          line-height 2
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
        .author
          width 100%
          height 50%
          line-height 2
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          font-size $font-size-small
      .playPic 
        position absolute
        width 30px
        height 30px
        bottom 45px
        right 10px
        .icon 
          display block
          width 100%
          height 100%


</style>
