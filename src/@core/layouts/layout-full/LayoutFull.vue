<template>
  <div :class="contentWidth === 'boxed' ? 'container p-0' : null">
    <div class="mt-1 ml-2">
      <back-button></back-button>
    </div>
    <router-view />
  </div>
</template>

<script>
import useAppConfig from '@core/app-config/useAppConfig'
import BackButton from '@core/components/back-button/BackButton'
export default {
  setup() {
    const { contentWidth } = useAppConfig()
    return { contentWidth }
  },
  components: {
    BackButton,
  }
}
</script>
