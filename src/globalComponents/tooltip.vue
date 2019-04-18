<template>
  <div class="tooltip" :class="placement">
    <div class="content">
      {{ content }}
      <div id="tool"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tooltip",
  data: () => {
    return {};
  },
  props: {
    content: {
      type: String
    },
    placement: {
      type: String
    }
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss" scoped>
.tooltip {
  .content {
    font-size: 12px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    padding: 0 5px;
    background-color: black;
    border-radius: 5px;
    #tool {
      width: 0;
      height: 0;
      position: absolute;
    }
  }
}
// .top_left {
//   top: -40px;
//   left: 0;
//   #tool {
//     border-top: 5px solid black;
//     border-right: 5px solid transparent;
//     border-bottom: 5px solid transparent;
//     border-left: 5px solid transparent;
//     bottom: -10px;
//     left: 25%;
//   }
// }
.top_center {
  position: absolute;
  // top: 20px;
  // left: 20px;
  #tool {
    border-top: 5px solid black;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid transparent;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
// .top_right {
//   top: -40px;
//   right: 0;
//   #tool {
//     border-top: 5px solid black;
//     border-right: 5px solid transparent;
//     border-bottom: 5px solid transparent;
//     border-left: 5px solid transparent;
//     bottom: -10px;
//     left: 50%;
//   }
// }
// .right_top {
//   top: 0;
//   right: -10px;
//   transform: translateX(100%);
//   #tool {
//     border-top: 5px solid transparent;
//     border-right: 5px solid black;
//     border-bottom: 5px solid transparent;
//     border-left: 5px solid transparent;
//     top: 30%;
//     left: -10px;
//   }
// }
// .right_center {
//   top: 50%;
//   right: -10px;
//   transform: translate(100%, -50%);
//   #tool {
//     border-top: 5px solid transparent;
//     border-right: 5px solid black;
//     border-bottom: 5px solid transparent;
//     border-left: 5px solid transparent;
//     top: 50%;
//     transform: translateY(-50%);
//     left: -10px;
//   }
// }
// .right_bottom {
//   bottom: 0;
//   right: -10px;
//   transform: translate(100%);
//   #tool {
//     border-top: 5px solid transparent;
//     border-right: 5px solid black;
//     border-bottom: 5px solid transparent;
//     border-left: 5px solid transparent;
//     top: 50%;
//     transform: translateY(-50%);
//     left: -10px;
//   }
// }
// .bottom_left {
//   bottom: -40px;
//   left: 0;
//   #tool {
//     border-top: 5px solid transparent;
//     border-right: 5px solid transparent;
//     border-bottom: 5px solid black;
//     border-left: 5px solid transparent;
//     top: -10px;
//     left: 40%;
//   }
// }
// .bottom_center {
//   bottom: -40px;
//   left: 50%;
//   transform: translateX(-50%);
//   #tool {
//     border-top: 5px solid transparent;
//     border-right: 5px solid transparent;
//     border-bottom: 5px solid black;
//     border-left: 5px solid transparent;
//     top: -10px;
//     left: 50%;
//     transform: translateX(-50%);
//   }
// }
// .bottom_right {
//   bottom: -40px;
//   right: 0;
//   #tool {
//     border-top: 5px solid transparent;
//     border-right: 5px solid transparent;
//     border-bottom: 5px solid black;
//     border-left: 5px solid transparent;
//     top: -10px;
//     left:50%;
//   }
// }
// .left_top {
//   top: 0;
//   left: -10px;
//   transform: translateX(-100%);
//   #tool {
//     border-top: 5px solid transparent;
//     border-right: 5px solid transparent;
//     border-bottom: 5px solid transparent;
//     border-left: 5px solid black;
//     top: 30%;
//     right: -10px;
//   }
// }
// .left_center {
//   top: 50%;
//   left: -10px;
//   transform: translate(-100%, -50%);
//   #tool {
//     border-top: 5px solid transparent;
//     border-right: 5px solid transparent;
//     border-bottom: 5px solid transparent;
//     border-left: 5px solid black;
//     top: 50%;
//     transform: translateY(-50%);
//     right: -10px;
//   }
// }
// .left_bottom {
//   bottom: 0;
//   left: -10px;
//   transform: translate(-100%);
//   #tool {
//     border-top: 5px solid transparent;
//     border-right: 5px solid transparent;
//     border-bottom: 5px solid transparent;
//     border-left: 5px solid black;
//     top: 50%;
//     transform: translateY(-50%);
//     right: -10px;
//   }
// }
</style>
