<template>
  <!-- 大盒子 -->
  <div class="container">
    <!-- 左侧菜单展示区 -->
    <div class="menu">
      <el-button plain @click="dialogFormVisible = true"> 插入博客 </el-button>

      <!-- 展示博客列表 -->
      <ul>
        <li v-for="(item, index) in blogArr" :key="item.studyId" @click="setShowId(index)">
          <div class="up">
            <div>
              {{ item.studyId }}
              <span class="title">{{ item.title }}</span>
            </div>
            <span class="time">{{ item.createdAt }}</span>
          </div>
          <div class="down">{{ item.article }}</div>
          <!-- <button @click="beforeUpdate(index)">修改</button> -->
        </li>
      </ul>
    </div>
    <!-- 右侧内容展示区 -->
    <div class="article">
      <div v-if="showBlog >= 0" style="height: 100%" class="show">
        <!-- 头部 -->
        <div class="head">
          <div class="title">
            <el-input v-model="editForm.title" v-if="isEdit" />
            <div v-else>{{ blogArr[showBlog].title }}</div>
          </div>
          <div class="button">
            <div v-if="!isEdit">
              <button @click="clickEdit">编辑</button>
              <button @click="deleteBlog(blogArr[showBlog].studyId)">删除</button>
            </div>
            <div v-else>
              <button @click="update">保存</button>
              <button @click="cancelUpdate">取消</button>
            </div>
          </div>
        </div>
        <!-- 内容 -->
        <el-input resize="none" v-if="isEdit" v-model="editForm.article" type="textarea" />
        <textarea v-else :value="blogArr[showBlog].article" disabled style="height: 95%"></textarea>
      </div>
    </div>
  </div>

  <!-- 对话框 -->
  <!-- 创建文章 -->
  <el-dialog v-model="dialogFormVisible" title="创建文章">
    <el-form label-position="top" label-width="auto" :model="formLabelAlign">
      <el-form-item label="标题">
        <el-input v-model="formLabelAlign.title" />
      </el-form-item>
      <el-form-item label="正文">
        <el-input v-model="formLabelAlign.article" type="textarea" rows="10" resize="none" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" plain @click="createArticle">创建文章</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  getArticleList,
  createArticleApi,
  updateArticle,
  deleteBlogApi
} from '../../api/study/index'
import { ElMessage, ElMessageBox } from 'element-plus'

// 总博客列表
let blogArr = ref()
// 展示博客ID
let showBlog = ref(-1)
const dialogFormVisible = ref(false)

// 编辑状态标识变量
let isEdit = ref(false)
// 点击编辑按钮回调
const clickEdit = () => {
  isEdit.value = true
  editForm.id = blogArr.value[showBlog.value].studyId
  editForm.title = blogArr.value[showBlog.value].title
  editForm.article = blogArr.value[showBlog.value].article
}
// 要有一个存储修改中转变量，确定修改则上传并同步，否则清空
let editForm = reactive({
  id: '',
  title: '',
  article: ''
})
// 取消编辑按钮回调
const cancelUpdate = () => {
  isEdit.value = false
}
//

// 表单
const formLabelAlign = reactive({
  title: '',
  article: ''
})

//
// let updateId = ref()

//
const setShowId = (index: number) => {
  showBlog.value = index
}

// 创建文章
const createArticle = async () => {
  if (!formLabelAlign.title || !formLabelAlign.article) {
    ElMessage({
      message: '完善表单',
      type: 'warning'
    })
    return
  }
  await createArticleApi(formLabelAlign).then(
    (result) => {
      // console.log(result, 'result')
      if (result.status == 200) {
        ElMessage({
          message: '您的反馈已收到，请耐心等待管理员回复！',
          type: 'success'
        })
      }
      return result
    },
    (reason) => {
      return reason
    }
  )
  dialogFormVisible.value = false
  formLabelAlign.article = ''
  formLabelAlign.title = ''
  getBlogs()
}

// 更新文章
// const beforeUpdate = (index: number) => {
//   formLabelAlign.title = blogArr.value[index].title
//   formLabelAlign.article = blogArr.value[index].article
//   updateId.value = blogArr.value[index].studyId
// }

// 更新文章
const update = async () => {
  if (!editForm.title || !editForm.article) {
    ElMessage({
      message: '完善标题或内容',
      type: 'warning'
    })
    return
  }
  if (editForm.article === blogArr.value[showBlog.value].article) {
    ElMessage({
      message: '没有改变内容，不发送请求',
      type: 'warning'
    })
    isEdit.value = false
    return
  }
  await updateArticle(parseInt(editForm.id), { article: editForm.article }).then(
    (result) => {
      // console.log(result, 'result')
      if (result.status == 200) {
        ElMessage({
          message: '博客已更新',
          type: 'success'
        })
      }
      isEdit.value = false
      return result
    },
    (reason) => {
      return reason
    }
  )
  // dialogFormVisible.value = false
  // formLabelAlign.article = ''
  // formLabelAlign.title = ''
  getBlogs()
  // 要不要？
}

onMounted(() => {
  getBlogs()
})

// 获取blog
const getBlogs = async () => {
  let data = await getArticleList()
  blogArr.value = data.data
}

// 删除博客
const deleteBlog = async (id: number) => {
  ElMessageBox.confirm('确定要删除该博客吗？', '删除提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteBlogApi({
      id: id
    }).then(
      (result) => {
        console.log(result, 'result')
        // if (result.status == 200) {
        //   ElMessage({
        //     message: '博客删除成功',
        //
        //   })
        // }
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
    showBlog.value = -1
    getBlogs()
  })
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  overflow: hidden;
  // flex: 1;
  box-sizing: border-box;
  padding: 20px 20px;
  display: flex;
  .menu {
    height: 100%;
    overflow: auto;
    flex: 1;
    ul {
      width: 100%;
      /* margin: 0 auto; */
      li {
        /* border: 1px solid #ccc; */
        cursor: pointer;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        .up {
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            font-weight: 700;
            font-size: 21px;
          }
          .time {
            color: gray;
          }
        }
        .down {
          color: #666;
          margin-left: 15px;
          margin-right: 15px;
          margin-top: 3px;
          word-break: break-all;
          /* word-wrap: break-word; */
          /* overflow: hidden; /*这个参数根据需要来绝对要不要 */

          overflow: hidden;
          text-overflow: ellipsis;
          /*弹性伸缩盒子模型显示*/
          display: -webkit-box;
          /*限制在一个块元素显示的文本的行数*/
          -webkit-line-clamp: 2;
          /* 在第几行显示省略号 */
          /*设置或检索伸缩盒对象的子元素的排列方式*/
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .article {
    flex: 2;
    /* background-color: #ccc;*/
    border: 1px solid #ccc;
    height: 100%;
    .show {
      display: flex;
      flex-direction: column;
      .head {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        .title {
          line-height: 30px;
          font-weight: 700;
          font-size: 20px;
          margin-left: 10px;
        }
        button {
          height: 22px;
          margin-right: 10px;
        }
      }
      textarea {
        flex: 1;
        width: 100%;
        border: 0;
        resize: none;
        outline: none;
        /* cursor: initial; */
        /* cursor: default; */
        background-color: transparent;
        color: black;
        font-size: 16px;
      }
      :deep(.el-textarea) {
        flex: 1;
        padding: 10px 10px;
        box-sizing: border-box;
        textarea {
          height: 100%;
        }
      }
    }
  }
}
</style>
