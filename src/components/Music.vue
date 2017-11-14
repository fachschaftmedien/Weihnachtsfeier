<template>
    <div class="music-container">
      <div class="form-container">
        <form class="wishform form form-inline" v-on:submit.prevent="add">
          <div class="input-group form-group">
            <v-text-field label="Titel" :rules="[(v) => v.length <= 200 || 'Max 200 Zeichen']" :counter="200" class="input text-input" v-model="newSong.title" required autocomplete="off"/>
          </div>
          <div class="input-group form-group">
            <v-text-field label="Interpret" :rules="[(v) => v.length <= 200 || 'Max 200 Zeichen']" :counter="200" class="input text-input" v-model="newSong.interpret" required autocomplete="off"/>
          </div>
          <div class="input-group form-group">
            <v-text-field label="Bemerkungen" :rules="[(v) => v.length <= 500 || 'Max 500 Zeichen']" :counter="500" class="input text-input" v-model="newSong.remark" required autocomplete="off"/>
          </div>
          <div class="input-group form-group">
            <v-btn type="submit" class="btn btn-default">Vorschlagen</v-btn>
            <v-btn type="reset" class="btn btn-default">Abbrechen</v-btn>
          </div>
          <v-alert class="form-group error-container" icon="warning" color="error" :value="error">
            {{error}}
          </v-alert>
        </form>
      </div>
      <div class="wish-container">
        <v-data-table class="wishlist table data-table" search="" :items="songs">
          <template slot="headers" slot-scope="props">
            <tr class="song-headers">
              <th> Titel </th>
              <th> Interpret </th>
              <th> Datum </th>
              <th> Angenommen </th>
              <th v-if="auth.isLoggedIn"> Listenplatz </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <tr class="song">
              <td> {{props.item.title}} </td>
              <td> {{props.item.interpret}} </td>
              <td> {{props.item.date}}
              <td> <div v-if="!auth.isLoggedIn"> {{props.item.approved ? 'Ja' : 'Nein'}} </div> <input v-else type="checkbox" v-model="props.item.approved" @change="update(props.item)"> </td>
              <td v-if="auth.isLoggedIn"> <input type="number" min="-1" v-model="props.item.tracknumber" :disabled="!props.item.approved" @change="update(props.item)"> </td>
            </tr>
          </template>
        </v-data-table>
      </div>
      <div class="play-container">
        <ul class="playlist">

        </ul>
      </div>
    </div>
</template>

<script>
    import {songs} from '../persistance/db'
    import auth from '../persistance/auth'

    const similar = (strA, strB) => strA.toLowerCase().trim() === strB.toLowerCase().trim();

    export default {
      name: 'Music',
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
        methods: {
            add(){
                if(!this.newSong.title.length && !this.newSong.interpret.length){
                    this.error = 'Bitte fülle die Felder für Titel und Interpret aus';
                }else if(this.songs.filter(song => similar(song.title, this.newSong.title) && similar(song.interpret, this.newSong.interpret)).length > 0){
                    this.error = 'Der Song von diesem Interpreten und diesem Album wurde bereits gewünscht';
                }else{
                    this.newSong.date = new Date().toISOString();
                    this.$firebaseRefs.songs.push(this.newSong);
                }
            },
            update(song){
              if(!song.approved){
                  song.tracknumber = -1;
              }else if(song.approved && song.tracknumber === -1){
                  song.tracknumber = 0;
              }
              let copy = {...song};
              delete copy['.key'];
              this.$firebaseRefs.songs.child(song['.key']).set(copy);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
