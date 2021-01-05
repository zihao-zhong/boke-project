<template>
  <main class="ad-article-list">
    <h1 class="ad-article__title">文章列表</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="创建时间" width="140px">
        <template slot-scope="scope">
          {{ scope.row.createTime | filterDate }}            
        </template>
      </el-table-column>
      <el-table-column prop="category.name" label="文章分类"  width="140px"></el-table-column>
      <el-table-column prop="title" label="文章名称"></el-table-column>
      <el-table-column prop="description" label="文章描述"></el-table-column>
      <el-table-column width="220px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleView(scope.row)">查看</el-button>
          <el-button size="mini" type="info" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog width="1000px" :visible.sync="visible">
      <div class="ad-article-dialog">
        <h2 class="ad-dialog__title">{{ detailData.title }}</h2>
        <p class="ad-dialog__description">{{ detailData.description }}</p>
        <img class="ad-dialog__image" :src="detailData.image">
        <div class="ad-dialog__content markdown-body" v-html="detailData.body"></div>
        <p class="ad-dialog__footer">文章创建时间：{{ detailData.createTime | filterDate }}</p>
      </div>
    </el-dialog>
  </main>
</template>

<script>
import { getArticleList, removeArticle, getArticleDetail } from '@api/article'
export default {
  name: 'ArticleList',

  data() {
    return {
      visible: false,
      tableData: [],
      detailData: {},
    }
  },

  methods: {
    async handleList() {
      const data = await getArticleList()
      this.tableData = data
    },
    handleDelete(row) {
      this.$confirm('确认删除吗？').then(async () => {
        const res = await removeArticle(row._id)
        this.$message.success(res.message)
        this.handleList()
      })
    },
    handleEdit(row) {
      this.$router.push(`/article/${row._id}`)
    },
    async handleView(row) {
      this.detailData = await getArticleDetail(row._id)
      this.visible = true
    }
  },

  created() {
    this.handleList()
  }
}
</script>

<style lang="scss" scoped>
.ad-article-list {
  .ad-article__title {
    text-align: center;
    margin-bottom: 50px;
  }
  .ad-article-dialog {
    .ad-dialog__title {
      text-align: center;
    }
    .ad-dialog__description {
      color: #999;
      margin: 20px 0;
      text-align: center;
    }
    .ad-dialog__image {
      display: block;
      width: auto;
      height: 200px;
      margin: 0 auto 30px;
    }
    .ad-dialog__footer {
      color: #999;
      margin-top: 30px;
      padding-top: 10px;
      border-top: 2px solid #f9f9f9;
    }
  }
}
</style>