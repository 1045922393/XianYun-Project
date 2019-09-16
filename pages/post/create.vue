<template>
  <div class="create">
    <!--编辑区-->
    <div class="content-editor">
      <editor />
    </div>

    <!--草稿区-->
    <div class="draft">
      <draft />
    </div>
  </div>
</template>

<script>
import editor from "@/components/post/editor.vue"
import draft from "@/components/post/draft.vue"
export default {
  components: {
    editor,
    draft
  }
}
</script>

<style lang="less">
.create {
  padding: 20px 0;
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
</style>