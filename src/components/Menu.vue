<template>
    <v-container class="menu-container" fluid>
      <v-card>
        <v-card-title>
          Getränke
        </v-card-title>
        <menu-type :allowed="'drink'"></menu-type>
      </v-card>
      <v-card>
        <v-card-title>Essen</v-card-title>
        <menu-type :allowed="'food'"></menu-type>
      </v-card>
      <v-card>
          <v-card-title>Hinzufügen</v-card-title>
        <v-container>
        <v-layout row wrap>
          <v-flex xs10 offset-xs>
            <v-form v-if="auth.isLoggedIn"  v-on:submit.prevent="add" v-on:reset="cancel">
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field type="text" v-model="newItem.name" required label="Name"></v-text-field>
                </v-flex>
                <v-flex xs2 offset-xs1>
                  <v-text-field v-model="newItem.price" required label="Preis in €"></v-text-field>
                </v-flex>
                <v-flex xs2 offset-xs1>
                  <v-select :items="types" v-model="newItem.type" label="Typ (food/drink)"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>

              </v-layout>
              <v-btn type="submit">Hinzufügen<v-icon>plus-circle</v-icon></v-btn>
              <v-btn type="reset">Abbrechen<v-icon>remove-circle</v-icon></v-btn>
            </v-form>
            <v-alert color="error" icon="warning" v-model="error">
              {{error}}
            </v-alert>
          </v-flex>
        </v-layout>
        </v-container>
      </v-card>
    </v-container>
</template>

<script>
  import {prices} from '../persistance/db'
  import auth from '../persistance/auth'
  import MenuType from '@/components/MenuType'

  export default {
    name: 'Menu',
    components: {
      MenuType
    },
    data(){
      return {
        types: ['food', 'drink'],
        auth: auth,
        error: '',
        newItem: {
          name: '',
          price: '',
          type: ''
        }
      }
    },
    firebase: {
      prices: prices
    },
    methods: {
      add(){
        if (this.newItem.name.trim().length === 0) {
          this.error = 'Der neue Eintrag braucht einen Namen! ';
        } else if (this.prices.findIndex(entry => entry.name.trim().toLowerCase() === this.newItem.name.trim().toLowerCase()) >= 0) {
          this.error = 'Auf der Karte gibt bereits einen Eintrag mit diesem Namen! ';
        } else if (this.newItem.price.trim().length === 0) {
          this.error = 'Es muss ein Preis angegeben werden';
        } else {
          this.$firebaseRefs.prices.push(this.newItem);
          this.error = '';
          this.newItem.name = '';
          this.newItem.price = '';
          this.newItem.type = '';
        }
      },
      cancel(){
        this.error = '';
        this.newItem.name = '';
        this.newItem.price = '';
        this.newItem.type = '';
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
