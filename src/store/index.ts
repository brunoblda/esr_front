import { createStore } from "vuex";
import { login } from "./login";
import { configUsuariosFabrica } from "./configUsuariosFabrica";
import { configPaginasPercorrer } from "./configPaginasPercorrer";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    configUsuariosFabrica,
    configPaginasPercorrer,
  },
});
