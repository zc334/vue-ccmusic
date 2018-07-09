<template>
    <div class="singer">
      <list-view :data=singers></list-view>
    </div>
</template>

<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer";
import ListView from "base/listview";

//定义常量数据
const HOT_SINGER_LEN = 10;
const HOT_TIT = "热门";

export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    //获取歌手列表数据
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this.formatSinger(res.data.list);
        }
      });
    },
    //热门歌手数据的处理
    formatSinger(list) {
      //创建热门歌手对象
      let map = {
        hot: {
          title: HOT_TIT,
          items: []
        }
      };
      //遍历数据，填充热门歌手列表数据
      list.forEach((value, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: value.Fsinger_mid,
              name: value.Fsinger_name
            })
          );
        }
        //定义首字母常量
        const word = value.Findex;
        //如果没有这个列表对象，我们就创建一个
        if (!map[word]) {
          map[word] = {
            title: word,
            items: []
          };
        }
        //填充首字母列表数据
        map[word].items.push(
          new Singer({
            id: value.Fsinger_mid,
            name: value.Fsinger_name
          })
        );
      });
      //将map对象的有序化，需要将其数据放在数组中进行排序
      let set = [];
      let hot = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          set.push(val);
        } else if (val.title === HOT_TIT) {
          hot.push(val);
        }
      }
      //首字母列表排序
      set.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(set);
    }
  },
  components: {
    ListView
  }
};
</script>

<style lang="stylus" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
