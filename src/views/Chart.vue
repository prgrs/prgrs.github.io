<template>
  <div id="app">
    <div class="container">
      <div class="row justify-content-between">
        <h2>{{ authUser.displayName }}'s Progress</h2>
        <gb-button :color="buttonColor" @click="newCard">
					{{ buttonText }}
        </gb-button>
      </div>
      <gb-divider />
      <div class="row justify-content-center mx-auto">
        <NewProgress v-if="onNewCard" />
        <div v-for="i in list" class="d-inline">
          <ProgressCard
            :title="i.name"
            :identifier="i.identifier"
            :total="i.total"
            :currentProgress="i.progress"
            :colors="i.color"
          />
        </div>
        <div v-for="index in 2" :key="index" class="hidden d-inline" />
      </div>
    </div>
  </div>
</template>

<script>
import ProgressCard from "@/components/CircularProgress.vue";
import NewProgress from "@/components/NewProgress.vue";
import firebase from "firebase";

var gradients = [
  ["#2193b0", "#6dd5ed"],
  ["#cc2b5e", "#753a88"],
  ["#ee9ca7", "#ffdde1"],
  ["#de6262", "#ffb88c"],
  ["#06beb6", "#48b1bf"],
  ["#eb3349", "#f45c43"],
  ["#56ab2f", "#a8e063"],
  ["#02aab0", "#00cdac"],
  ["#43cea2", "#185a9d"],
  ["#ff512f", "#dd2476"],
  ["#4568dc", "#b06ab3"],
  ["#ec6f66", "#f3a183"],
  ["#4ca1af", "#c4e0e5"],
  ["#ff5f6d", "#ffc371"],
  ["#36d1dc", "#5b86e5"],
  ["#aa076b", "#61045f"],
  ["#e96443", "#904e95"],
  ["#654ea3", "#eaafc8"],
  ["#8360c3", "#2ebf91"],
  ["#8E2DE2", "#4A00E0"],
  ["#7F7FD5", "#91EAE4"],
  ["#92fe9d", "#00c9ff"],
  ["#f6d365", "#fda085"]
];

//var gradients = [
//];

export default {
  name: "Progress",
  components: {
    ProgressCard,
    NewProgress
  },
  data() {
    return {
      list: [],
      authUser: {},
      onNewCard: false,
			buttonText: "New Card",
			buttonColor: "blue"
    };
  },

  methods: {
    newCard() {
			if (this.onNewCard ) {
				this.buttonText = "New Card";
				this.buttonColor = "blue";
			} else {
				this.buttonText = "Cancel";
				this.buttonColor = "red";
			}
      this.onNewCard = !this.onNewCard;
    },
    progress(event, progress, stepValue) {
      //console.log(stepValue);
    },
    progress_end(event) {
      //console.log("Circle progress end");
    },
    fetchData() {
      console.log("here" + this.authUser.uid);
      var listRef = db.ref("users/" + this.authUser.uid + "/list");
      listRef.on("value", snapshot => {
        let list = [];
        let i = 0;
        snapshot.forEach(function(childSnapshot) {
          //          for (var i = 0, len = gradients.length; i < len; i++) {
          // FIXME: debug
          var item = childSnapshot.val();
          item.color = gradients[i++ % gradients.length];
          list.push(item);
          //         }
        });
        this.list = list;
      });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser = user;
        console.log(user.email); // FIXME
        this.fetchData();
      } else {
        //TODO
        this.authUser = {};
      }
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          vm.$router.push("/login");
        }
      });
    });
  }
};
</script>

<style scoped="">
h2 {
  color: white;
}

.hidden {
  width: 19rem;
  margin: 1rem;
}
</style>
