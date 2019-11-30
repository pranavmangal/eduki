import Vue from 'vue'
import firebase from 'firebase';
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD-gC4K3_IvfOTGCE5XIzGIMgReiFMggI8",
  authDomain: "eduki-f754c.firebaseapp.com",
  databaseURL: "https://eduki-f754c.firebaseio.com",
  projectId: "eduki-f754c",
  storageBucket: "eduki-f754c.appspot.com",
  messagingSenderId: "68588340371",
  appId: "1:68588340371:web:a291f12194c15b9668b966"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
