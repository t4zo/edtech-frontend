<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="10">
      <v-form v-model="valid" @submit.prevent="handleFormSubmit">
        <v-card elevation="2" outlined>
          <v-card-subtitle class="pa-8">
            <h1>Atualizar Aluno</h1>
          </v-card-subtitle>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="aluno.ra"
                    :rules="rules.ra"
                    :counter="20"
                    label="Registro Acadêmico"
                    disabled
                    required
                  ></v-text-field>
                  <p v-if="raCadastrado">Registro Acadêmico já cadastrado</p>
                </v-col>

                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="aluno.nome"
                    :rules="rules.nome"
                    :counter="100"
                    label="Nome"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="aluno.email"
                    :rules="rules.email"
                    :counter="100"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="aluno.cpf"
                    :rules="rules.cpf"
                    :counter="14"
                    label="CPF"
                    disabled
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-end mr-6 mt-8 mb-4">
            <v-btn text color="primary" @click="$router.back()">
              voltar
            </v-btn>
            <v-btn depressed type="submit" color="primary">
              Confirmar
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
    const alunoObserver = store.getters["alunos/getAlunoByRA"](ra);
    const aluno = Object.assign({}, alunoObserver);

    return {
      aluno
    };
  },
  data() {
    return {
      valid: false,
      raCadastrado: false,
      aluno: {
        ra: "",
        nome: "",
        email: "",
        cpf: ""
      },
      rules: {
        ra: [
          v => !!v || "Registro Acadêmico é obrigatório",
          v =>
            v.length <= 20 ||
            "Registro Acadêmico deve ter menos de 20 caracteres"
        ],
        nome: [
          v => !!v || "Nome é obrigatório",
          v => v.length <= 100 || "Nome deve ter menos de 100 caracteres"
        ],
        email: [
          v => !!v || "E-mail é obrigatório",
          v => /.+@.+/.test(v) || "E-mail deve ser válido",
          v => v.length <= 100 || "E-mail deve ter menos de 100 caracteres"
        ],
        cpf: [
          v => !!v || "CPF é obrigatório",
          // v => /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(v) || "CPF deve ser válido",
          v => v.length <= 14 || "CPF deve ter menos de 14 caracteres"
        ]
      }
    };
  },
  methods: {
    async handleFormSubmit() {
      await this.$store.dispatch("alunos/updateAluno", this.aluno);
    }
  }
};
</script>
