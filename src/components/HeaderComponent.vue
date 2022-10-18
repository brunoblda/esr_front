<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">
              Extrair_Sustentações_Mensais
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about"
              >Configurações</router-link
            >
          </li>
        </ul>
        <button class="btn btn-danger" type="submit">Encerrar sessão</button>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderComponent",
});
</script>

<style>
.centralizar {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
