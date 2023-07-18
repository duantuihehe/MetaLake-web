<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>



<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/meta">元数据管理</RouterLink>
        <RouterLink to="/dataIntegration">数据接入</RouterLink>
        <RouterLink to="/dataModel">模型管理</RouterLink>
        <RouterLink to="/bi">bi展示</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}


/* nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 0rem;
  } */

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  left: 0rem;
  margin-top: 1rem;
  border-left: 3px solid var(--color-border);
}

/**控制第一个元素 */
/* nav a:first-of-type {
    border: 0;
  } */

@media (min-width: 1024px) {
  header {
      display: flex;
      place-items:stretch;
      padding-right: calc(var(--section-gap) / 2);
    }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .wrapper nav {
    text-align: left;
    margin-left: 0rem;
    font-size: 2rem;
    padding: 0 20rem 4rem 1rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
  }

}
</style>