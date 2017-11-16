<template>
  <v-container class="front-container">
    <v-card class="front" v-if="auth.isLoggedIn">
      <v-card-title class="title"><v-text-field v-model="front.headline"></v-text-field></v-card-title>
      <v-card-text><v-text-field v-model="front.content" textarea></v-text-field></v-card-text>
      <v-card-actions><v-btn @click="update">Änderungen Speichern <v-icon>save</v-icon></v-btn></v-card-actions>
      <v-alert color="error" icon="warning" v-show="error"></v-alert>
    </v-card>
    <v-card class="front" v-else>
      <v-card-title class="title"> {{front.headline}} </v-card-title>
      <v-card-text class="article-text" v-html="front.content"></v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import auth from '../persistance/auth';
  import {front} from '../persistance/db';

  export default {
    name: 'Front',
    data(){
      return {
        error: '',
        auth: auth
      }
    },
    firebase: {
        front: {
          source: front,
          asObject: true
        }
    },
    methods: {
        update(){
          this.$firebaseRefs.front.set({
            headline: this.front.headline,
            content: this.front.content
          });
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
