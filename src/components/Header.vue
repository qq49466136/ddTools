<script setup lang="ts" name="Header">
import { useMessage } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { NPageHeader, NSpace, NDropdown, NButton } from 'naive-ui'
import { ref } from 'vue';
const router = useRouter()
const route = useRoute()
const message = useMessage()
const handleBack = () => {

  if (route.path !== '/') {
    router.back()
  } else {
    message.info('已经是首页啦')
  }
}
const count = ref(1);
const options = [
  {
    label: '没啥用',
    key: 'nothing',
    props: {
      onClick: () => {
        message.success(`没用+${count.value}`)
        count.value++;
      }
    }
  }
]
</script>

<template>
  <n-page-header subtitle="与人方便，与己方便" @back="handleBack">

    <template #title>
      <p style="text-decoration: none; color: inherit;font-size: 1.25em" @click="router.push('/')">ddTools</p>
    </template>
    <template #extra>
      <n-space>
        <n-dropdown :options="options" placement="bottom-start">
          <n-button :bordered="false" style="padding: 0 4px">
            我是个没用的按钮😰
          </n-button>
        </n-dropdown>
      </n-space>
    </template>
  </n-page-header>
</template>

<style scoped></style>