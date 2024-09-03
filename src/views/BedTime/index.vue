<template>
  <div>起床时间</div>
  <ul>
    <li v-for="item in bedtimeData" :key="item.day">
      <div>日期:{{ item.day }}</div>
      <div>起床:{{ item.getup }}</div>
      <div>睡觉:{{ item.sleep }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsersList } from '../../api/bedtime'

// 存储数据
let bedtimeData = ref()

onMounted(async () => {
  let data = await getUsersList()
  bedtimeData.value = data.data
})
</script>

<style scoped lang="scss">
li {
  width: 150px;
  border: 1px solid black;
  div {
    margin-bottom: 2px;
  }
}

@media screen and (max-width: 500px) {
  li {
    margin: 20px auto;
    font-size: 20px;
    width: 200px;
  }
}
</style>
