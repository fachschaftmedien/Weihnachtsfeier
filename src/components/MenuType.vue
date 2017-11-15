<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1 v-if="item.type === allowed" v-for="item in prices" :key="item.name">
        <v-layout row wrap>
          <v-flex xs7>
            <v-text-field type="text" v-model="item.name" required v-if="auth.isLoggedIn" label="Name" @change="update(item)"></v-text-field>
            <span v-else>{{item.name}}</span>
          </v-flex>
          <v-flex xs2 offset-xs1>
            <v-text-field v-model="item.price" required v-if="auth.isLoggedIn" label="Preis (€)" @change="update(item)"></v-text-field>
            <span v-else>{{item.price}}&nbsp;€</span>
          </v-flex>
          <v-flex xs1 offset-xs1>
            <v-btn v-if="auth.isLoggedIn" icon @click="remove(item)"><v-icon>delete</v-icon></v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import auth from '../persistance/auth';
  import {prices} from '../persistance/db';

  export default {
      name: 'MenuType',
      props: {
          allowed: String
      },
      data(){
          return {
            auth: auth
          }
      },
      firebase: {
        prices: prices
      },
      methods:{
        remove(item){
          this.$firebaseRefs.prices.child(item['.key']).remove();
        },
        update(item){
          let copy = {...item};
          delete copy['.key'];
          this.$firebaseRefs.prices.child(item['.key']).set(copy);
        }
      }
  }
</script>

<style lang="scss" scoped>

</style>
