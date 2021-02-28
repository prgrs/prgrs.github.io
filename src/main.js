import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import VueDarkMode from "@growthbunker/vuedarkmode";

Vue.use(VueDarkMode);


var firebaseConfig = {
	apiKey: "AIzaSyDVLyS1JKeeUbB46lSspm3559RYvA_SmFk",
	authDomain: "progress-44fd9.firebaseapp.com",
	databaseURL: "https://progress-44fd9-default-rtdb.firebaseio.com",
	projectId: "progress-44fd9",
	storageBucket: "progress-44fd9.appspot.com",
	messagingSenderId: "67525040169",
	appId: "1:67525040169:web:2b9f610c6e5d99f5256438",
	measurementId: "G-6WP7M9GWD3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

window.db = db; // to access from anywhere

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
