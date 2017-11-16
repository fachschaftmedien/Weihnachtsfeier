<template>
    <v-data-table class="wishlist table data-table" :search="search" :items="songs" :headers="headers" pagination.sync="pagination">
      <template slot="items" slot-scope="props">
        <tr class="song">
          <td class="text-xs-right" v-if="auth.isLoggedIn"> <input type="number" min="-1" v-model="props.item.tracknumber" :disabled="!props.item.approved" @change="update(props.item)"> </td>
          <td class="text-xs-right"> {{props.item.title}} </td>
          <td class="text-xs-right"> {{props.item.interpret}} </td>
          <td class="text-xs-right" v-if="auth.isLoggedIn"> {{props.item.remark}} </td>
          <td class="text-xs-right"> {{new Date(props.item.date).toLocaleString('de-De',{minute: '2-digit', hour: '2-digit', year: 'numeric', month: 'numeric', day: 'numeric'})}}
          <td class="text-xs-right"> <v-icon v-if="!auth.isLoggedIn">{{props.item.approved ? 'fa-check-circle-o' : 'fa-circle-o'}}</v-icon> <input v-else type="checkbox" v-model="props.item.approved" @change="update(props.item)"> </td>
        </tr>
      </template>
      <template slot="no-data">
        Zur Zeit wurde noch nichts eingetragen. Sei der erste, der einen Wunsch äußert!
      </template>
    </v-data-table>
</template>

<script>
  import auth from '../persistance/auth';
  import {songs} from '../persistance/db'

  const headers = [{
    'text': 'Titel',
    'value': 'title'
  },{
    'text': 'Interpret',
    'value': 'interpret'
  },{
    'text': 'Datum',
    'value': 'date'
  },{
    'text': 'Akzeptiert',
    'value': 'accepted',
    'sortable': false
  }];
  const headersAuth = headers.slice();
  headersAuth.splice(0,0,{
    'text': 'Listenplatz',
    'value': 'tracknumber'
  });
  headersAuth.splice(3,0,{
    'text': 'Bemerkung',
    'value': 'remark'
  });
  export default {
      name: 'MusicList',
      data(){
          return {
            search: '',
            pagination: {},
            auth: auth,
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
