<template>
  <HeaderComponentVue></HeaderComponentVue>
  <div class="d-flex flex-row justify-content-around p-5">
    <div class="usuariosFabricaLista">
      <h2>Lista de Feriados e Datas</h2>
      <div class="mt-3">
        <ul class="list-group list-sized-param">
          <li
            class="list-group-item"
            v-for="feriadoOuData in allFeriadosEDatas"
            :key="feriadoOuData.dia"
          >
            <div v-if="feriadoOuData.periodo == 'i'">
              {{ feriadoOuData.dia }} : Integral
            </div>
            <div v-else-if="feriadoOuData.periodo == 'v'">
              {{ feriadoOuData.dia }} : Vespertino
            </div>
            <div v-else>{{ feriadoOuData.dia }} : Matutino</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="adicionarUsuarioFabrica">
      <h2>Adicionar Feriado ou Data</h2>
      <div>
        <div class="mt-3">
          <input
            type="date"
            class="form-control"
            placeholder="Digite o Feriado ou a Data"
            v-model="adicionarFeriadoOuData"
          />
        </div>
        <div class="form-check mt-3">
          <input
            v-model="periodo"
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="i"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Integral
          </label>
        </div>
        <div class="form-check mt-3">
          <input
            v-model="periodo"
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            value="m"
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Matutino
          </label>
        </div>
        <div class="form-check mt-3">
          <input
            v-model="periodo"
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault3"
            value="v"
          />
          <label class="form-check-label" for="flexRadioDefault3">
            Vespertino
          </label>
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
      <h2>Retirar Feriado ou Data</h2>
      <div>
        <div class="mt-3">
          <select
            v-model="retirarFeriadoOuData"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Escolha a data</option>
            <option
              v-for="feriadoOuData in allFeriadosEDatas"
              :key="feriadoOuData.dia"
              :value="[feriadoOuData.dia]"
            >
              <div v-if="feriadoOuData.periodo == 'i'">
                Integral : {{ feriadoOuData.dia }}
              </div>
              <div v-else-if="feriadoOuData.periodo == 'v'">
                Vespertino : {{ feriadoOuData.dia }}
              </div>
              <div v-else>Matutino : {{ feriadoOuData.dia }}</div>
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
import { defineComponent, computed, onMounted, ref } from "vue";
import HeaderComponentVue from "./HeaderComponent.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "FeriadosEDatasComponent",
  components: { HeaderComponentVue },
  setup() {
    const store = useStore();

    const periodo = ref("");

    let adicionarFeriadoOuData = ref("");
    let retirarFeriadoOuData = ref("Escolha a data");

    const allFeriadosEDatas = computed(() => {
      return store.state.configFeriadosEDatas.allFeriadosEDatas;
    });

    onMounted(async () => {
      if (allFeriadosEDatas.value.length == 0) {
        store.dispatch("configFeriadosEDatas/getAllFeriadosEDatas");
      }
      //if (JSON.stringify(allUsuarios.value) == "{}")
    });

    const clickAdicionar = async () => {
      if (
        !(String(adicionarFeriadoOuData.value) === "") &&
        !(String(periodo.value) === "")
      ) {
        await store.dispatch("configFeriadosEDatas/addFeriadoOuData", [
          adicionarFeriadoOuData.value,
          periodo.value,
        ]);

        store.dispatch("configFeriadosEDatas/getAllFeriadosEDatas");
      }
    };

    const clickRetirar = async () => {
      if (
        !(String(retirarFeriadoOuData.value) === "") &&
        !(String(retirarFeriadoOuData.value) === "Escolha a data")
      ) {
        await store.dispatch("configFeriadosEDatas/delFeriadoOuData", [
          retirarFeriadoOuData.value,
        ]);

        retirarFeriadoOuData.value = "Escolha a data";
        store.dispatch("configFeriadosEDatas/getAllFeriadosEDatas");
      }
    };

    return {
      allFeriadosEDatas,
      adicionarFeriadoOuData,
      clickAdicionar,
      retirarFeriadoOuData,
      clickRetirar,
      periodo,
    };
  },
});
</script>
<style scoped>
.list-sized-param {
  height: auto;
  max-height: 353px;
  overflow-x: hidden;
}
</style>
