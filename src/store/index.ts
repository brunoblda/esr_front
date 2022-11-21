import { createStore } from "vuex";
import { login } from "./login";
import { configUsuariosFabrica } from "./configUsuariosFabrica";
import { configPaginasPercorrer } from "./configPaginasPercorrer";
import { configFeriadosEDatas } from "./configFeriadosEDatas";
import { extrator } from "./extrator";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    configUsuariosFabrica,
    configPaginasPercorrer,
    configFeriadosEDatas,
    extrator,
  },
});
