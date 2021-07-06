function addCpfMask(cpf) {
  return cpf.replace(/^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/, "$1.$2.$3-$4");
}

export const state = () => ({
  alunos: []
});

export const mutations = {
  setAlunos(state, payload) {
    state.alunos = payload;
  },
  addAluno(state, payload) {
    state.alunos.push(payload);
  },
  updateAluno(state, payload) {
    const aluno = state.alunos.filter(aluno => aluno.ra === payload);
    aluno.nome = payload.nome;
    aluno.email = payload.email;
  },
  deleteAluno(state, payload) {
    const aluno = state.alunos.filter(aluno => aluno.ra === payload);
    state.alunos.splice(state.alunos.indexOf(aluno), 1);
  }
};

export const actions = {
  setAlunos(context, payload) {
    const alunos = payload.map(aluno => {
      return {
        ...aluno,
        cpf: addCpfMask(aluno.cpf)
      };
    });

    context.commit("setAlunos", alunos);
  },
  async addAluno(context, payload) {
    try {
      const { data } = await this.$axios.post("/v1/alunos", payload);
      data.cpf = addCpfMask(data.cpf);
      context.commit("addAluno", data);
      this.$router.push("/");
      return true;
    } catch (error) {
      return false;
    }
  },
  async updateAluno(context, payload) {
    try {
      const { data } = await this.$axios.put(
        `/v1/alunos/${payload.ra}`,
        payload
      );

      context.commit("updateAluno", data);
      this.$router.push("/");
      return true;
    } catch (error) {
      return false;
    }
  },
  async deleteAluno(context, payload) {
    try {
      const { data } = await this.$axios.delete(`/v1/alunos/${payload}`);
      context.commit("deleteAluno", data);
      this.$router.push("/");
      return true;
    } catch (error) {
      return false;
    }
  }
};

export const getters = {
  alunos(state) {
    return state.alunos;
  },
  getAlunoByRA: state => ra => {
    return state.alunos.find(aluno => aluno.ra === ra);
  }
};
