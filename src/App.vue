<template>
  <!-- <RouterLink to="/">Home</RouterLink> -->
  <!-- <RouterLink to="/english">English</RouterLink>
  <RouterLink to="/image">Image</RouterLink>
  <RouterLink to="/logs">logs</RouterLink>
  <RouterLink to="/boost">Boost</RouterLink>
  <RouterLink to="/bedtime">BedTime</RouterLink>
  <RouterLink to="/blog">Blog</RouterLink> -->
  <div class="box">
    <div class="menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router="true"
      >
        <el-menu-item index="/schedule">工作计划</el-menu-item>
        <el-menu-item index="/fitness">健身</el-menu-item>
        <el-menu-item index="/money">收支功能</el-menu-item>
        <el-menu-item index="/english">英语</el-menu-item>
        <el-menu-item index="/image">图片</el-menu-item>
        <el-menu-item index="/logs">日志</el-menu-item>
        <el-menu-item index="/boost">激励</el-menu-item>
        <el-menu-item index="/bedtime">作息时间</el-menu-item>
        <el-menu-item index="/blog">博客</el-menu-item>
      </el-menu>
    </div>
    <div class="show">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const activeIndex = ref('/schedule')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  .show {
    flex: 1;
    // flex-grow: 0;
    // overflow: hidden;
    overflow: auto;
  }
}
</style>
