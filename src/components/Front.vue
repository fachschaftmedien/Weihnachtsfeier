<template>
  <div class="front-container">
    <article class="front" v-if="auth.isLoggedIn">
      <h1> <v-text-field v-model="front.headline"></v-text-field></h1>
      <v-text-field v-model="front.content" textarea></v-text-field>
      <v-btn icon @click="update">Änderungen Speichern <v-icon>save</v-icon></v-btn>
      <v-alert color="error" icon="warning" v-show="error"></v-alert>
    </article>
    <article class="front" v-else>
      <h1> {{front.headline}} </h1>
      <div class="article-text" v-html="front.content"></div>
    </article>
  </div>
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
