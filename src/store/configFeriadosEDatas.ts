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
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        headers: { token: String(token_saved) },
      };
      const res = await fetch(
        "https://lih9ob.deta.dev/configuracoes/feriadosEDatas/",
        requestOptions
      );
      const response = await res.json();
      ctx.commit("updateAllFeriadosEDatas", response);
    },
    async addFeriadoOuData(ctx: any, [dia_r, periodo_r]) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        method: "POST",
        headers: {
          token: String(token_saved),
          "Content-type": "application/json",
        },
        body: JSON.stringify({ dia: dia_r, periodo: periodo_r }),
      };

      const res = await fetch(
        "https://lih9ob.deta.dev/configuracoes/feriadosEDatas/",
        requestOptions
      );
      const response = await res.json();

      ctx.commit("responseAddFeriadoOuData", response);
    },
    async delFeriadoOuData(ctx: any, [data]) {
      const token_saved = sessionStorage.getItem("token");
      const requestOptions = {
        method: "DELETE",
        headers: { token: String(token_saved) },
      };

      const res = await fetch(
        `https://lih9ob.deta.dev/configuracoes/feriadosEDatas/${data}`,
        requestOptions
      );
      const response = await res.json();

      ctx.commit("responseDelFeriadoOuData", response);
    },
  },
};
