<script setup lang="ts">

const props = defineProps<{ title: string }>()

</script>

<template>
  <div class="card">
    <div class="logo">
      <slot></slot>
    </div>
    <div class="title">{{ props.title }}</div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-items: center;
  flex-direction: column;
  height: auto;
  padding: 2rem;
  cursor: pointer;
  transition: all .3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }

  .logo {
    background-color: #fafafa;
    border: 1px solid #ccc;
    border-radius: 25%;
    padding: 0.1rem;
    box-shadow: 2px 2px 6px 0px rgba(163, 161, 161, 0.3);
    max-width: 6rem;
    max-height: 6rem;
  }

  .title {
    font-size: 1.6rem;
    margin-top: 0.25rem;
    user-select: none;
  }
}
</style>
