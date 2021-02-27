<script>
import router from "@/router";
export default {
  setup() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      router.push("/dashboard");
    } else {
      router.push("/home");
    }
  },
};
</script>