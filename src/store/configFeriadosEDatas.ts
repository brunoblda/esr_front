export const configFeriadosEDatas = {
  namespaced: true,
  state() {
    return {
      allFeriadosEDatas: [],
    };
  },
  getters: {
    getAllFeriadosEDatas(state: any) {
      return state.allFeriadosEDatas;
    },
  },
  mutations: {
    updateAllFeriadosEDatas(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        state.allFeriadosEDatas = response[1];
      }
      if (response[0]["redmine_status_response"] === 404) {
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
    responseAddFeriadoOuData(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 201) {
        //pass
      }
      if (
        response[0]["Problema de autenticação, faça o login novamente"] === 401
      ) {
        sessionStorage.clear();
        state.logged = false;
        window.location.reload();
      }
    },
    responseDelFeriadoOuData(state: any, response: any) {
      if (response[0]["redmine_status_response"] === 200) {
        //pass
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
        "https://p4e7et.deta.dev/configuracoes/feriadosEDatas/",
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
    async addFeriadoOuData(ctx: any, [dia_r, periodo_r]) {
      const res = await fetch(
        "https://p4e7et.deta.dev/configuracoes/feriadosEDatas/",
        //"http://127.0.0.1:8000/configuracoes/feriadosEDatas/",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ dia: dia_r, periodo: periodo_r }),
        }
      );
      const response = await res.json();

      ctx.commit("responseAddFeriadoOuData", response);
    },
    async delFeriadoOuData(ctx: any, [data]) {
      const res = await fetch(
        `https://p4e7et.deta.dev/configuracoes/feriadosEDatas/${data}`,
        //`http://127.0.0.1:8000/configuracoes/feriadosEDatas/${data}`,
        {
          method: "DELETE",
          credentials: "include",
          mode: "cors",
          headers: { "Content-type": "application/json" },
        }
      );
      const response = await res.json();

      ctx.commit("responseDelFeriadoOuData", response);
    },
  },
};
