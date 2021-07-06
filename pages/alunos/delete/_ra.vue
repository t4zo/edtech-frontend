<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="10">
      <v-form @submit.prevent="handleFormSubmit">
        <v-card elevation="2" outlined>
          <v-card-subtitle class="pa-8">
            <h1>Cadastrar Aluno</h1>
          </v-card-subtitle>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="aluno.ra"
                    label="Registro Acadêmico"
                    readonly
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="aluno.nome"
                    label="Nome"
                    readonly
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="aluno.email"
                    label="E-mail"
                    readonly
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="aluno.cpf"
                    label="CPF"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-end mr-6 mt-8 mb-4">
            <v-btn text color="secondary" @click="$router.back()">
              voltar
            </v-btn>
            <v-btn depressed type="submit" color="secondary">
              Remover
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ route, store }) {
    const { ra } = route.params;

    const aluno = store.getters["alunos/getAlunoByRA"](ra);
    return {
      aluno
    };
  },
  methods: {
    async handleFormSubmit() {
      await this.$store.dispatch("alunos/deleteAluno", this.aluno.ra);
    }
  }
};
</script>
