<template>
  <div class="flex flex-wrap gap-4 cardBox">
    <el-card
      style="width: 400px; height: 50px"
      shadow="hover"
      v-for="item in coll"
      :key="item.schedule_id"
      class="card"
      :class="{ done: item.statu == 1 }"
    >
      <div>{{ item.mission }}{{ item.date }}</div>
      <div class="del">
        <el-button type="success" round @click="done(item.schedule_id)">Done</el-button>
        <!-- <el-button plain class="delBtn" @click="deleteMission(item.schedule_id)">删除</el-button> -->
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const emit = defineEmits(['clickChild', 'changeStatu'])

//
interface Item {
  schedule_id: number
  mission: string
  date: string
  statu: number
}

const props = defineProps<{
  //子组件接收父组件传递过来的值
  coll: Item[]
}>()

//使用父组件传递过来的值
const { coll } = toRefs(props)

// done
const done = (id: number) => {
  emit('changeStatu', id)
}
</script>

<style scoped lang="scss">
.cardBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .done {
    background-color: #67c23a;
    color: white;
  }
  .card {
    position: relative;
    margin-bottom: 10px;
    .del {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
}
</style>
