<!-- pagination -->
<template>
  <div>
    <ElPagination
      class="white-list-tool"
      background
      hide-on-single-page
      :page-size="10"
      layout="prev, pager, next"
      :total="50"
      prev-text="上一页"
      next-text="下一页"
    ></ElPagination>
  </div>
</template>

<script setup></script>

<style>
.white-list-tool.is-background .btn-prev {
  width: 48px;
  background-color: rgba(255, 255, 255, 0.09);
  color: #fff;
}
.white-list-tool.is-background .btn-prev:disabled {
  color: rgba(255, 255, 255, 0.5);
}
.white-list-tool.is-background .btn-next {
  width: 48px;
  background-color: rgba(255, 255, 255, 0.09);
  color: #fff;
}
.white-list-tool.is-background .btn-next:disabled {
  background-color: rgba(255, 255, 255, 0.09);
  color: rgba(255, 255, 255, 0.5);
}
.white-list-tool.is-background .el-pager li {
  background-color: rgba(255, 255, 255, 0.09);
  color: rgba(255, 255, 255, 0.5);
}
.white-list-tool.is-background .el-pager li:not(.disabled).active {
  background-color: rgba(255, 255, 255, 0.09);
  color: #fff;
}
.white-list-tool.is-background .el-pager li.active {
  color: #fff;
  cursor: default;
}
.white-list-tool.is-background .el-pager li:hover {
  color: #fff;
}
.white-list-tool.is-background .el-pager li:not(.disabled):hover {
  color: #fff;
}
.white-list-tool.is-background .el-pager li:not(.disabled).active:hover {
  background-color: rgba(255, 255, 255, 0.09);
  color: #fff;
}
.white-list-tool.is-background .btn-next .el-icon-arrow-right {
  margin: 0 auto;
}
.white-list-tool.is-background .btn-prev .el-icon-arrow-left {
  margin: 0 auto;
}
</style>
