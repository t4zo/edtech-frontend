export const state = () => ({
  alunos: []
});

export const mutations = {
  setAlunos(state, payload) {
    state.alunos = payload;
  }
}

export const actions = {
  setAlunos(context, payload) {
    const alunos = payload.map(aluno => {
      return {
        ...aluno,
        cpf: aluno.cpf.replace(/^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/, "$1.$2.$3-$4")
      }
    });

    context.commit('setAlunos', alunos);
  }
}

export const getters = {
  alunos(state) {
    return state.alunos;
  }
}