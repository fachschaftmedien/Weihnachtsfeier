<template>
  <v-container class="music-container">
    <v-card class="form-container" fluid>
      <v-card-title class="title">Musikwünsche</v-card-title>
      <v-container fluid>
        <v-form class="wishform form" v-on:submit.prevent="add">
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-text-field label="Titel" :rules="[function(v){ return v.length <= 200; } || 'Max 200 Zeichen']"
                            :counter="200" class="input text-input" v-model="newSong.title" required
                            autocomplete="off"/>
            </v-flex>
            <v-flex xs12 md5 offset-md1>
              <v-text-field label="Interpret" :rules="[function(v){ return v.length <= 200; } || 'Max 200 Zeichen']"
                            :counter="200" class="input text-input" v-model="newSong.interpret" required
                            autocomplete="off"/>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Bemerkungen" :rules="[function(v){ return v.length <= 500; } || 'Max 500 Zeichen']"
                            :counter="500" class="input text-input" v-model="newSong.remark"
                            autocomplete="off"/>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-btn type="submit" class="btn btn-default">Wünschen</v-btn>
              <v-btn type="reset" class="btn btn-default">Abbrechen</v-btn>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs10 offset-xs1>
              <v-alert class="form-group error-container" icon="warning" color="error" :value="error">
                {{error}}
              </v-alert>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
    <div class="wish-container">
      <v-card>
        <music-list></music-list>
      </v-card>
    </div>
  </v-container>
</template>

<script>
    import {songs} from '../persistance/db'
    import auth from '../persistance/auth'
    import MusicList from '@/components/MusicList';

    const similar = (strA, strB) => strA.toLowerCase().trim() === strB.toLowerCase().trim();
    export default {
      name: 'Music',
      components: {
          MusicList
      },
      data(){
          return {
              auth: auth,
              error: '',
              newSong: {
                interpret: '',
                title: '',
                remark: '',
                approved: false,
                tracknumber: -1
              }
          }
      },
      firebase: {
          songs: songs
      },
      computed: {
          headers(){
              return auth.isLoggedIn ? headersAuth : headers;
          }
      },
      methods: {
          add(){
              if(!this.newSong.title.length && !this.newSong.interpret.length){
                  this.error = 'Bitte fülle die Felder für Titel und Interpret aus';
              }else if(this.songs.filter(song => similar(song.title, this.newSong.title) && similar(song.interpret, this.newSong.interpret)).length > 0){
                  this.error = 'Der Song von diesem Interpreten und diesem Album wurde bereits gewünscht';
              }else{
                this.newSong.date = new Date().toISOString();
                this.$firebaseRefs.songs.push(this.newSong);
                this.error = '';
                this.newSong.title = '';
                this.newSong.remark = '';
                this.newSong.interpret = '';
              }
          },
          cancel(){
            this.error = '';
            this.newSong.date = '';
            this.newSong.title = '';
            this.newSong.remark = '';
          }
      }
    }
</script>

<style lang="scss" scoped>

</style>
