<template>
  <v-app id="app">
    <v-toolbar flat persistent clipped class="page-header headline-container" app>
      <v-toolbar-side-icon @click="nav = !nav"></v-toolbar-side-icon>
      <v-toolbar-title class="headline"> Weihnachtsfeier FB Medien</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer class="nav navigation" persistent v-model="nav" enable-resize-watcher app>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Menu
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list two-line subheader>
        <v-list-tile avatar v-for="item in items" :key="item.name">
          <v-list-tile-action icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to="item.link">{{item.name}}</router-link>
            </v-list-tile-title>
            <v-list-tile-sub-title>
              {{item.subtitle}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <login></login>
      </v-list>
    </v-navigation-drawer>
    <main>
      <v-content>
        <v-container fill-height>
          <v-layout>
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  import Login from '@/components/Login'

  export default {
    name: 'app',
    components: {
      Login,
    },
    data(){
      return {
        nav: true,
        items: [
          {
            icon: 'home',
            name: 'Home',
            subtitle: 'Startseite',
            link: '/Front'
          },
          {
            icon: 'event',
            name: 'Abendprogramm',
            subtitle: 'Was haben wir geplant',
            link: '/Program'
          },
          {
            icon: 'restaurant',
            name: 'Speisen & Getränke',
            subtitle: 'Was gibt es an Bar & Grill',
            link: '/Prices'
          },
          {
            icon: 'music_note',
            name: 'Musik',
            subtitle: 'Playlist & Wünsche',
            link: '/Music'
          }
        ]
      }
    }
  }
</script>

<style>

</style>
