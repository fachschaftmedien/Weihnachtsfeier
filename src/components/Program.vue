<template>
    <v-container class="program-container">
      <v-card class="program" v-if="auth.isLoggedIn">
        <v-card-title class="title"><v-text-field v-model="program.headline"></v-text-field></v-card-title>
        <v-card-text><v-text-field v-model="program.content" textarea></v-text-field></v-card-text>
        <v-alert color="error" icon="warning" v-show="error">
          {{error}}
        </v-alert>
        <v-card-actions>
          <v-btn @click="update">speichern <v-icon>save</v-icon></v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="program" v-else>
        <v-card-title class="title"> {{program.headline}} </v-card-title>
        <v-card-text class="article-text" v-html="program.content"></v-card-text>
      </v-card>
    </v-container>
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
