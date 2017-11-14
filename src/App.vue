<template>
  <v-app id="app">
    <v-toolbar flat persistent clipped class="page-header headline-container" app>
      <v-toolbar-side-icon @click="nav = !nav"></v-toolbar-side-icon>
      <v-toolbar-title class="headline"> Weihnachtsfeier Fachbereich Medien</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer class="nav navigation" temporary v-model="nav" enable-resize-watcher app>
      <v-layout>
        <v-list>
          <v-list-tile-content>
            <router-link to="/Front">
              <v-list-tile-action>
                <v-icon>home</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>
                Home
              </v-list-tile-title>
              <v-list-tile-sub-title>
                Startseite
              </v-list-tile-sub-title>
            </router-link>
          </v-list-tile-content>
          <v-list-tile-content>
            <router-link to="/Programm">
              <v-list-tile-action>
                <v-icon>mdi-event</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>
                Abendprogramm
              </v-list-tile-title>
              <v-list-tile-sub-title>
                Was wir wann alles an für den Abend geplant haben
              </v-list-tile-sub-title>
            </router-link>
          </v-list-tile-content>
          <v-list-tile-content>
            <router-link to="/Menu">
              <v-list-tile-action>mdi-food</v-list-tile-action>
              <v-list-tile-title> Speisen & Getränke </v-list-tile-title>
              <v-list-tile-sub-title>
                Was gibt es so vom Grill oder an der Bar
              </v-list-tile-sub-title>
            </router-link>
          </v-list-tile-content>
          <v-list-tile-content>
            <router-link to="/Music">
              <v-list-tile-action>mdi-music</v-list-tile-action>
              <v-list-tile-title>
                Musik
              </v-list-tile-title>
              <v-list-tile-sub-title>
                Welche Titel bereits gewünscht wurden & eigene Wünsche
              </v-list-tile-sub-title>
            </router-link>
          </v-list-tile-content>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
    <main>
      <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <transition>
              <router-view></router-view>
            </transition>
          </v-layout>
        </v-container>
      </v-content>
    </main>
    <footer>
      <login></login>
    </footer>
  </v-app>
</template>

<script>
  import Login from '@/components/Login'

  export default {
    name: 'app',
    components: {
      Login
    },
    data(){
        return {
          nav: true
        }
    }
  }
</script>

<style>

</style>
