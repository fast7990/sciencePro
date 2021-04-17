<template>
  <el-date-picker
    v-model="time"
    :type="type"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :default-time="['00:00:00','23:59:59']"
    format="yyyy-MM-dd"
    value-format="yyyy-MM-dd HH:mm:ss"
    :align="align"
    :unlink-panels="panels"
    :picker-options="pickerOptions"
    @change="handleChange"
  ></el-date-picker>
</template>
<script>
export default {
  data() {
    return {
      time: '',
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setHours(0, 0, 0, 0);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const start = new Date();
            start.setHours(24, 0, 0, 0)
            start.setTime(start.getTime() - 24 * 60 * 60 * 1000 * 2);
            const end = new Date()
            end.setHours(23, 59, 59)
            end.setTime(end.getTime() - 24 * 60 * 60 * 1000)
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  props: {
    type: {
      type: String,
      required: true,
      default: ''
    },
    align: {
      type: String,
      required: true,
      default: 'right'
    },
    panels: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    },
    defaultTime: {
      type: Array,
      required: false,
      default() {
        return new Array('')
      }
    }
  },
  mounted() {
    if (this.defaultTime.length >= 2) {
      this.time = this.defaultTime
    }
  },
  methods: {
    handleChange(time) {
      this.$emit('handleChange', time)
    }
  }

}
</script>
