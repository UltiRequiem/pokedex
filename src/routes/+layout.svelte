<script lang="ts">
  import "../app.css";
  import Nav from "#lib/components/nav.svelte";
  import Footer from "#lib/components/footer.svelte";

  let { children } = $props();
</script>

<div class="mx-auto max-w-6xl p-8">
  <Nav />
  {@render children()}
  <Footer />
</div>
