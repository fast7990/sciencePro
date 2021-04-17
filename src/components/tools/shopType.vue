<template>
  <el-row>
    <el-form label-width="120px">
      <el-col :span="8">
        <el-form-item :label="!isEqt ? '服务类目：' : '实物商品类目：'" class="changeBox">
          <el-select class="sle1" @change="oneChange" v-model="one" placeholder="请选择" clearable>
            <el-option v-for="item in oneBox" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-select class="sle1" v-model="two" @change="twoChange" placeholder="请选择" clearable>
          <el-option v-for="item in twoBox" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select class="sle1" v-model="three" @change="threeChange" placeholder="请选择" clearable>
          <el-option v-for="item in threeBox" :key="item.id" :label="item.name" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button v-if='isShow' @click='addType'>添加</el-button>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
import { productApi, orderApi } from '@/api'
export default {
  data() {
    return {
      typeTree: [],
      one: null,
      oneBox: [],
      two: null,
      twoBox: [],
      three: null,
      result: null,
      threeBox: []
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default () {
        return true
      }
    },
    isEqt: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  mounted() {
    this.getTypeTree();
  },
  methods: {
    // 添加类目
    clearSearch() {
      this.one = null
      this.two = null
      this.three = null
    },
    addType () {
      if (this.result !== null) {
        this.$emit('typeChange', this.result)
      }
    },
    oneChange() {
      this.three = null
      this.two = null
      this.oneBox.forEach(val => {
        if (val.id === this.one) {
          this.twoBox = val.child;
        }
      });
      this.$emit('ThreeChange', {
        one: this.one,
        two: this.two,
        three: this.three
      })
    },
    twoChange() {
      // this.three = null
      this.twoBox.forEach(val => {
        if (val.id === this.two) {
          this.threeBox = val.child;
        }
      });
      this.$emit('ThreeChange', {
        one: this.one,
        two: this.two,
        three: this.three
      })
    },
    threeChange (val) {
      this.result = this.three
      this.three = this.three.name
      this.$emit('ThreeChange', {
        one: this.one,
        two: this.two,
        three: this.result.id
      })
    },
    // 获取目录树
    async getTypeTree() {
      let params = {
        bizParam: {
          enable: 1,
          isProduct: null,
          parentId: 0,
          displayStatuss: [0, 2]
        },
        id: 0,
        ip: 'string'
      }
      let params2 = {
        banner: null,
        contentDesc: null,
        createTime: null,
        creator: null,
        enable: null,
        id: null,
        image: null,
        isParent: null,
        isProduct: null,
        modifier: null,
        modifyTime: null,
        name: null,
        parentId: 0,
        reminderCycle: null,
        sort: null
      }
      try {
        let data
        if (this.isEqt) {
          data = (await orderApi.getEqtTree(params2)).data
        } else {
          data = (await productApi.queryCategoriesTree(params)).data
        }
        if (data.statusCode === 200) {
          this.oneBox = data.data
        }
      } catch (err) {
        console.error(err)
      } finally {

      }
    }
  }
};
</script>

