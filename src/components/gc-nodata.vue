<template>
  <div :style="{ height:noData ? '40vh': '' }" class="no-datas">
    <svg class="mb20" width="165" height="88" viewBox="0 0 165 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="72.4141" width="45.631" height="60" fill="#E5E5E5" />
      <path d="M61.1724 7H94.8997L106.803 18.5V67H61.1724V7Z" fill="#CCCCCC" />
      <g opacity="0.8">
        <path d="M73.4062 27.8913H74.0481V55H73.4062V27.8913Z" fill="white" />
        <path d="M73.4062 43.4158C73.4062 43.4158 74.7702 42.0761 78.8621 42.0761C82.954 42.0761 85.682 44.7554 89.7739 44.7554C93.8658 44.7554 95.2298 43.4158 95.2298 43.4158V27.3397C95.2298 27.3397 93.8658 28.6793 89.7739 28.6793C85.682 28.6793 82.954 26 78.8621 26C74.7702 26 73.4062 27.3397 73.4062 27.3397V43.4158Z" fill="white" />
      </g>
      <path d="M106.638 18.5L94.7339 7V18.5H106.638Z" fill="white" />
      <ellipse cx="42.8207" cy="31.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="42.8207" cy="36.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="42.8207" cy="41.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="42.8207" cy="46.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="42.8207" cy="51.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="42.8207" cy="56.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="37.8607" cy="31.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="37.8607" cy="36.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="37.8607" cy="41.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="37.8607" cy="46.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="37.8607" cy="51.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="37.8607" cy="56.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="47.7807" cy="31.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="47.7807" cy="36.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="47.7807" cy="41.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="47.7807" cy="46.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="47.7807" cy="51.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="47.7807" cy="56.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="52.7406" cy="31.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="52.7406" cy="36.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="52.7406" cy="41.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="52.7406" cy="46.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="52.7406" cy="51.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="52.7406" cy="56.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="57.7001" cy="31.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="57.7001" cy="36.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="57.7001" cy="41.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="57.7001" cy="46.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="57.7001" cy="51.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <ellipse cx="57.7001" cy="56.5" rx="0.49599" ry="0.5" fill="#E5E5E5" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M165 88H0C19.5567 65.412 49.2513 51 82.5 51C115.749 51 145.443 65.412 165 88Z" fill="#F2F3F6" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M165 88H0C19.5567 65.412 49.2513 51 82.5 51C115.749 51 145.443 65.412 165 88Z" fill="url(#paint0_linear)" />
      <defs>
        <linearGradient id="paint0_linear" x1="89.4439" y1="81.5" x2="89.9479" y2="51.0001" gradientUnits="userSpaceOnUse">
          <stop stop-color="white" />
          <stop offset="1" stop-color="#F2F4F6" />
        </linearGradient>
      </defs>
    </svg>
    <template v-if="noDataText"> {{ noDataText }}</template>
    <!-- {{ $t('bigEvent.info.text99_3') }} -->
  </div>
</template>
<script>
export default {
  name: 'NoData',
  props: {
    noDataText: {
      type: String,
      default: ''
    },
    noData: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  created() {
  }

}
</script>
