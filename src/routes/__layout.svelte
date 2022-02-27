<script>
  import Nav from "../components/nav.svelte";
  import Footer from "../components/footer.svelte";
</script>

<div class="p-8 max-w-6xl mx-auto">
  <Nav />
  <slot />
  <Footer />
</div>

<style>
  @import "../app.css";
</style>
