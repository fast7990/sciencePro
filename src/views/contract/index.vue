<template>
    <div class="page">
        <serchFiled>
          <el-form label-width="120px">
              <el-row>
          <el-col :span="2" :offset="1"><el-button type="primary">添加</el-button></el-col>
          <el-col :span="2" :offset="1"><el-button type="primary">导出列表</el-button></el-col>
        </el-row>
        <el-row :gutter="24">
          <div class="demo-input-suffix">
          <el-col :span="6" :offset="14"> 
          <el-input
             placeholder="请输入内容"
             prefix-icon="el-icon-search"
        >
         </el-input>
          </el-col>
          </div>
          <el-col :span="4"><el-button type="primary">高级搜索</el-button></el-col>
      </el-row>
          </el-form>
        </serchFiled>
      <div class="page-content">
            <el-table
        :data="tableData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="合同编号" />
        <el-table-column prop="pv" label="合同名称" />
        <el-table-column prop="key" label="合同金额" />
        <el-table-column prop="key" label="合同签署日期" />
        <el-table-column prop="key" label="合同已付款金额" />
        <el-table-column prop="key" label="合同待付款金额" />
        <el-table-column prop="key" label="合同待付款比例" />
        <el-table-column prop="key" label="合同状态" />
        <el-table-column prop="key" label="项目名称" />
        <el-table-column prop="key" label="项目所处阶段" />
      </el-table>
      <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getData"
    />
      </div>
    </div>
</template>
<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import serchFiled from '@tool/searchField'
export default {
    data(){
        return {
            tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
            tableData:[],
            listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
        }
    },
    methods:{
        // 获取表格数据
     getData(){
      
     }
    },
    components:{Pagination,serchFiled}
}
</script>
<style scoped>
.search_btn{
    float: right;
}

</style>