<template>
  <div class="container">
    <p>
      Please Login with your Google account to continue
    </p>
		<gb-button color="white" size="medium" @click="login"
      >Login with Google</gb-button
    >
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  methods: {
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
					// FIXME: debug
          console.log(user);
          console.log(user.displayName);
          console.log(user.email);
          console.log(user.uid);
					this.addUserToDB(user);

					this.$router.push('/');
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(errorCode);
          console.log(errorMessage);
          console.log(email);
          console.log(credential);
        });
    },
    addUserToDB(user) {
      db.ref("users/" + user.uid)
        .set({
          mail: user.email,
          name: user.displayName,
        })
				.then(() => {
          console.log("Success");
        })
        .catch(() => {
          console.error("Error");
        });
    }
  }
};
</script>

<style scoped="">
.container {
}
p {
  color: #fff;
}
</style>
