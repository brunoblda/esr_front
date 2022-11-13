<template>
  <HeaderComponentVue></HeaderComponentVue>
  <div class="d-flex flex-row justify-content-around p-5">
    <div class="usuariosFabricaLista">
      <h2>Lista de usuários da fábrica</h2>
      <div class="mt-3">
        <ul class="list-group">
          <li
            class="list-group-item"
            v-for="usuario in allUsuariosFabrica"
            :key="usuario.id"
          >
            {{ usuario.login }}
          </li>
        </ul>
      </div>
    </div>
    <div class="adicionarUsuarioFabrica">
      <h2>Adicionar usuários da fabrica</h2>
      <div>
        <div class="mt-3">
          <select
            v-model="adicionarUsuario"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Digite o usuário</option>
            <option
              v-for="usuario in allUsuarios"
              :key="usuario"
              :value="usuario"
            >
              {{ usuario[1] }}
            </option>
          </select>
        </div>
        <div class="mt-3">
          <button
            type="button"
            class="btn btn-success"
            @click="clickAdicionar()"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
    <div class="retirarUsuarioFabrica">
      <h2>Retirar usuários da fabrica</h2>
      <div>
        <div class="mt-3">
          <select
            v-model="retirarUsuario"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Digite o usuário</option>
            <option
              v-for="usuario in allUsuariosFabrica"
              :key="usuario.id"
              :value="[usuario.id, usuario.login]"
            >
              {{ usuario.login }}
            </option>
          </select>
        </div>
        <div class="mt-3">
          <button type="button" class="btn btn-warning" @click="clickRetirar()">
            Retirar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import HeaderComponentVue from "./HeaderComponent.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "UsuarioFabricaComponent",
  components: { HeaderComponentVue },
  setup() {
    const store = useStore();

    let adicionarUsuario = ref("Digite o usuário");
    let retirarUsuario = ref("Digite o usuário");

    const allUsuariosFabrica = computed(() => {
      return store.state.configUsuariosFabrica.allUsuariosFabrica;
    });

    const allUsuarios = computed(() => {
      return store.state.configUsuariosFabrica.allUsuarios;
    });

    /*const temp = "valor";

    watchEffect(() => {
      if (allUsuariosFabrica.value.length != 0) {
        const temp = "valor";
      }

      if (allUsuarios.value.length != 0) {
        const temp = "valor";
      }
    });*/

    onMounted(async () => {
      if (allUsuariosFabrica.value.length == 0) {
        store.dispatch("configUsuariosFabrica/getAllUsuariosFabrica");
      }
      //if (JSON.stringify(allUsuarios.value) == "{}")
      if (allUsuarios.value.length == 0) {
        store.dispatch("configUsuariosFabrica/getAllUsuarios");
      }
    });

    const clickAdicionar = async () => {
      console.log(Array.isArray(adicionarUsuario.value));
      console.log(adicionarUsuario.value);

      if (Array.isArray(adicionarUsuario.value)) {
        await store.dispatch("configUsuariosFabrica/addUsuario", [
          adicionarUsuario.value,
        ]);

        store.dispatch("configUsuariosFabrica/getAllUsuariosFabrica");
      }
    };

    const clickRetirar = async () => {
      console.log("12");
      console.log(retirarUsuario.value);

      if (Array.isArray(retirarUsuario.value)) {
        await store.dispatch("configUsuariosFabrica/delUsuario", [
          retirarUsuario.value,
        ]);

        store.dispatch("configUsuariosFabrica/getAllUsuariosFabrica");
      }
    };

    return {
      allUsuariosFabrica,
      allUsuarios,
      adicionarUsuario,
      clickAdicionar,
      retirarUsuario,
      clickRetirar,
    };
  },
});
</script>

<style scoped></style>
