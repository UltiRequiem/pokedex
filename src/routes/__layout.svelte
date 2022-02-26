<script>
  import Nav from "../components/nav.svelte";
</script>

<div class="p-8 max-w-6xl mx-auto">
  <Nav />
  <slot />
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }
</style>
