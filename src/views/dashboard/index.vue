<template>
  <div class="dashboard-container">
    <div class="dashboard-text">仪表盘，<br>放一些统计信息...</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
&-container {
margin: 30px;
}
&-text {
font-size: 30px;
line-height: 46px;
}
}
</style>
