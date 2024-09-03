<template>
  <div class="flex flex-wrap gap-4">
    <div class="view" v-if="filMiss.length > 0">
      <el-card
        style="width: 480px"
        shadow="hover"
        v-for="item in filMiss"
        :key="item.schedule_id"
        :class="{ done: item.statu == 1 }"
        class="card"
      >
        <div class="content">{{ item.mission }}</div>
        <div class="del">
          <el-button type="success" round @click="done(item.schedule_id)">Done</el-button>
          <el-button plain class="delBtn" @click="deleteMission(item.schedule_id)"
            >Delete</el-button
          >
        </div>
      </el-card>
    </div>
    <div class="hide" v-else>暂无任务安排</div>
  </div>
</template>

<script setup lang="ts">
import { deleteMissionApi } from '../../../api/schedule/index'
import { ElMessage, ElMessageBox } from 'element-plus'
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
  filMiss: Item[]
}>()

//使用父组件传递过来的值
const { filMiss } = toRefs(props)

// 删除博客
const deleteMission = async (id: number) => {
  ElMessageBox.confirm('确定要删除该任务吗？', '删除提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteMissionApi({
      id
    }).then(
      (result) => {
        ElMessage({
          message: result.data,
          type: result.status == 200 ? 'success' : 'warning'
        })
        return result
      },
      (reason) => {
        return reason
      }
    )
    emit('clickChild')
  })
}

// done
const done = (id: number) => {
  emit('changeStatu', id)
}
</script>

<style scoped lang="scss">
.view {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  // align-items: center;
  .done {
    background-color: #67c23a;
    color: white;
  }
  .card {
    position: relative;
    margin-bottom: 10px;
    // margin-right: 10px;
    .del {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
}
</style>
