<template>
  <HeaderComponent></HeaderComponent>
  <div class="container m-5"></div>
  <div class="container">
    <div class="container mb-5 border">
      <h2>Sobre Extrair Sustentação Mensal</h2>
      <p>Testes</p>
      <p>Testes</p>
      <p>Testes</p>
      <p>Testes</p>
    </div>
    <div class="container mt-4 border">
      <h2>Sobre Configurações</h2>
      <p>Testes</p>
      <p>Testes</p>
      <p>Testes</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default defineComponent({
  name: "HomeComponent",
  components: { HeaderComponent },
});
</script>
