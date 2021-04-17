<template>
  <div class="page">
      <el-card class="search-card" :body-style="{ padding: 0 }">
        <div slot="header" class="clearfix search-header" @click="handleClick">
          <span>{{title}}</span>
          <i class="icon el-icon-minus" v-if="showMyField"></i>
          <i class="icon el-icon-plus" v-else></i>
        </div>
        <slot name="nohide"></slot>
        <el-collapse-transition>
          <div v-show="showMyField">
            <div class="body"> <!-- To fix element collapse transition bug. -->
              <slot>
                <el-form label-width="120px">
                  <el-col v-for="(item, index) in realData" :key="index" :span="item.span || spans">
                    <!--如果是html文本 -->
                    <el-form-item
                      :label="item.label"
                    >
                      <p v-if="item.type === 'html'" v-html="data[item.prop]">
                        {{data[item.prop]}}
                      </p>
                      <img v-else-if="item.type === 'img'" :src="data[item.prop]" alt="">
                      <span v-else-if="item.type === 'func'"><span>{{item.computed}}</span></span>
                      <span v-else>{{data[item.prop] | filter(item.filter, item.filterProps)}}</span>
                    </el-form-item>
                  </el-col>
                </el-form>
              </slot>
              <slot name="assembly"></slot>
            </div>
          </div>
        </el-collapse-transition>
      </el-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    showMyField: true,
    spans: 6,
    editableTabsValue: '0'
  }),
  props: {
    title: {
      type: String,
      default: '详情信息'
    },
    equipartition: {
      type: Number,
      required: false,
      default: 4
    },
    data: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    content: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  },
  computed: {
    realData() {
      return this.content.filter(item => {
        return item.show === undefined || item.show === true
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
  }
}
</script>

<style lang="stylus" scoped>
.tabs
  margin-top 30px
.page-content
  img
    width 150px
    height 150px
    margin-right 20px
    float left
.preview
  max-width 300px
  margin-left 15px
.el-card
  margin-bottom 20px
</style>
