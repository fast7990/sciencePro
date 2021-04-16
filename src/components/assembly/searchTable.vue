<template>
  <div class="jstree" @click="close">
    <div class="j_center" @click.stop>
      <div class="j_title el-tag--medium el-tag--dark">查看{{ searchType }}</div>
      <div class="j_box">
        <div class="j_search">
          <el-input
            type="text"
            v-model="userName"
            :placeholder="(searchType === '用户' ? '请输入用户手机号': ('请输入'+ searchType +'姓名'))"
            @keyup.enter.native="getData"
          ></el-input>
          <testCity v-if="searchType !== '用户'" @Citychange="Citychange" />
          <el-button type='primary' @click="getData">查询</el-button>
          <el-button type='primary' v-if="searchType === '供应商' && isShowAddSupply" @click="gotoAddSupplier">新增供应商</el-button>
        </div>
        <div class="j_list">
          <div class="j_table">
            <elCopyTable
              ref="table"
              :keyIndex="3"
              :tableHeader="tableHead"
              :tableData="serverBox"
              @sumbitData="sumbitData"
              :ajaxObj="ajaxObjItem"
              @currentChange="currentChange"
              @selectChange="selectChange"
              :isShowPage="isShowPage"
            />
          </div>
        </div>
      </div>
      <div class="j_submit">
        <el-button  @click="close">取消</el-button>
        <el-button type='primary'  @click="sumbit">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import elCopyTable from '@tool/elTable'
import testCity from '@tool/testCity'
export default {
  data () {
    return {
      ajaxObjItem: {},
      currenRow: [],
      tableHead: [],
      isShowPage: true,
      obj: {},
      cityId: null,
      userName: '',
      table: [],
      serverBox: [],
      hasCustomer: true
    }
  },
  props: {
    searchType: {
      type: String,
      default: ''
    },
    searchName: {
      type: String,
      default: ''
    },
    isShowAddSupply: {
      type: Boolean,
      default: false
    },
    supplier: {
      type: Array,
      default () {
        return []
      }
    },
    singleChose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 城市改变
    Citychange (city) {
      this.cityId = city.shi.code
    },
    // 选择
    currentChange (row) {
      // this.$emit('selectChange', row);
      this.currenRow = row
    },
    selectChange (row) {
      this.currenRow = row
    },

    // 获取数据
    sumbitData (data) {
      if (this.searchType === '用户') {
        this.serverBox = data
        this.hasCustomer = !!data.length
        this.$emit('hasMobile', this.hasCustomer)
      } else {
        this.serverBox = data.list
      }
    },
    // 去创建供应商
    gotoAddSupplier () {
      this.$router.push({
        path: '/SupplierAdmin/addSupplier',
        query: {
          backPage: '/downOrder'
        }
      })
    },
    // 查询历史
    getData () {
      if (this.searchType === '用户') {
        this.ajaxObjItem.data.mobile = this.userName
        // this.ajaxObjItem.data.receiverName = "";
      } else {
        this.ajaxObjItem.data.bizParam.name = this.userName
        this.ajaxObjItem.data.bizParam.cityId = this.cityId
      }
      if (this.$refs.table) {
        this.$refs.table.getData(1)
      } else {
        setTimeout(() => {
          this.$refs.table.getData(1)
        }, 20)
      }
    },
    clear () {
      this.id = null
      this.userName = ''
    },
    close (step) {
      this.$emit('close', step)
    },
    // 提交
    sumbit () {
      if (this.currenRow === null) {
        this.$message.error('请选择' + this.searchType)
        return
      }
      this.$emit('sumbit', this.currenRow, this.searchType)
      this.close()
    },
    // 初始化
    init () {
      if (this.searchType === '供应商') {
        this.ajaxObjItem.methods = 'post'
        this.ajaxObjItem.url = this.yh + '/merchant/queryList'
        this.ajaxObjItem.data = {
          bizParam: {
            category: 1,
            endDate: null,
            mobile: null,
            name: this.userName,
            pageIndex: 1,
            pageSize: 10,
            ids: this.supplier.join(','),
            startDate: null
          }
        }
        this.tableHead = [
          {
            type: 'selection'
          },
          {
            label: '供应商ID',
            value: 'id'
          },
          {
            label: '供应商名称',
            value: 'name'
          },
          {
            label: '供应商联系方式',
            value: 'mobile'
          }
        ]
        if (this.singleChose) {
          this.tableHead.splice(0, 1)
        }
      } else if (this.searchType === '服务商') {
        this.ajaxObjItem.methods = 'post'
        this.ajaxObjItem.url = this.yh + '/merchant/queryList'
        this.ajaxObjItem.data = {
          bizParam: {
            category: 0,
            endDate: null,
            mobile: null,
            name: this.userName,
            pageIndex: 1,
            pageSize: 10,
            startDate: null
          }
        }
        this.tableHead = [
          {
            type: 'selection'
          },
          {
            label: '服务商ID',
            value: 'id'
          },
          {
            label: '服务商名称',
            value: 'name'
          },
          {
            label: '服务商联系方式',
            value: 'mobile'
          }
        ]
        if (this.singleChose) {
          this.tableHead.splice(0, 1)
        }
      } else if (this.searchType === '管家平台') {
        this.ajaxObjItem.methods = 'post'
        this.ajaxObjItem.url = this.yh + '/merchant/queryList'
        this.ajaxObjItem.data = {
          bizParam: {
            category: 0,
            endDate: null,
            mobile: null,
            name: this.userName,
            pageIndex: 1,
            pageSize: 10,
            startDate: null
          }
        }
        this.tableHead = [
          {
            label: '商户ID',
            value: 'id'
          },
          {
            label: '商户名称',
            value: 'name'
          },
          {
            label: '商户联系方式',
            value: 'mobile'
          }
        ]
      } else {
        this.isShowPage = false
        this.ajaxObjItem.methods = 'get'
        this.ajaxObjItem.url = this.yh + '/user/bs/info'
        this.ajaxObjItem.data = {
          mobile: this.userName
        }
        this.tableHead = [
          {
            label: '联系人ID',
            value: 'userId'
          },
          {
            label: '会员姓名',
            value: 'userName'
          },
          {
            label: '联系人姓名',
            value: 'receiverName'
          },
          {
            label: '联系人手机号',
            value: 'receiverMobile'
          },
          {
            label: '联系人详细地址',
            value: 'receiverAddress'
          }
        ]
      }
      this.getData()
    }
  },
  created () {
    this.userName = this.searchName
    if (this.userName === null) {
      this.userName = ''
    }
    this.init()
  },
  components: {
    elCopyTable,
    testCity
  }
}
</script>

<style lang='stylus' scoped>
@import '../../assets/style/common.styl'
@import '../../assets/style/elTableCopy.styl'
rem(a)
  ((((a / 100rem))))
.jstree
  position fixed
  top 0%
  left 0%
  width 100%
  background-color rgba(0, 0, 0, 0.8)
  height 100%
  color black
  z-index 2500
  .j_center
    position absolute
    top 40%
    left 50%
    width rem(1200)
    min-height rem(564)
    transform translate(-50%, -50%)
    background-color #F0F0F0
    border-radius rem(5)
    .j_title
      height rem(70)
      line-height rem(70)
      padding-left rem(39)
      color white
      font-size rem(19)
    .j_box
      padding rem(24) rem(39)
      box-sizing border-box
      .j_search
        .el-input
          width rem(250)
      .j_list
        width 100%
        height rem(500)
        box-sizing border-box
        background-color white
        margin-top rem(5)
        overflow-y scroll
        overflow-x hidden
    .j_submit
      text-align center
      margin-bottom rem(10)
    .page
      text-align center
</style>
