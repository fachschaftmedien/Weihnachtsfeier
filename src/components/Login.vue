<template>
    <div class="login-container">
      <button type="button" class="btn btn-default sign-in-button" v-if="!active && !auth.isLoggedIn" @click="active=true">
        Anmelden
      </button>
      <button type="button" class="btn btn-default sign-in-button" v-else-if="!active && auth.isLoggedIn" @click="signOut()">
        Abmelden
      </button>
      <form class="form form-inline" v-on:submit.prevent="signIn()" v-else>
        <div class="input-group form-group">
          <v-text-field label="Mail" class="input text-input" v-model="mail" required/>
        </div>
        <div class="input-group form-group">
          <v-text-field label="Passwort" class="input text-input" v-model="password" required/>
        </div>
        <div class="input-group form-group">
          <button type="submit" class="btn btn-default"> Login </button>
        </div>
        <v-alert class="form-group error" color="error" icon="warning" :value="error">
          {{error}}
        </v-alert>
      </form>
    </div>
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
