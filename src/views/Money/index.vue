<template>
  <!-- 对话框 -->
  <el-button plain @click="dialogFormVisible = true"> 添加开支 </el-button>
  <el-button plain @click="productFormVisible = true"> 添加心愿 </el-button>
  <!-- 显示区域 -->
  <div class="container">
    <!-- 收支列表 -->
    <ul>
      <li v-for="item in moneyArr" :key="item.money_id">
        <div>项目名称:{{ item.content }}</div>
        <div>收支类型:{{ item.inorout ? '收入' : '支出' }}</div>
        <div>数目:{{ item.number }}</div>
        <div>插入时间:{{ item.time }}</div>
      </li>
    </ul>
    <!-- 愿望单 -->
    <ul>
      <li
        v-for="item in productArr"
        :key="item.product_id"
        @click="changeStatuApi(item.product_id)"
        :style="{ backgroundColor: item.statu == 1 ? 'green' : 'red' }"
      >
        <div>产品:{{ item.product_name }}</div>
        <div>状态:{{ item.statu ? '已购买' : '未购买' }}</div>
      </li>
    </ul>
  </div>

  <!-- 增加收支记录 -->
  <el-dialog v-model="dialogFormVisible" title="创建收支" width="500">
    <el-form :model="form">
      <el-form-item label="项目名称" label-width="140px">
        <el-input v-model="form.content" autocomplete="off" />
      </el-form-item>
      <el-form-item label="收支类型" label-width="140px">
        <el-select v-model="form.inorout" placeholder="选择收支类型" clearable filterable>
          <el-option label="支出" :value="false"> </el-option>
          <el-option label="收入" :value="true"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" label-width="140px">
        <el-input v-model="form.price" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createMissionApi"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 添加愿望 -->
  <el-dialog v-model="productFormVisible" title="添加购物车" width="500">
    <el-form :model="productForm">
      <el-form-item label="商品名" label-width="140px">
        <el-input v-model="productForm.content" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="productFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addpurchaseApi"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  createMoney,
  getMoneyList,
  addpurchase,
  getPurchaseList,
  changeStatu
} from '../../api/money/index'

let moneyArr = ref()
// 愿望单
let productArr = ref()

const dialogFormVisible = ref(false)
// 愿望单对话框
const productFormVisible = ref(false)
const form = reactive({
  content: '',
  price: '',
  inorout: false
})
// 愿望单添加
const productForm = reactive({
  content: ''
})

onMounted(() => {
  getMoneyListApi()
  getPurchaseListApi()
})

// 获取收支列表
const getMoneyListApi = async () => {
  let data = await getMoneyList()
  moneyArr.value = data.data
}

// 获取愿望单
const getPurchaseListApi = async () => {
  let data = await getPurchaseList()
  productArr.value = data.data
}

// 创建任务
const createMissionApi = async () => {
  if (form.content == '') return
  await createMoney(form)
  dialogFormVisible.value = false
  form.content = ''
  getMoneyListApi()
}

// 购物车添加
const addpurchaseApi = async () => {
  if (productForm.content == '') return
  await addpurchase(productForm)
  productFormVisible.value = false
  productForm.content = ''
  getPurchaseListApi()
}

// 更改状态
const changeStatuApi = async (id: number) => {
  await changeStatu(id)
  getPurchaseListApi()
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  ul {
    flex: 1;
    // background-color: gray;
  }
}
</style>
