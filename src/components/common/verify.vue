<template>
  <div class="oraitVerify">
    <i
      :class="{
        iconfont: true,
        'icon-yunpingtaidenglu-zhengque': hint.icon == 0
      }"
    >
    </i>
    <span v-show="hint.msg != ''">{{ hint.msg }}</span>
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
.oraitVerify {
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-overflow: none;
  white-space: nowrap;
  .icon-yunpingtaidenglu-zhengque {
    color: rgba(45, 202, 147, 1);
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }
  i {
    opacity: 0;
    font-size: 16px;
    vertical-align: top;
  }
  span {
    color: rgba(255, 119, 62, 1);
    margin-left: 5px;
    animation: opacityAnimat 0.5s infinite;
    animation-iteration-count: 1;
  }
  @keyframes opacityAnimat {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
