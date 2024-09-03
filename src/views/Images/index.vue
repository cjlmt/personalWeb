<template>
  <div class="container">
    <el-upload
      class="avatar-uploader"
      name="avatar"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      action="http://120.55.114.231:4000/api/img/upload/avatar"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" style="height: 178px" />
      <!-- <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon> -->
      <i v-else class="avatar-uploader-icon">+</i>
    </el-upload>
    <div class="img_container">
      <div class="img-item" v-for="item in images" :key="item.imageId">
        <img :alt="item.imgaddress" />
        <!-- {{ item }}  :src="item.imgaddress"-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImages } from '../../api/images'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

const imageUrl = ref('')
// 存储图片地址数据
let images = ref()

onMounted(async () => {
  let data = await getImages()
  images.value = data.data
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style scoped lang="scss">
.avatar-uploader {
  width: 178px;
  height: 178px;
  display: block;
  text-align: center;
  // 重要
  line-height: 178px;

  .avatar {
    height: 170px;
  }
}
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.container {
  .img_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-item {
      width: 178px;
      height: 178px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
