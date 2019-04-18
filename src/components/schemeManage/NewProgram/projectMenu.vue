<template>
  <div class="projectWrap">
    <div class="projectTitle">参数设置</div>
    <div class="projectMenu">
      <div class="project">
        <span>电源规划</span>
      </div>
      <div class="project">
        <span>电网规划</span>
      </div>
      <div class="project">
        <span>运行模拟</span>
      </div>
      <div class="project">
        <span>风电模拟</span>
      </div>
      <div class="project">
        <span>光伏模拟</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.projectWrap {
  width: 12%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  box-sizing: border-box;
  font-size: 15px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  .projectTitle {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .project {
    width: 100%;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  .project:hover {
    color: #ea5506;
  }
}
</style>
