<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      v-model="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal="false"
    >
      <div class="form">
        <el-form
          ref="formData"
          :model="formData"
          :rules="form_rules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item label="收支类型:">
            <el-select
              v-model="formData.type"
              placeholder="收支类型"
            >
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            prop='describe'
            label="收支描述:"
          >
            <el-input
              type="describe"
              v-model="formData.describe"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop='incode'
            label="收入:"
          >
            <el-input
              type="incode"
              v-model="formData.incode"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop='expeend'
            label="支出:"
          >
            <el-input
              type="expeend"
              v-model="formData.expeend"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop='cash'
            label="账户现金:"
          >
            <el-input
              type="cash"
              v-model="formData.cash"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input
              type="textarea"
              v-model="formData.remark"
            ></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button
              type="primary"
              @click='onSubmit("formData")'
            >提 交</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import qs from "qs";
export default {
  name: "Dialog",
  data() {
    return {
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账",
      ],
      form_rules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" },
        ],
        incode: [
          { required: true, message: "收入不能为空！", trigger: "blur" },
        ],
        expeend: [
          { required: true, message: "支出不能为空！", trigger: "blur" },
        ],
        cash: [{ required: true, message: "现金不能为空！", trigger: "blur" }],
      },
    };
  },
  props: {
    dialog: Object,
    formData: Object,
  },
  methods: {
    onSubmit(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          const url =
            this.dialog.option === "add" ? "add" : `edit/${this.formData.id}`;
          this.$axios
            .post(`/profile/users/${url}`, qs.stringify(this.formData))
            .then((res) => {
              // 操作成功
              this.$message({
                message: "保存成功！",
                type: "success",
              });
              this.dialog.show = false;
              this.$emit("update");
            });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>