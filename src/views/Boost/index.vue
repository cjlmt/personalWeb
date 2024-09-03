<template>
  <div>激励模块</div>
  <!-- 激励模块 -->
  <div class="boost">
    <li v-for="item in boost" :key="item.boostId">{{ item.boostId }}：{{ item.content }}</li>
  </div>
  <!-- 对话框 -->
  <el-button plain @click="dialogFormVisible = true"> 插入激励信息 </el-button>
  <!--  -->
  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form :model="form">
      <el-form-item label="激励内容" label-width="140px">
        <el-input v-model="form.content" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="insertBoost"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { insertBoostApi, getBoostListApi } from '../../api/boost'

const dialogFormVisible = ref(false)
const form = reactive({
  content: ''
})

// 存储激励信息的数据
let boost = ref()

// 存储激励插入表单的数据
// let boostInsert = ref('')

onMounted(() => {
  getBoost()
})

// 获取激励信息列表
const getBoost = async () => {
  let data = await getBoostListApi()
  boost.value = data.data
}

// 确认插入
const insertBoost = async () => {
  if (form.content == '') return
  await insertBoostApi({
    content: form.content
  })
  dialogFormVisible.value = false
  form.content = ''
  getBoost()
}
</script>

<style scoped lang="scss"></style>
