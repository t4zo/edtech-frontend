<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <img
        src="~assets/images/grupo_a.png"
        alt="Grupo A"
        class="d-flex ma-auto"
      />
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>{{ chevronType }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <Nuxt />
      <v-btn dark @click="snackbar = true">
        Open Snackbar
      </v-btn>
      <v-container>
        <v-snackbar v-model="snackbar" :timeout="4000">
          <span v-if="snackbarMessage">
            {{ snackbarMessage }}
          </span>
          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: "EdTech",
      drawer: true,
      clipped: false,
      fixed: false,
      miniVariant: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Alunos",
          to: "/"
        }
      ],
      snackbar: false,
      snackbarMessage: ""
    };
  },
  created() {
    this.$nuxt.$on("showSnackbar", $event => {
      this.snackbar = true;
      this.snackbarMessage = $event;
    });
  },
  computed: {
    chevronType() {
      return `mdi-chevron-${this.miniVariant ? "right" : "left"}`;
    }
  }
};
</script>
