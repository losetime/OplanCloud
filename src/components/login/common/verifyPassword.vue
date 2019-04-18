<template>
  <div class="remindBox">
    <p class="title">密码需满足以下需求</p>
    <div class="warn">
      <i
        :class="{
          iconfont: true,
          'icon-yunpingtaidenglu-zhengque': hint.icon1 == 0,
          'icon-yunpingtaidenglu-cuowu': hint.icon1 == 1,
          'icon-yunpingtaidenglu-zhanwei1': hint.icon1 == -2
        }"
      >
      </i>
      <span>同时包含字母和数字</span>
    </div>
    <div class="warn">
      <i
        :class="{
          iconfont: true,
          'icon-yunpingtaidenglu-zhengque': hint.icon2 == 0,
          'icon-yunpingtaidenglu-cuowu': hint.icon2 == 1,
          'icon-yunpingtaidenglu-zhanwei1': hint.icon2 == -2
        }"
      >
      </i>
      <span>长度为8-32个字符</span>
    </div>
    <div class="warn">
      <i
        :class="{
          iconfont: true,
          'icon-yunpingtaidenglu-zhengque': hint.icon3 == 0,
          'icon-yunpingtaidenglu-cuowu': hint.icon3 == 1,
          'icon-yunpingtaidenglu-zhanwei1': hint.icon3 == -2
        }"
      >
      </i>
      <span>不得包含空格</span>
    </div>
    <div class="warn">
      <i
        :class="{
          iconfont: true,
          'icon-yunpingtaidenglu-zhengque': hint.icon4 == 0,
          'icon-yunpingtaidenglu-cuowu': hint.icon4 == 1,
          'icon-yunpingtaidenglu-zhanwei1': hint.icon4 == -2
        }"
      >
      </i>
      <span>不得为常见密码</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hint: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.remindBox {
  width: 150px;
  height: 100px;
  background-color: #fff;
  border: 0.5px solid rgba(203, 193, 189, 0.5);
  padding: 10px;
  border-radius: 3px;
  p {
    text-align: center;
    color: rgba(245, 126, 81, 1);
  }
  i {
    font-size: 16px;
    vertical-align: top;
  }
  span {
    color: rgba(164, 150, 145, 1);
    margin-left: 5px;
  }
  .icon-yunpingtaidenglu-cuowu {
    color: rgba(255, 81, 81, 1);
  }
  .icon-yunpingtaidenglu-zhengque {
    color: rgba(45, 202, 147, 1);
  }
  .icon-yunpingtaidenglu-zhanwei1 {
    color: rgba(217, 217, 217, 1);
  }
}
</style>
