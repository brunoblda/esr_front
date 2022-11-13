<template>
  <HeaderComponentVue></HeaderComponentVue>
  <div class="d-flex flex-row justify-content-start p-5">
    <div class="col-sm-1">
      <p></p>
    </div>
    <div>
      <h2>Páginas a Percorrer</h2>
      <div class="mt-4 row">
        <label for="valor_atual" class="mt-1 ps-5 col-sm-5 col-from-label">
          Valor atual:
        </label>
        <div class="col-sm-4">
          <input
            type="text"
            readonly
            id="valor_atual"
            class="form-control"
            :value="valorAtual"
          />
        </div>
      </div>
      <div class="mt-3 row">
        <div class="col-sm-9">
          <input
            type="number"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            class="form-control"
            placeholder="Digite o valor"
            v-model="valorInput"
          />
        </div>
      </div>
      <div class="pt-3">
        <div>
          <button type="button" class="btn btn-success" @click="clickAlterar()">
            Alterar
          </button>
        </div>
        <div class="pt-3">
          <p>Valor default é 20</p>
        </div>
      </div>
    </div>
  </div>
  <div class="ps-5">
    <h3>Obs. :</h3>
    <p></p>
    <p class="mx-5">
      Caso seja um mês de mais de um ano atrás, ajustar o valor de paginas a
      percorrer para o valor default (20) + 30 para cada ano de distância.
    </p>
    <p class="mx-5">
      Exemplo: hoje estamos em 15/11/2022, quero ver um mês de 10/2020, o valor
      de paginas a percorrer deve ser 20 + 30 + 30 = 80
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import HeaderComponentVue from "./HeaderComponent.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "PaginasAPercorrerComponent",
  components: { HeaderComponentVue },
  setup() {
    const store = useStore();
    const valorAtual = computed(() => {
      return store.state.configPaginasPercorrer.valorAtual;
    });

    let valorInput = ref();

    const clickAlterar = async () => {
      console.log(valorInput.value);

      await store.dispatch(
        "configPaginasPercorrer/updatePaginasAPercorrer",
        valorInput.value
      );

      store.dispatch("configPaginasPercorrer/getPaginasAPercorrer");
    };

    onMounted(async () => {
      if (valorAtual.value == "") {
        store.dispatch("configPaginasPercorrer/getPaginasAPercorrer");
      }
    });

    return {
      clickAlterar,
      valorAtual,
      valorInput,
    };
  },
});
</script>

<style scoped></style>
