<script>
  import Nav from "../components/nav.svelte";
  import Footer from "../components/footer.svelte";
</script>

<div class="mx-auto max-w-6xl p-8">
  <Nav />
  <slot />
  <Footer />
</div>

<style>
  @import "../app.css";
</style>
