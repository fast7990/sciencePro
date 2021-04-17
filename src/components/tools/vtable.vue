<template>
  <div class="table-container">
    <el-table
      ref="table"
      :data="paginationData"
      :border="border"
      :stripe="stripe"
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @expand-change="handleExpandChange"
      @clearSelection="clearSelection"
      @cell-dblclick="toDetail"
      :row-key="getRowKey"
      :expand-row-keys="expands"
      :class="noSelectAll ? 'no-select-all' : ''"
    >
      <el-table-column type="expand" :key="slotKey" v-if="innerTable" :label="expandData.label" :width="expandData.width">
        <slot name="innerTable"></slot>
      </el-table-column>
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
        align="center"
      >
      </el-table-column>
      <el-table-column
        v-for="(column, index) in operateColumns"
        :prop="column.key"
        :label="column.label"
        :width="column.width"
        :sortable="column.sortable"
        :key="index"
        :align="column.align || 'center'"
        :show-overflow-tooltip="column.showOverflowTooltip"
      >
        <el-table-column
          v-if="column.type === 'multi_header'"
          v-for="(item, index) in column.children"
          :prop="item.key"
          :label="item.label"
          :width="item.width"
          :sortable="item.sortable"
          :key="index"
          :align="item.align || 'center'"
        >
          <template slot-scope="scope">
            <span>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
        <template slot-scope="scope">
          <img style="cursor: pointer;" title="点击预览" v-if="column.type === 'image'" :src="scope.row[column.key]" :alt="scope.row[column.key]" @click="previewImg(scope.row[column.key])">
          <div class="action-con" v-else-if="column.type === 'action'">
            <!-- selectButton 表明不需要展示所有的表单按钮 -->
            <!-- 通过配置data里的btnList字段来控制 -->
            <el-button
              v-for="button in column.buttonInfos"
              v-if="column.selectButton ? scope.row.btnList.some((item) => {return item === button.name}) : true"
              :key="button.name"
              size="small"
              type="text"
              :class="[column.multiActions ? 'multi-actions' : '']"
              @click="handleButtonClick(button.name, scope.row, scope.$index)">{{ button.label }}</el-button>
          </div>
          <my-render v-else-if="column.type === 'render'" :row="scope.row" :render="column.render"></my-render>
          <div v-else-if="column.type === 'url'">
            <span v-if="!scope.row[column.key]">无</span>
            <router-link class="url-a"  v-else :to="{path: column.link, query: {bill_id: scope.row[column.link_name]} }">{{scope.row[column.link_name] || '跳转链接'}}</router-link>
          </div>
          <div v-else-if="column.type === 'edit'">
            <el-input-number
              class="input-num"
              :controls="false"
              size="mini"
              v-model="scope.row[column.key]"
              :disabled="scope.row.status === 1"
              ></el-input-number>
          </div>
          <span v-else-if="column.type === 'html'" v-html="scope.row[column.key]"></span>
          <el-input
            v-else-if="column.type === 'input'"
            :readonly="column.readonly"
            :type="column.inputType ? column.inputType : 'text'"
            @change="inputHandler($event, scope.row, column.key)"
            :value="scope.row[column.key]"></el-input>
          <div v-else-if="column.type === 'radio'">
            <el-radio @change.native="getTemplateRow(scope.row)" :label="scope.row.package_id || scope.row.rise_package_id" v-model="radio" class="textRadio">&nbsp;</el-radio>
          </div>
          <div v-else-if="column.type === 'poppover'">
            <el-popover
              v-if="scope.row[column.main_key]"
              placement="top-start"
              :title="column.label"
              width="300"
              trigger="hover"
              :content="scope.row[column.main_key]">
              <el-button slot="reference" v-html="column.key" type="primary" size="small"></el-button>
            </el-popover>
            <span v-else>-</span>
          </div>
          <span v-else-if="column.type === 'line_through'" :class="scope.row.isElide ? 'elide' : ''">{{ scope.row[column.key]}}</span>
          <span v-else>{{ scope.row[column.key] | filter(column.filter, column.filterProps) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="showPagination">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, sizes"
        :page-sizes="[5, 10, 20, 50, 100, 500, 1000]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="图片预览" width="40%" :visible.sync="showImgPreview" class="img-preview">
      <div class="image">
        <img :src="imgSrc">
      </div>
        <div slot="footer" class="search-button-container">
          <el-button type="primary" @click="showImgPreview = false">关闭</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ROW_SELECT, ROW_DATA } from '@/store/tableActions'
import MyRender from './my-render'

export default {
  props: {
    isBackPage: {
      type: Boolean,
      required: false,
      default: false
    },

    operatable: {
      type: Boolean,
      required: false,
      default: true
    },

    totalCount: {
      type: Number,
      required: false,
      default: 0
    },

    selection: {
      type: Boolean,
      required: false,
      default: false
    },

    noSelectAll: {
      type: Boolean,
      required: false,
      default: false
    },

    data: {
      type: Array,
      required: true,
      default: () => ([])
    },

    columns: {
      type: Array,
      required: true,
      default: () => ([])
    },

    border: {
      type: Boolean,
      required: false,
      default: true
    },

    stripe: {
      type: Boolean,
      required: false,
      default: true
    },

    defaultPageSize: {
      type: Number,
      required: false,
      default: 20
    },

    loading: {
      type: Boolean,
      required: false,
      default: false
    },

    showPagination: {
      type: Boolean,
      required: false,
      default: true
    },

    innerTable: {
      type: Boolean,
      required: false,
      default: false
    },

    expands: {
      type: Array,
      required: false,
      default: () => ([])
    },

    getRowKey: {
      type: Function,
      required: false,
      default: function () {}
    },

    expandData: {
      type: Object,
      required: false,
      default: () => ({})
    },

    isElide: {
      type: Boolean,
      required: false,
      default: false
    },

    slotKey: {
      type: Number,
      required: false,
    },
  },
  components: {
    MyRender
  },
  data() {
    return {
      currentPage: 1,
      pageSize: this.defaultPageSize,
      showImgPreview: false,
      imgSrc: '',
      radio: ''
    }
  },

  computed: {
    ...mapGetters(['authButton']),
    paginationData() {
      let tempData = []
      if (this.isBackPage) {
        tempData = this.data.map(curEle => {
          if (!curEle.btnList) {
            curEle.btnList = this.authButton.list.map(item => {
              return item.name
            })
          }
          return curEle
        })
      } else {
        let pageTotal = this.data.length,
          pageFirstCount = this.pageSize * (this.currentPage - 1),
          maxCount = pageTotal - pageFirstCount < this.pageSize ? pageTotal : (pageFirstCount + this.pageSize)

        for (let i = pageFirstCount; i < maxCount; i++) {
          tempData.push(this.data[i])
        }
      }
      return tempData
    },

    total: function () {
      return this.isBackPage ? this.totalCount : this.data.length
    },

    operateColumns() {
      return this.operatable ? this.columns.concat([{
        label: '操作',
        type: 'action',
        multiActions: true,
        selectButton: true,
        width: 150,
        buttonInfos: this.authButton.list
      }]) : this.columns
    }
  },

  methods: {
    ...mapActions([ROW_SELECT, ROW_DATA]),
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      if (this.isBackPage) {
        this.$emit('handleCurrentChange', currentPage)
      }
    },

    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      if (this.isBackPage) {
        this.$emit('handleSizeChange', pageSize)
      }
    },

    handleButtonClick(button, row, index) {
      this.ROW_DATA(row)
      this.$emit('buttonClick', {
        button: button,
        data: Object.assign({}, row),
        rowIndex: index
      })
    },

    handleSelectionChange(val) {
      this.ROW_SELECT(val) // save row info in an Array into vuex.state called `rowAction`
      this.$emit('selected', val, this.currentPage)
    },

    handleSelect(selection, row) {
      this.ROW_SELECT(selection)
      this.$emit('select', {
        selection,
        row
      })
    },

    handleSelectAll(selection) {
      this.$emit('selectAll', selection)
    },

    getTemplateRow(row) {
      this.ROW_SELECT([row])
    },
    // 清空选择
    clearSelection() {
      this.$refs.table.clearSelection()
    },

    handleExpandChange(row) {
      this.$emit('expandChange', row);
    },

    // 切换选择
    toggleRowSelection(row, status) {
      this.$refs.table.toggleRowSelection(row, status)
    },

    toDetail(row, column, cell, event) {
      this.ROW_DATA(row)
      this.$emit('toDetail', row)
    },

    inputHandler(val, row, column) {
      this.$emit('inputChange', {
        val,
        row,
        column
      })
    },

    previewImg(src) {
      this.imgSrc = src
      this.showImgPreview = true
    }
  }
}
</script>

<style lang="less">
.table-container{
  .pagination {
    padding: 20px 0 0;
    text-align: right;
  }
  .action-con {
    text-align: center;
  }
  .multi-actions {
    margin: 0 0 5px 10px;
  }
  .image{
    text-align: center;
  }
  .url-a{
    color: #409EFF;
    text-decoration: underline;
  }
  .input-num {
    text-align: center;
    width: 50px;
  }
  .elide {
    text-decoration: line-through;
  }
}
.no-select-all{
  thead th .el-checkbox__input{
    display: none;
  }
}
</style>
