<template>
    <div class="Program-container">
      <article class="program" v-if="auth.isLoggedIn">
        <h1> <v-text-field v-model="program.headline"></v-text-field></h1>
        <v-text-field v-model="program.content" textarea></v-text-field>
        <v-btn icon @click="update">Änderungen Speichern <v-icon>save</v-icon></v-btn>
        <v-alert color="error" icon="warning" v-show="error"></v-alert>
      </article>
      <article class="program" v-else>
        <h1> {{program.headline}} </h1>
        <div class="article-text" v-html="program.content"></div>
      </article>
    </div>
</template>

<script>
  import {program} from '../persistance/db';
  import auth from '../persistance/auth';

  export default {
    name: 'Program',
    data(){
        return {
          error: '',
          auth: auth
        }
    },
    firebase: {
        program: {
            source: program,
            asObject: true,
            cancelCallback(e){
                this.error = e.message;
            }
        }
    },
    methods: {
      update(){
        this.$firebaseRefs.program.set({
          headline: this.program.headline,
          content: this.program.content
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
