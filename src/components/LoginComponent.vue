<template>
  <div class="LoginArea">
    <div class="LoginBox border">
      <div class="Cabecalho">
        <h3>Extrator de Sustentação do Redmine</h3>
      </div>
      <form class="px-4 py-3 Editaveis">
        <!--@submit.prevent="click"-->
        <div class="form-group">
          <label for="exampleDropdownFormEmail1">Usuário</label>
          <input
            v-model="usuario"
            type="text"
            class="form-control"
            id="exampleDropdownFormUser"
            placeholder="Digite o seu Usuário"
          />
        </div>
        <div class="form-group">
          <label for="exampleDropdownFormPassword1">Senha</label>
          <input
            v-model="senha"
            type="password"
            class="form-control"
            id="exampleDropdownFormPassword1"
            placeholder="Digite a sua Senha"
          />
        </div>
        <router-link to="/" custom v-slot="{ navigate }">
          <button
            @click="
              click();
              navigate();
            "
            type="button"
            class="btn btn-primary Botao"
          >
            Entrar
          </button>
        </router-link>
      </form>
      <div class="dropdown-divider"></div>
      <p>O Usuário e Senha são validados junto ao Redmine do Iphan</p>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent, ref, computed, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginComponent",
  setup() {
    const store = useStore();

    const usuario = ref("");
    const senha = ref("");
    const logado = computed(() => store.state.login.logged);

    watch(logado, (newVal, oldVal) => {
      if (Boolean(newVal) == true) {
        router.push("/");
      }
    });

    const click = () => {
      store.dispatch("login/authLogin", {
        user: usuario.value,
        password: senha.value,
      });
    };
    return {
      click,
      usuario,
      senha,
      logado,
    };
  },
});
</script>

<style scoped>
.LoginArea {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.LoginBox {
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
}
.Editaveis {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
}
.Botao {
  margin: 20px 0px 0px 0px;
}
.form-group {
  margin: 10px 0px 0px 0px;
}
.Cabecalho {
  margin: 10px 0px 0px 0px;
}
</style>
