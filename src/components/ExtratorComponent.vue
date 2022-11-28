<template>
  <HeaderComponentVue></HeaderComponentVue>
  <div class="d-flex flex-row justify-content-around p-5">
    <div class="usuariosFabricaLista">
      <h2>Lista de usuários da fábrica</h2>
      <div class="mt-3">
        <ul class="list-group list-sized-param">
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
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <div class="d-flex flex-column justify-content-center p-5 largura">
      <div class="d-flex justify-content-center">
        <div class="mt-3 col-sm-9">
          <select
            v-model="mes"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected value="0">Escolha o mês</option>
            <option value="01">1</option>
            <option value="02">2</option>
            <option value="03">3</option>
            <option value="04">4</option>
            <option value="05">5</option>
            <option value="06">6</option>
            <option value="07">7</option>
            <option value="08">8</option>
            <option value="09">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>
      <div class="mt-3 d-flex justify-content-center">
        <div class="col-sm-9">
          <input
            type="text"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            class="form-control"
            placeholder="Digite o ano"
            v-model="ano"
          />
        </div>
      </div>
      <div class="mt-3 d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-success"
          @click="clickExtrair()"
          :disabled="isDisabled"
        >
          Extrair Sustentação
        </button>
      </div>
      <div v-show="mostrarDownloadCsv" id="hide">
        <div class="mt-3 d-flex justify-content-center">
          <JsonCSV :data="extract_dict">
            <button type="button" class="btn btn-primary">Donwload CSV</button>
          </JsonCSV>
        </div>
      </div>
      <div class="mt-3" v-show="mostrarLoading" id="hide">
        <div class="d-flex align-items-center">
          <strong>Loading...</strong>
          <div
            class="spinner-border ms-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import HeaderComponentVue from "./HeaderComponent.vue";
import JsonCSV from "vue-json-csv";
import { useStore } from "vuex";

export default defineComponent({
  name: "ExtratorComponent",
  components: { HeaderComponentVue, JsonCSV },
  setup() {
    const store = useStore();

    const mes = ref("0");

    const mostrarDownloadCsv = ref(false);
    const mostrarLoading = ref(false);
    const isDisabled = ref(false);

    const ano = ref("");

    const dataTest = [
      { name: "Joe", surname: "Roe" },
      { name: "John", surname: "Doe" },
    ];

    const allUsuariosFabrica = computed(() => {
      return store.state.configUsuariosFabrica.allUsuariosFabrica;
    });

    const extract_dict = computed(() => {
      return store.state.extrator.resultCSV;
    });

    const allFeriadosEDatas = computed(() => {
      return store.state.configFeriadosEDatas.allFeriadosEDatas;
    });

    const valorAtual = computed(() => {
      return store.state.configPaginasPercorrer.valorAtual;
    });

    const clickExtrair = async () => {
      if (parseInt(ano.value) > 2014) {
        mostrarLoading.value = true;
        isDisabled.value = true;
        mostrarDownloadCsv.value = false;

        await store.dispatch("extrator/postExtract", {
          mes_p: mes.value,
          ano_p: ano.value,
          valorAtual_p: valorAtual.value,
        });

        mostrarLoading.value = false;
        isDisabled.value = false;

        if (extract_dict.value.length > 0) {
          mostrarDownloadCsv.value = true;
        }
      }
    };

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

      if (allFeriadosEDatas.value.length == 0) {
        store.dispatch("configFeriadosEDatas/getAllFeriadosEDatas");
      }

      if (valorAtual.value == "") {
        store.dispatch("configPaginasPercorrer/getPaginasAPercorrer");
      }
    });
    return {
      mes,
      ano,
      allUsuariosFabrica,
      allFeriadosEDatas,
      valorAtual,
      clickExtrair,
      extract_dict,
      dataTest,
      mostrarDownloadCsv,
      mostrarLoading,
      isDisabled,
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

.largura {
  width: 308px;
}
</style>
