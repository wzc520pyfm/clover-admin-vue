<template>
  <div class="h-full">
    <el-card shadow="never" class="h-full" header="基础表单验证">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        :size="formSize"
        status-icon
      >
        <el-form-item label="Activity name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Activity zone" prop="region">
          <el-select v-model="ruleForm.region" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
            <el-option label="Zone three" value="hangzhou" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity count" prop="count">
          <el-select-v2 v-model="ruleForm.count" placeholder="Activity count" :options="options" />
        </el-form-item>
        <el-form-item label="Activity time" required>
          <el-col :span="8">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="ruleForm.date1"
                type="date"
                label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="8">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="date2">
              <el-time-picker
                v-model="ruleForm.date2"
                label="Pick a time"
                placeholder="Pick a time"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery" prop="delivery">
          <el-switch v-model="ruleForm.delivery" />
        </el-form-item>
        <el-form-item label="Activity type" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="Online activities" name="type" />
            <el-checkbox label="Promotion activities" name="type" />
            <el-checkbox label="Offline activities" name="type" />
            <el-checkbox label="Simple brand exposure" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="Sponsorship" />
            <el-radio label="Venue" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity form" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="Activity object" prop="obj">
          <el-input
            v-model="ruleForm.obj"
            type="textarea"
            placeholder="Enter an object that contains city properties"
          />
        </el-form-item>
        <el-form-item label="Activity theme" prop="theme">
          <el-input v-model="ruleForm.theme" placeholder="Space is considered an error" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
      <web-site-link label="更多用法见: " link="https://github.com/yiminghe/async-validator" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

defineOptions({ name: "BaseValidatorForm" });

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "Hello",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
  obj: "",
  theme: "",
});

const rules = reactive<FormRules>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
    // { len: 5, message: "Length should be 5", trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
    {
      type: "enum",
      enum: ["shanghai", "beijing"],
      message: "Please select one or two",
      trigger: "change",
    },
  ],
  count: [
    {
      required: true,
      message: "Please select Activity count",
      trigger: "change",
    },
  ],
  date1: [
    {
      type: "date",
      required: true,
      message: "Please pick a date",
      trigger: "change",
    },
  ],
  date2: [
    {
      type: "date",
      required: true,
      message: "Please pick a time",
      trigger: "change",
    },
  ],
  type: [
    {
      type: "array",
      required: true,
      defaultField: {
        type: "enum",
        enum: ["Online activities", "Promotion activities"],
        message: "Activity type must be Online or Promotion",
      },
      message: "Please select at least one activity type",
      trigger: "change",
    },
  ],
  resource: [
    {
      required: true,
      message: "Please select activity resource",
      trigger: "change",
    },
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" },
    {
      type: "string",
      pattern: /^[a-zA-Z]+$/, // 只允许输入字母
      // 先对值进行转换再进行验证(不会影响原有值)
      transform(value) {
        return value.trim();
      },
      message: "Please only input word",
      trigger: "blur",
    },
  ],
  obj: [
    {
      type: "object",
      fields: {
        city: { type: "string", required: true },
        street: { type: "string" },
        // 0: { type: "string", required: true }, // 对于array, 则通过索引指定规则
      },
      transform(value) {
        return JSON.parse(value);
      },
    },
  ],
  theme: [
    {
      type: "string",
      required: true,
      whitespace: true, // 将空格视为错误输入
      message: "Please input activity theme",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!", ruleForm);
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-no-divider();
}
</style>
