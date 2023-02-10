<template>
  <div class="h-full">
    <el-card shadow="never" class="h-full" header="采用责任链模式的表单校验">
      <pre>
        游戏规则:
         1. 狼堡当中灰太狼必须出战
         2. 懒羊羊十分胆小, 它出战必须满足以下条件
            1. 喜羊羊出战
            2. 沸羊羊出战
            3. 慢羊羊必须拿出秘密武器
            4. 红太狼未出战
         3. 当懒羊羊参战且西瓜太狼未参战时, 羊群在白天能够战胜狼群
         4. 夜晚羊群一定被会抓
         5. 如果西瓜太狼参战, 羊群必被抓
      </pre>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="时间" prop="time">
          <el-radio-group v-model="ruleForm.time">
            <el-radio label="day">白天</el-radio>
            <el-radio label="night">夜晚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="喜羊羊" prop="xiSheep">
          <el-select v-model="ruleForm.xiSheep" placeholder="选择是否出战">
            <el-option label="逃跑" value="flee" />
            <el-option label="出战" value="fight" />
          </el-select>
        </el-form-item>
        <el-form-item label="沸羊羊" prop="feiSheep">
          <el-select v-model="ruleForm.feiSheep" placeholder="选择是否出战">
            <el-option label="逃跑" value="flee" />
            <el-option label="出战" value="fight" />
          </el-select>
        </el-form-item>
        <el-form-item label="慢羊羊" prop="slowSheep">
          <el-select v-model="ruleForm.slowSheep" placeholder="选择是否出战">
            <el-option label="逃跑" value="flee" />
            <el-option label="拐杖" value="walkingStick" />
            <el-option label="秘密武器" value="secretWeapon" />
          </el-select>
        </el-form-item>
        <el-form-item label="懒羊羊" prop="lazySheep">
          <el-select v-model="ruleForm.lazySheep" placeholder="选择是否出战">
            <el-option label="逃跑" value="flee" />
            <el-option label="出战" value="fight" :disabled="!canLazySheepFight" />
          </el-select>
        </el-form-item>
        <el-form-item label="狼堡出战" prop="wolf">
          <el-checkbox-group v-model="ruleForm.wolf">
            <el-checkbox label="greyWolf" name="wolf">灰太狼</el-checkbox>
            <el-checkbox label="redWolf" name="wolf">红太狼</el-checkbox>
            <el-checkbox label="smallWolf" name="wolf">小灰灰</el-checkbox>
            <el-checkbox label="bananaWolf" name="wolf">蕉太狼</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="西瓜太狼参战" prop="isWatermelonWar">
          <el-switch v-model="ruleForm.isWatermelonWar" />
        </el-form-item>
      </el-form>
      <el-button type="danger" @click="fight">开战</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { CustomChain, ResponsibilitiesChainBooleanNode, ResponsibilitiesChainNode } from "@/utils";

defineOptions({ name: "ResponsibilityValidatorForm" });

interface RuleForm {
  time: string;
  xiSheep: string;
  feiSheep: string;
  slowSheep: string;
  lazySheep: string;
  wolf: string[];
  isWatermelonWar: boolean;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm: RuleForm = reactive({
  time: "",
  xiSheep: "",
  feiSheep: "",
  slowSheep: "",
  lazySheep: "",
  wolf: [],
  isWatermelonWar: false,
});
const canLazySheepFight = computed(() => {
  return (
    ruleForm.xiSheep === "fight" &&
    ruleForm.feiSheep === "fight" &&
    ruleForm.slowSheep === "secretWeapon" &&
    !ruleForm.wolf.includes("redWolf")
  );
});

const rules = reactive<FormRules>({
  time: [{ required: true, message: "请选择战斗时间", trigger: "change" }],
  xiSheep: [{ required: true, message: "请选择是否出战", trigger: "blur" }],
  feiSheep: [{ required: true, message: "请选择是否出战", trigger: "blur" }],
  slowSheep: [{ required: true, message: "请选择是否出战", trigger: "blur" }],
  lazySheep: [{ required: true, message: "请选择是否出战", trigger: "blur" }],
  wolf: [{ validator: validateWolf, trigger: "change" }],
});

async function fight() {
  const validate = await ruleFormRef.value?.validate();
  if (!validate) return;
  // 狼群获胜检查链
  const wolfWinChain = new CustomChain();
  // 西瓜太狼参战
  const hasWatermelonNode = new ResponsibilitiesChainBooleanNode(() => ruleForm.isWatermelonWar);
  // 夜晚
  const nightNode = new ResponsibilitiesChainBooleanNode(() => ruleForm.time === "night");
  // 懒羊羊逃跑
  const lazySheepFleeNode = new ResponsibilitiesChainBooleanNode(
    () => ruleForm.lazySheep === "flee"
  );
  // 向检查链添加检查节点(有序)
  wolfWinChain.append(hasWatermelonNode);
  wolfWinChain.append(nightNode);
  wolfWinChain.append(lazySheepFleeNode);
  // 检查狼群能否获胜
  const canWolfWin = wolfWinChain.execute();
  if (canWolfWin) {
    window.$message?.error("狼群获胜");
  } else {
    window.$message?.success("羊群获胜");
  }
}

function validateWolf(rule: any, value: any, callback: any) {
  const validateChain = new CustomChain();
  const lengthNode = new ResponsibilitiesChainNode(
    () => value.length > 0,
    null,
    () => callback(new Error("至少一只狼出战"))
  );
  const greyWolfNode = new ResponsibilitiesChainNode(
    () => value.includes("greyWolf"),
    null,
    () => callback(new Error("灰太狼必须出战"))
  );
  validateChain.append(lengthNode);
  validateChain.append(greyWolfNode);
  validateChain.executeAll();
  callback();
  // if (value.length === 0) {
  //   callback(new Error("至少一只狼出战"));
  // } else if (!value.includes("greyWolf")) {
  //   callback(new Error("灰太狼必须出战"));
  // } else {
  //   callback();
  // }
}
</script>

<style lang="less" scoped>
.el-card {
  #ep.el-card-no-divider();
}
</style>
