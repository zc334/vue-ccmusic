<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :class="{active:currentPage===index}"></span>
        </div>
    </div>
</template>

<script>
import { addClass } from "common/js/dom";
import betterScroll from "better-scroll";
export default {
  name: "slider",
  data() {
    return {
      dots: [],
      currentPage: 0
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();

      if (this.autoplay) {
        this._play();
      }
    }, 20);
    //监听窗口大小改变，并且重新设置滑块宽度
    window.addEventListener('resize', ()=>{
        if(!this.slider){
            return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
    })
  },
  methods: {
    //设置滑块宽度
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      //循环设置每一个滑块的宽度等于容器的宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");
        child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }
      //循环时会多出两个clone出来的dom
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    //初始化滑块
    _initSlider() {
      this.slider = new betterScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      });
      //设置滑动结束后，每次获取当前的idx，并且循环执行滚动事件
      this.slider.on("scrollEnd", () => {
        let pageIdx = this.slider.getCurrentPage().pageX;
        if(this.loop) {
            pageIdx -= 1
        }
        this.currentPage = pageIdx;

        if (this.autoplay) {
          this._play();
        }
      });

      this.slider.on("beforeScrollStart", () => {
        if (this.autoplay) {
          clearTimeout(this.timer);
        }
      });
    },
    //初始化dots
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    //循环播放事件
    _play() {
      let pageIdx = this.currentPage + 1;
      if(this.loop) {
          pageIdx += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIdx, 0, 400);
      }, this.interval);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slider {
    min-height: 1px;
    overflow: hidden;
    position: relative;

    .slider-group {
        position: relative;
        white-space: nowrap;

        .slider-item {
            float: left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;

            a {
                display: block;
                width: 100%;
                overflow: hidden;
                text-decoration: none;
            }

            img {
                display: block;
                width: 100%;
            }
        }
    }

    .dots {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 12px;
        text-align: center;
        font-size: 0;

        .dot {
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: $color-text-l;

            &.active {
                width: 20px;
                border-radius: 5px;
                background: $color-text-ll;
            }
        }
    }
}
</style>