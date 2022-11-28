<template>
  <div class="LoginArea">
    <div class="LoginBox border border-success">
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
            :disabled="isDisabled"
          >
            Entrar
          </button>
        </router-link>
      </form>
      <div class="dropdown-divider"></div>
      <div class="loginError" v-show="esconder" id="hide">
        <p>- Usuário e/ou senha Incorretos; ou</p>
        <p>- Você não tem permissão de Administrador no Redmine do Iphan; ou</p>
        <p>- O sistema de validação do LDAP (SISCAU) esta fora do ar.</p>
      </div>
      <div v-show="!esconder" id="hide">
        <p>O Usuário e Senha são validados junto ao Redmine do Iphan</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent, ref, computed, watch, watchEffect } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "LoginComponent",
  setup() {
    const store = useStore();

    const isDisabled = ref(false);
    const esconder = ref(false);
    const usuario = ref("");
    const senha = ref("");
    const logado = computed(() => store.state.login.logged);
    const count_false_tries = computed(() => {
      return store.state.login.count_false_tries;
    });

    watch(logado, (newVal, oldVal) => {
      if (Boolean(newVal) == true) {
        isDisabled.value = false;
        router.push("/");
      }
    });

    watchEffect(() => {
      if (count_false_tries.value > 0) {
        esconder.value = true;
        isDisabled.value = false;
      } else {
        esconder.value = false;
        isDisabled.value = false;
      }
    });

    const click = () => {
      isDisabled.value = true;
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
      esconder,
      count_false_tries,
      isDisabled,
    };
  },
});
</script>

<style scoped>
.loginError {
  color: red;
}
.LoginArea {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.LoginBox {
  width: 550px;
  height: 450px;
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
