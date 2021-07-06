<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="10">
      <custom-table :headers="headers" :alunos="alunos" />
    </v-col>
  </v-row>
</template>

<script>
import CustomTable from "~/components/CustomTable.vue";
export default {
  components: { CustomTable },
  data() {
    return {
      headers: [
        { text: "Registro Acadêmico", value: "ra" },
        { text: "Nome", value: "nome" },
        { text: "CPF", value: "cpf" },
        { text: "Ações", value: "actions", sortable: false }
      ]
    };
  },

  async asyncData({ $axios, store }) {
    try {
      const { data } = await $axios.get("/v1/alunos");
      store.dispatch("alunos/setAlunos", data);
    } catch (error) {
      throw new Error(error);
    }
  },

  computed: {
    alunos() {
      const alunos = this.$store.getters["alunos/alunos"];
      return alunos.map(aluno => ({ ra: aluno.ra, nome: aluno.nome, cpf: aluno.cpf }));
    }
  }
};
</script>
