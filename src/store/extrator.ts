export const extrator = {
  namespaced: true,
  state() {
    return {
      resultCSV: [],
      allUsuariosFabrica: [],
      allFeriadosEDatas: [],
      valorAtual: "",
    };
  },
  getters: {
    getResultCSV(state: any) {
      return state.resultCSV;
    },
    getAllUsuariosFabrica(state: any) {
      return state.allUsuariosFabrica;
    },
  },
  mutations: {
    updateAllFeriadosEDatas(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        state.allFeriadosEDatas = response[1];
      }
      if (
        response[0]["Problema de autenticação, faça o login novamente"] === 401
      ) {
        sessionStorage.clear();
        state.logged = false;
        window.location.reload();
      }
    },
    updateUsuariosFabricaAll(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        state.allUsuariosFabrica = response[1];
      }
      if (
        response[0]["Problema de autenticação, faça o login novamente"] === 401
      ) {
        sessionStorage.clear();
        state.logged = false;
        window.location.reload();
      }
    },
    updateValorAtual(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        state.valorAtual = response[1][0]["percorre_quantas_paginas"];
      }
      if (
        response[0]["Problema de autenticação, faça o login novamente"] === 401
      ) {
        sessionStorage.clear();
        state.logged = false;
        window.location.reload();
      }
    },
    updateResultToCSV(state: any, response: any) {
      if (response[0]["Sla_month_extractor_executer"] === 200) {
        state.resultCSV = response[1];
      }
      if (
        response[0]["Problema de autenticação, faça o login novamente"] === 401
      ) {
        sessionStorage.clear();
        state.logged = false;
        window.location.reload();
      }
    },
  },
  actions: {
    async getAllFeriadosEDatas(ctx: any) {
      const res = await fetch(
        "https://8ahe0l.deta.dev/configuracoes/feriadosEDatas/",
        //"http://127.0.0.1:8000/configuracoes/feriadosEDatas/",
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: { "Content-type": "application/json" },
        }
      );
      const response = await res.json();
      ctx.commit("updateAllFeriadosEDatas", response);
    },
    async getAllUsuariosFabrica(ctx: any) {
      const res = await fetch(
        "https://8ahe0l.deta.dev/configuracoes/usuariosFabrica/",
        //"http://127.0.0.1:8000/configuracoes/usuariosFabrica/",
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: { "Content-type": "application/json" },
        }
      );
      const response = await res.json();
      ctx.commit("updateUsuariosFabricaAll", response);
    },
    async getPaginasAPercorrer(ctx: any) {
      const res = await fetch(
        "https://8ahe0l.deta.dev/configuracoes/paginasDeDados/",
        //"http://127.0.0.1:8000/configuracoes/paginasDeDados/",
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: { "Content-type": "application/json" },
        }
      );
      const response = await res.json();
      ctx.commit("updateValorAtual", response);
    },
    async postExtract(ctx: any, { mes_p, ano_p, valorAtual_p }) {
      let response_full = [];
      let offset_p = "0";
      let response_firt;
      for (let i = 0; i < parseInt(valorAtual_p); i++) {
        offset_p = (50 * i).toString();
        const res = await fetch(
          "https://8ahe0l.deta.dev/extratorSlaMensal/",
          //"http://127.0.0.1:8000/extratorSlaMensal/",
          {
            method: "POST",
            credentials: "include",
            mode: "cors",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ mes: mes_p, ano: ano_p, off_set: offset_p }),
          }
        );
        const response = await res.json();
        response_firt = response[0];
        response_full = response_full.concat(response[1]);
      }
      ctx.commit("updateResultToCSV", [response_firt, response_full]);
    },
  },
};
