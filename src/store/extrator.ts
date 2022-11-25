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
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
      };
      const res = await fetch(
        "https://8ahe0l.deta.dev/configuracoes/feriadosEDatas/",
        //"http://127.0.0.1:8000/configuracoes/feriadosEDatas/",
        requestOptions
      );
      const response = await res.json();
      ctx.commit("updateAllFeriadosEDatas", response);
    },
    async getAllUsuariosFabrica(ctx: any) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
      };
      const res = await fetch(
        "https://8ahe0l.deta.dev/configuracoes/usuariosFabrica/",
        //"http://127.0.0.1:8000/configuracoes/usuariosFabrica/",
        requestOptions
      );
      const response = await res.json();
      ctx.commit("updateUsuariosFabricaAll", response);
    },
    async getPaginasAPercorrer(ctx: any) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
      };
      const res = await fetch(
        "https://8ahe0l.deta.dev/configuracoes/paginasDeDados/",
        //"http://127.0.0.1:8000/configuracoes/paginasDeDados/",
        requestOptions
      );
      const response = await res.json();
      ctx.commit("updateValorAtual", response);
    },
    async postExtract(ctx: any, { mes_p, ano_p }) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        method: "POST",
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
        body: JSON.stringify({ mes: mes_p, ano: ano_p }),
      };
      const res = await fetch(
        "https://8ahe0l.deta.dev/extratorSlaMensal/",
        //"http://127.0.0.1:8000/extratorSlaMensal/",
        requestOptions
      );
      const response = await res.json();
      ctx.commit("updateResultToCSV", response);
    },
  },
};
