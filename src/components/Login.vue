<template>
  <v-list>
    <v-list-tile v-if="!active && !auth.isLoggedIn" @click="active=true">
      <v-list-tile-action icon>
        <v-icon>fa fa-sign-in</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          <router-link to="/Front">Login</router-link>
        </v-list-tile-title>
        <v-list-tile-sub-title>
          Fachschafts-Anmeldung
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile v-else-if="!active && auth.isLoggedIn" @click="signOut()">
      <v-list-tile-action icon>
        <v-icon>fa fa-sign-out</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          <router-link to="/Front">Logout</router-link>
        </v-list-tile-title>
        <v-list-tile-sub-title>
          Abmelden, weiter als normaler Nutzer
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-form class="form form-inline" v-on:submit.prevent="signIn()" v-else>
      <v-text-field label="Mail" class="input text-input" v-model="mail" required/>
      <v-text-field label="Passwort" class="input text-input" v-model="password" :append-icon="hidePassword ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (hidePassword = !hidePassword)" :type="hidePassword ? 'password' : 'text'" required/>
      <v-btn type="submit"> Login </v-btn>
      <v-btn type="reset" @click="active = false"> Abbrechen </v-btn>
      <v-alert class="form-group error" color="error" icon="warning" :value="error">
        {{error}}
      </v-alert>
    </v-form>
  </v-list>
</template>

<script>
    import auth from '../persistance/auth';

    export default {
      name: 'Login',
        data(){
            return {
                auth: auth,
                active: false,
                mail: '',
                password: '',
                error: '',
                hidePassword: true
            }
        },
        methods: {
            signOut(){
                this.active = false;
                auth.signOut()
                  .catch((error) => {
                    this.error = error;
                  });
            },
            signIn(){
                auth.signIn(this.mail, this.password)
                  .then(() => {
                    this.error = '';
                    this.mail = '';
                    this.password = '';
                    this.active = false;
                  })
                  .catch((error) => {
                    this.error = error.message;
                    this.password = '';
                  });
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
