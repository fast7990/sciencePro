<template>
    <div class='page'>
       
      <el-form label-width="120px">
        <el-row :gutter="20">
          <el-col :span="2" :offset="2"><el-button type="primary">主要按钮</el-button></el-col>
          <el-col :span="6" :offset="2"><el-button type="primary">主要按钮</el-button></el-col>
        </el-row>
      <el-row :gutter="24">
          <el-col :span="6" :offset="14"> <el-input
             placeholder="请输入内容"
            v-model="input3">
           <i slot="suffix" class="el-icon-search"></i>
  </el-input></el-col>
          <el-col :span="4"><el-button type="primary">主要按钮</el-button></el-col>
      </el-row>
      </el-form>   
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
     getData(){

     }
    },
    components:{}
}
</script>
<style scoped>
.search_btn{
    float: right;
}

</style>