<template>
  <div>
    <div class="button-field" v-if="position === 'btnField'">
      <el-button
        v-for="(item, index) in authButton.btnField"
        :key="index"
        :type="item.type"
        :size="item.size"
        @click="handleClick(item)"
      >{{item.label}}</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      time: null,
      checkList: [],
      configList: [],
    }
  },
  props: {
    position: {
      type: String,
      required: true,
      default: 'list'
    }
  },
  computed: {
    ...mapGetters(['authButton'])
  },
  methods: {
    // 获取配置
    handleClick(item) {
      this.$emit('handleButton', item)
    }
  }
}

</script>
