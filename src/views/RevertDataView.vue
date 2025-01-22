<script setup lang="ts" name="RevertDataView">
import DynamicForm from "../components/DynamicForm.vue";
import { NScrollbar, NInput, NSpace, NRadioGroup, NRadio, NButton } from 'naive-ui';
import { ref } from "vue";
import { JsonListItem } from '../entitys/JsonListItem'

const executeType = ref(1);
const jsonText = ref('');
const replacer = (key: any, value: any) => {
    if (key === 'optionList' || key === 'optionValueType') {
        return undefined;
    }
    // 如果值是 null 或者是一个空字符串，则返回 undefined，这样它就不会被包含在最终的 JSON 字符串中
    if (value === null || value === '') {
        return undefined;
    }
    // 对于其他情况，返回该值（保持不变）
    return value;
}
const handleUpdateJson = (newJsonList:JsonListItem[]) => {
    jsonText.value = JSON.stringify(newJsonList, replacer, 2);
};
const DynamicFormRef = ref<InstanceType<typeof DynamicForm> | null>(null);
const revertData = () => {
    try {
        const parsedJson = JSON.parse(jsonText.value);
        if (DynamicFormRef.value) {
            DynamicFormRef.value.setFormData(parsedJson, executeType.value);
        }
    } catch (error) {
        console.error("Invalid JSON", error);
    }
}

</script>

<template>
    <div class="container">
        <n-scrollbar x-scrollable>
            <div class="content left">
                <n-input v-model:value="jsonText" type="textarea" placeholder="请输入json文本"
                    :autosize="{ minRows: 10, maxRows: 20 }" />
                <n-radio-group v-model:value="executeType" name="executeTypeGroup">
                    <n-space style="margin-top: 1em;">
                        <n-radio :value="1">dbutil请求结构体</n-radio>
                        <n-radio :value="2">dbutil响应结构体</n-radio>
                        <n-radio :value="3">dg请求入参</n-radio>
                    </n-space>
                </n-radio-group>
                <n-button style="margin-top: 1em;" @click="revertData" type="primary">解析</n-button>
            </div>
        </n-scrollbar>
        <n-scrollbar x-scrollable>
            <div class="content middle">
                <div>
                    <n-space vertical>
                        <DynamicForm ref="DynamicFormRef" @updatejson="handleUpdateJson"></DynamicForm>
                    </n-space>
                </div>
            </div>
        </n-scrollbar>
    </div>
</template>

<style scoped>
.container {
    height: 100%;
    margin-left: 10%;
    width: 80%;
    display: flex;
    flex-direction: row;
    overflow: auto;
}

.content {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    flex-shrink: 0;
    padding: 2em;

    &:hover {
        background-color: #f7f5f5;
    }
}
</style>