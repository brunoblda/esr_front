export const configPaginasPercorrer = {
  namespaced: true,
  state() {
    return {
      valorAtual: "",
    };
  },
  getters: {
    getAllUsuariosFabrica(state: any) {
      return state.allUsuariosFabrica;
    },
  },
  mutations: {
    updateValorAtual(state: any, response: any) {
      console.log(response);
      if (response[0]["redmine_status_response"] === 200) {
        state.valorAtual = response[1][0]["percorre_quantas_paginas"];
      } else {
        console.log("failed");
      }
    },
    responseUpdatePaginasAPercorrer(state: any, response: any) {
      console.log(response);
      if (response[0]["redmine_status_response"] === 200) {
        console.log("sucess");
      } else {
        console.log("failed");
      }
    },
  },
  actions: {
    async getPaginasAPercorrer(ctx: any) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        headers: { token: String(token_saved) },
      };
      const res = await fetch(
        "http://127.0.0.1:8000/configuracoes/paginasDeDados/",
        requestOptions
      );
      const response = await res.json();
      ctx.commit("updateValorAtual", response);
    },
    async updatePaginasAPercorrer(ctx: any, paginas: any) {
      console.log("13");
      console.log(paginas);
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        method: "PUT",
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
        body: JSON.stringify({ quantas_paginas: paginas }),
      };

      const res = await fetch(
        "http://127.0.0.1:8000/configuracoes/paginasDeDados/",
        requestOptions
      );
      const response = await res.json();

      ctx.commit("responseUpdatePaginasAPercorrer", response);
    },
  },
};
