<template>
  <div class="fillContainer">
    <div>
      <el-form
        :inline="true"
        ref="add_data"
        :model="search_data"
      >
        <!-- 时间筛选 -->
        <el-form-item label="按照时间筛选:">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
          />
           - - 
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="search"
            @click="handleSearch()"
          >
            筛选
          </el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="view"
            v-if="user.identity === 'manager'"
            @click="handleAdd()"
          >
            添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableDate.length > 0"
        :data="tableDate"
        max-height="450"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="70"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          align="center"
          width="250"
        >
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon>
                <timer />
              </el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="describe"
          label="收支描述"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="incode"
          label="收入"
          align="center"
          width="170"
        >
          <template #default="scope">
            <span style="color:#00d053">{{ scope.row.incode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="expeend"
          label="支出"
          align="center"
          width="170"
        >
          <template #default="scope">
            <span style="color:#f56767">{{ scope.row.expeend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cash"
          label="账户现金"
          align="center"
          width="170"
        >
          <template #default="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="operation"
          align="center"
          label="操作"
          windth="180"
          v-if="user.identity === 'manager'"
        >
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-model:currentPage="pagination.page_index"
              v-model:page-size="pagination.page_size"
              :page-sizes="pagination.page_sizes"
              :layout="pagination.layout"
              :total="pagination.total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-col>
      </el-row>

    </div>
    <Dialog
      :dialog="dialog"
      :formData="formData"
      @update="getProfile"
    ></Dialog>
  </div>

</template>

<script>
import Dialog from "@/components/Dialog.vue";
export default {
  name: "FundList",
  data() {
    return {
      search_data:{
        startTime:"",
        endTime:""
      },
      filterTableData:[],

      pagination: {
        page_index: 1, // 当前位于哪页
        total: 0, //总数
        page_size: 5, //一页显示多少页
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", //翻页属性
      },
      tableDate: [],
      allTableData: [],
      formData: {
        type: "",
        describe: "",
        incode: "",
        expeend: "",
        cash: "",
        remark: "",
        id: "",
      },
      dialog: {
        show: false,
        title: "",
        option: "edit",
      },
    };
  },
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      const { data: res } = await this.$axios.get("/profile/users/get");
      this.allTableData = res.data;
      this.filterTableData = res.data
      // 设置分页数据
      this.setPaginatins();
    },
    setPaginatins() {
      // 分页属性设置
      this.pagination.total = this.allTableData.length;
      this.pagination.page_index = 1;
      this.pagination.page_size = 5;
      // 设置默认分类数据
      this.tableDate = this.allTableData.filter((item, index) => {
        return index < this.pagination.page_size;
      });
    },
    handleEdit(index, row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改",
        option: "edit",
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        incode: row.incode,
        expeend: row.expeend,
        cash: row.cash,
        remark: row.remark,
        id: row.id,
      };
    },
    handleDelete(index, row) {
      this.$axios.delete(`/profile/users/delete/${row.id}`).then((res) => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加",
        option: "add",
      };
      this.formData = {
        type: "",
        describe: "",
        incode: "",
        expeend: "",
        cash: "",
        remark: "",
        id: "",
      };
      this.dialog.show = true;
    },
    handleSizeChange(page_size) {
      // 切换size
      this.pagination.page_index = 1;
      this.pagination.page_size = page_size;
      // 设置默认分类数据
      this.tableDate = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // 获取当前页
      let index = this.pagination.page_size * (page - 1);
      // 数据的总数
      let nums = this.pagination.page_size * page;
      // 容器
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableDate = tables;
      }
    },
    // 筛选时间
    handleSearch(){
      if(!this.search_data.startTime || !this.search_data.endTime){
        this.$message({
          type:'warning',
          message:'请选择时间'
        })
        this.getProfile()
        return
      }
      const sTime = this.search_data.startTime.getTime()
      const eTime = this.search_data.endTime.getTime()

      this.allTableData = this.filterTableData.filter(item =>{
        let date = new Date(item.date)
        let time = date.getTime()
        return time >= sTime && time <= eTime
      })
      // 分页数据
      this.setPaginatins()
    }
  },
  components: { Dialog },
};
</script>

<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {

  margin-top: 10px;
}
</style>