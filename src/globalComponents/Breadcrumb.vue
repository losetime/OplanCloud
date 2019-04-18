<template>
  <div>
    <span
      v-for="(item, index) in newRoute.matched"
      :key="index"
      @click="goNext(item)"
      >{{ item.meta.breadName }}<i>></i>
    </span>
  </div>
</template>
<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      newRoute: []
      // routeList:[]
    };
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    goNext(item) {
      this.$router.push(item.path);
    }
  },
  computed: {
    route() {
      return this.$route;
    }
  },
  watch: {
    route(val) {
      this.newRoute = val;
    }
  }
};
</script>

<style lang="scss" scoped>
span {
  font-size: 16px;
  cursor: pointer;
  i {
    margin: 0 5px;
  }
}
</style>
