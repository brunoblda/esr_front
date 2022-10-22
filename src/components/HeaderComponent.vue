<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand fs-2" to="/">Home</router-link>
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 px-3">
          <li class="nav-item px-3">
            <router-link
              class="nav-link text-primary fs-3"
              aria-current="page"
              to="/"
            >
              Extrair Sustentação Mensal
            </router-link>
          </li>
          <li class="nav-item px-3">
            <router-link class="nav-link text-dark fs-3" to="/about"
              >Configurações</router-link
            >
          </li>
        </ul>
        <router-link to="/login" custom v-slot="{ navigate }">
          <button
            @click="
              navigate();
              click();
            "
            class="btn btn-danger fs-5"
            type="submit"
          >
            Encerrar sessão
          </button>
        </router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HeaderComponent",
  setup() {
    const store = useStore();

    const click = () => {
      store.commit("login/logout");
    };
    return {
      click,
    };
  },
});
</script>

<style>
.centralizar {
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
