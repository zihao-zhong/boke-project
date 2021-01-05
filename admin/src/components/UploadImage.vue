<template>
  <div class="ad-upload-image">
    <el-upload
      action
      v-if="!readonly"
      :show-file-list="false"
      :http-request="handleUploadFile"
      :before-upload="beforeAvatarUpload"
      @mouseenter.native="handleShowMask(true)"
      @mouseleave.native="handleShowMask(false)"
    >
      <!-- 遮罩層和按鈕 -->
      <div class="mask" v-show="mask" @click.stop :class="`${readonlyClass}`"></div>
      <!-- 遮罩層和按鈕 -->
      <div class="edit-box">
        <i class="icon icon-caozuo-shangchuan-upload" v-show="mask" v-if="!readonly" />
        <i class="icon icon-search" v-show="mask && imageUrl" @click.stop="handlepreview" />
        <i
          v-if="!readonly"
          class="icon icon-shanchu"
          v-show="mask && imageUrl"
          @click.stop="handleRemove"
        />
      </div>
      <!-- 圖片預覽插件 -->
      <div class="images" v-if="imageUrl && !isLoading">
        <img class="avatar" :src="imageUrl" />
      </div>
      <!-- 沒圖片時的icon -->
      <div class="not-images" v-if="!imageUrl && !isLoading">
        <i class="icon icon-upload" />
      </div>
      <!-- loading -->
      <div class="loading" v-if="isLoading">
        <i class="el-icon-loading"></i>
      </div>
    </el-upload>
    <div
      v-else
      class="el-upload readonly"
      @mouseenter="handleShowMask(true)"
      @mouseleave="handleShowMask(false)"
    >
      <!-- 遮罩層和按鈕 -->
      <div class="mask" v-show="mask" @click.stop :class="`${readonlyClass}`"></div>
      <!-- 遮罩層和按鈕 -->
      <div class="edit-box">
        <i class="icon icon-search" v-show="mask && imageUrl" @click.stop="handlepreview" />
      </div>
      <!-- 圖片預覽插件 -->
      <div class="images" v-if="imageUrl && !isLoading">
        <img class="avatar" :src="imageUrl" />
      </div>
      <!-- 沒圖片時的icon -->
      <div class="not-images" v-if="!imageUrl && !isLoading">
        <i class="icon icon-jinzhi" />
      </div>
    </div>
    <el-input v-model="imageUrl" v-if="required" />
  </div>
</template>

<script>
/**
 * url: 圖片的路徑
 * title：圖片的標題
 * readonly：是否可編輯
 * required：是否必填
 *
 */
import { uploadFile } from '@api/index'
export default {
  name: 'UploadImage',

  props: {
    url: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    extensions: {
      type: Array,
      default: () => ['img']
    }
  },

  data() {
    return {
      mask: false,
      isLoading: false,
      imageUrl: this.url,
    }
  },

  watch: {
    url(val) {
      this.imageUrl = val || ''
    }
  },

  computed: {
    readonlyClass() {
      if (this.readonly && this.imageUrl) {
        return 'readonly img'
      } else if (this.readonly && !this.imageUrl) {
        return 'readonly'
      } else {
        return ''
      }
    }
  },

  methods: {
    isAccordFileType(type) {
      let extensions = this.extensions
      const imgs = ['jpg', 'png', 'jpeg']
      return extensions.includes('img') && imgs.includes(type)
    },
    // 圖片上傳之前
    beforeAvatarUpload(file) {
      const fileType = file.name.slice(file.name.lastIndexOf('.') + 1)

      if (!this.isAccordFileType(fileType)) {
        return false
      }
    },
    async handleUploadFile(file) {
      // 上傳圖片中顯示loading
      this.isLoading = true
      let params = new FormData()
      params.append('file', file.file)
      try {
        const data = await uploadFile(params)
        this.isLoading = false
        if ( data ) {
          this.imageUrl = data.url
          this.$emit('update:url', this.imageUrl)
        }
      } catch {
        this.imageUrl = ''
        this.isLoading = false
      }
      this.uploadFile(params)
    },
    // 是否顯示遮罩層
    handleShowMask(type) {
      // 有圖片有readonly才顯示mask
      if (this.imageUrl || this.readonly) {
        this.mask = type
      }
    },
    // 圖片放大
    handlepreview() {

    },
    // 圖片刪除
    handleRemove() {
      this.mask = false
      this.imageUrl = ''
      this.$emit('update:url', '')
    },
  }
}
</script>

<style scoped lang="scss">
.ad-upload-image {
  display: inline-block;
  & /deep/ .el-input {
    display: none;
  }
  & /deep/ .el-upload {
    width: 340px;
    height: 216px;
    padding: 8px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #e1e1e1;
    display: flex;
    justify-content: center;
    align-items: center;
    &.readonly {
      cursor: auto;
    }
    .not-images {
      color: #e1e1e1;
      .icon {
        font-size: 50px;
      }
    }
    .avatar {
      width: auto;
      height: 200px;
      display: block;
    }
    .avatar-pdf {
      width: 50%;
      display: block;
      margin: 0 auto;
    }
  }
  .mask {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    cursor: auto;
    background: rgba(7, 14, 25, 0.52);
    &.readonly {
      cursor: no-drop;
      background-color: transparent;
    }
    &.readonly.img {
      cursor: auto;
      background: rgba(7, 14, 25, 0.52);
    }
  }
  .edit-box {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    i {
      color: #fff;
      font-size: 30px;
      margin-top: 10px;
      cursor: pointer;
    }
  }
  .el-icon-loading {
    font-size: 24px;
    color: #e1e1e1;
  }
}
</style>