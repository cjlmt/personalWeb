<template>
  <div class="header">
    <span>英语学习</span>
    <div class="translate" @click="transform">跳转到百度翻译</div>
    <el-button type="primary">
      <a href="https://fanyi.baidu.com/mtpe-individual/multimodal#/" target="_blank">百度翻译</a>
    </el-button>
  </div>
  <!-- {{ englishArr }} -->
  <!-- 对话框 -->
  <el-button plain @click="dialogFormVisible = true"> 插入词句 </el-button>
  <!-- 数据展示 -->
  <ul>
    <li v-for="item in englishArr" :key="item.engId" class="word">
      <!-- {{ item.engId }} -  -->
      <el-tag type="primary" size="normal" :effect="item.type == '0' ? 'plain' : 'dark'">
        {{ item.type == '0' ? '词语' : '句子' }}
      </el-tag>

      <div>{{ item.content }}</div>
      <div>{{ item.translation }}</div>
      <div class="time">{{ item.insertTime }}</div>
    </li>
  </ul>

  <!--  -->
  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form :model="form">
      <el-form-item label="重难词句" label-width="140px">
        <el-input v-model="form.content" autocomplete="off" />
      </el-form-item>
      <!-- 翻译 -->
      <el-form-item label="翻译" label-width="140px">
        <el-input v-model="form.translation" autocomplete="off" />
      </el-form-item>
      <!-- 种类 -->
      <el-form-item label="Type" label-width="140px">
        <el-select v-model="form.type" placeholder="Please select a zone">
          <el-option label="词语" value="0" />
          <el-option label="句子" value="1" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="insertEng"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { getEngListApi, insertEngApi } from '../../api/english/index'

let englishArr = ref()

const dialogFormVisible = ref(false)
const form = reactive({
  content: '',
  type: '',
  translation: ''
})

onMounted(async () => {
  getEng()
})

// 获取词句
const getEng = async () => {
  let data = await getEngListApi()
  englishArr.value = data.data
}

// 确认插入
const insertEng = async () => {
  if (form.content == '' || form.translation == '') return
  await insertEngApi({
    content: form.content,
    type: parseInt(form.type),
    translation: form.translation
  })
  dialogFormVisible.value = false
  form.content = ''
  form.translation = ''
  form.type = ''
  getEng()
}

const transform = () => {
  window.open('https://fanyi.baidu.com/mtpe-individual/multimodal#/')
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  display: flex;
  .translate {
    // width: 100px;
    line-height: 30px;
    padding: 0 10px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
    color: black;
    font-size: 15px;
  }
  a {
    color: white;
    font-weight: 700;
    text-decoration: none;
  }
}

ul {
  display: flex;
  flex-wrap: wrap;
  .word {
    border: 1px solid black;
    margin-bottom: 5px;
    margin-right: 10px;
    width: 300px;
    .time {
      color: gray;
      font-size: 13px;
    }
  }
}
</style>
