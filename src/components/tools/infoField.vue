<template>
  <div class="page" v-if="Object.keys(data).length > 0">
      <el-card  v-for="(item, index) in realData" :key="index">
        <div slot="header" class="clearfix search-header">
          <span>{{item.title}}</span>
        </div>
        <el-form label-width="120px" v-if = "content[index].content">
          <el-col :span="spans" v-for="(v, i) in content[index].content" :key="i">
            <!--如果是html文本 -->
            <el-form-item
              :label="v.label"
              v-if="content[index].parentBox? data[content[index].parentBox][v.prop] : data[v.prop]"
            >
              <p v-if="v.type === 'html'" v-html="content[index].parentBox? data[content[index].parentBox][v.prop] : data[v.prop]">
                {{content[index].parentBox? data[content[index].parentBox][v.prop] : data[v.prop]}}
              </p>
              <img v-else-if="v.type === 'img'" :src="content[index].parentBox? data[content[index].parentBox][v.prop] : data[v.prop]" alt="">
              <span v-else>{{content[index].parentBox? data[content[index].parentBox][v.prop] : data[v.prop] | filter(v.filter, v.filterProps)}}</span>
            </el-form-item>
          </el-col>
        </el-form>
        <div v-if="item.title === '子任务信息'">
          <task-list></task-list>
        </div>
      </el-card>
  </div>
</template>
<script>
import taskList from '@/components/order/taskList'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    equipartition: {
      type: Number,
      required: true,
      default: 4
    },
    data: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    content: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      spans: 6,
      editableTabsValue: '0',
      showMyField: true
    }
  },
  computed: {
    realData() {
      return this.content.map(item => {
        console.log(item)
        return item
      })
    }
  },
  methods: {
    handleClick() {
      this.showMyField = !this.showMyField
    }
  },
  mounted() {
    if (this.equipartition === 4) {
      this.spans = 6
    } else {
      this.spans = 8
    }
  },
  components: {
    taskList
  }
}
</script>

<style lang="less" scoped>
.tabs{
  margin-top: 30px;
}
.page-content img{
  width: 150px;
  height: 150px;
  margin-right: 20px;
  float: left;
}
.preview{
  max-width: 300px;
  margin-left: 15px;
}
.el-card{
  margin-bottom: 20px;
}
</style>
