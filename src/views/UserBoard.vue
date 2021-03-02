<template>
  <div id="app">
    <div class="container">
      <NewCardHeader :headerText="displayName" :button="false" />
      <gb-divider />
      <div class="row justify-content-center mx-auto">
        <div v-for="i in list" class="d-inline">
          <ProgressCard :editable="false" v-bind:key="i.id" :card="i" />
        </div>
        <div v-for="index in 2" :key="index" class="hidden d-inline" />
      </div>
    </div>
  </div>
</template>

<script>
import ProgressCard from "@/components/CircularProgress.vue";
import NewCardHeader from "@/components/NewCardHeader.vue";

export default {
  name: "User",
  components: {
    ProgressCard,
    NewCardHeader
  },
  data() {
    return {
      list: [],
      displayName: "",
      userUid: this.$route.params.userid
    };
  },
  methods: {
    setDisplayName() {
      db.ref("users")
        .child(this.userUid)
        .child("name")
        .get()
        .then(snapshot => {
          this.displayName = snapshot.val();
        });
    },
    fetchData() {
      var listRef = db.ref("users/" + this.userUid + "/list");
      listRef.on("value", snapshot => {
        let list = [];
        let i = 0;
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.id = childSnapshot.key;
          list.push(item);
        });
        this.list = list.reverse();
      });
    }
  },
  created() {
    this.setDisplayName();
    this.fetchData();
  }
};
</script>
