<script lang="ts">
  import { resolve } from "$app/paths";
</script>

<nav class="flex w-full justify-center">
  <a class="mx-4 text-lg" href={resolve("/")}>Home</a>
  <a class="mx-4 text-lg" href={resolve("/about")}>About</a>
</nav>
