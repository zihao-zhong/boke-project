<template>
  <main class="ad-category-list">
    <h1 class="ad-category__title">分类列表</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="_id" label="ID"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime | filterDate }}            
        </template>
      </el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column width="150px" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>

<script>
import { getCategoryList, removeCategory } from '@api/category'
export default {
  name: 'CategoryList',

  data() {
    return {
      tableData: []
    }
  },

  methods: {
    async handleList() {
      const data = await getCategoryList()
      this.tableData = data
    },
    async handleDelete(row) {
      const res = await removeCategory(row._id)
      this.$message.success(res.message)
      this.handleList()
    }
  },

  created() {
    this.handleList()
  }
}
</script>

<style lang="scss" scoped>
.ad-category-list {
  .ad-category__title {
    text-align: center;
    margin-bottom: 50px;
  }
}
</style>