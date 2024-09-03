<template>
  <!-- 布局 -->
  <div class="container">
    <el-button plain @click="addMissBtn" class="float"> 添加日程 </el-button>

    <el-tabs type="border-card" class="tabBox">
      <el-tab-pane label="收集箱">
        <Collection :coll="missionsArr" @changeStatu="changeChildStatu"></Collection>
      </el-tab-pane>
      <el-tab-pane label="今日计划">
        <div class="date">
          {{ todayDate }}
          星期{{ getDay }}
        </div>
        <Today
          :filMiss="filterMissions"
          @clickChild="clickEven"
          @changeStatu="changeChildStatu"
        ></Today>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- 对话框 -->
  <!-- <ul>
    <li
      v-for="item in missionsArr"
      :key="item.logId"
      :style="{ backgroundColor: item.statu == 1 ? 'green' : 'white' }"
      class="tran"
      @click="changeStatuApi(item.schedule_id)"
    >
      <div>任务序号:{{ item.schedule_id }}</div>
      <div>任务内容:{{ item.mission }}</div>
      <div>目标时间:{{ item.date ? item.date : 'none' }}</div>
    </li>
  </ul> -->

  <!--  -->
  <el-dialog v-model="dialogFormVisible" title="create mission" width="500">
    <el-form :model="form">
      <el-form-item label="任务内容" label-width="3.7333rem">
        <el-input v-model="form.content" autocomplete="off" />
      </el-form-item>
      <!-- 日期 -->
      <el-form-item label="目标时间" label-width="3.7333rem">
        <el-input v-model="form.date" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createMissionApi"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { createMission, getMissions, changeStatu } from '../../api/schedule/index'
import Collection from './Collection/index.vue'
import Today from './Today/index.vue'

const filterMissions = ref([])
const todayDate = ref('')
const getDay = ref('')

const dateString = () => {
  let today = new Date()
  let year = today.getFullYear()
  let month = String(today.getMonth() + 1).padStart(2, '0') // 使用padStart来确保月份总是两位数
  let date = String(today.getDate()).padStart(2, '0') // 使用padStart来确保日期总是两位数
  todayDate.value = year + '-' + month + '-' + date
  form.date = todayDate.value
  let xinqi = today.getDay()
  switch (xinqi) {
    case 0:
      getDay.value = '日'
      break
    case 1:
      getDay.value = '一'
      break
    case 2:
      getDay.value = '二'
      break
    case 3:
      getDay.value = '三'
      break
    case 4:
      getDay.value = '四'
      break
    case 5:
      getDay.value = '五'
      break
    case 6:
      getDay.value = '六'
      break
    default:
      break
  }
  // getDay.value = xinqi == 0 ? '日' : toda
}

const addMissBtn = () => {
  form.date = todayDate.value
  dialogFormVisible.value = true
}

let missionsArr = ref([])

const dialogFormVisible = ref(false)
const form = reactive({
  content: '',
  date: ''
})

onMounted(() => {
  dateString()
  getMissionsApi()
})

const clickEven = () => {
  getMissionsApi()
}

// 获取任务列表
const getMissionsApi = async () => {
  let data = await getMissions()
  missionsArr.value = data.data
  // 每次获取到，props本身是可以动态传值的
  filterMissions.value = missionsArr.value.filter((item: any) => {
    return item.date != null && item.date != '' && item.date == todayDate.value
  })
}

// 创建任务
const createMissionApi = async () => {
  if (form.content == '') return
  await createMission({
    content: form.content,
    date: form.date
  })
  dialogFormVisible.value = false
  // 清除表单
  form.content = ''
  console.log(form.date)
  // form.date = ''
  getMissionsApi()
}

// 更改状态
const changeStatuApi = async (id: number) => {
  await changeStatu(id)
  getMissionsApi()
}

const changeChildStatu = (id: number) => {
  changeStatuApi(id)
}
</script>

<style scoped lang="scss">
.container {
  margin: 20px;
  position: relative;
  .float {
    position: absolute;
    // background-color:;
    // left: 50%;
    right: 5px;
    top: 4px;
    // transform: translateY(-50%, -50%);
    z-index: 1;
  }
}
.tran {
  transition: 0.2s;
  cursor: pointer;
  width: 5.3333rem;
  border: 0.0267rem solid black;
}
.tabBox {
  .date {
    border: 1px solid #ccc;
    width: 160px;
    text-align: center;
    margin-bottom: 10px;
    margin-left: 5px;
    color: gray;
  }
}
ul {
  display: flex;
  flex-wrap: wrap;
}
</style>
