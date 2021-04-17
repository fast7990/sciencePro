<template>
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClick">
    <el-tab-pane
      v-for="item in tabs.tabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      editableTabsValue: '',
    }
  },
  watch: {
    $route(to, from) {
      this.editableTabsValue = to.path
    }
  },
  computed: {
    ...mapGetters(['tabs'])
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs2.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      });
    },
    ...mapMutations({
      'deleteTabs': 'DELETE_TABS'
    }),
    removeTab(targetName) {
      let tabs = this.tabs.tabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push({
                path: nextTab.name
              })
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.deleteTabs(targetName)
    },
    handleClick(data) {
      this.$router.push({
        path: data.name
      })
      this.editableTabsValue = data.name
    }
  }
}
</script>
