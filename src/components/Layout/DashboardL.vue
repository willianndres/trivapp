<template>
  <div class="container">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
export default {
  components: {
    Footer,
    Header,
  },
};
</script>