<template>
  <div id="app">
    <div class="container">
      <div class="row justify-content-center mx-auto">
        <div v-for="i in list" class="d-inline">
          <ProgressCard
            :title="i.name"
            :percent="i.percent"
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

var gradients = [
  ["#2193b0", "#6dd5ed"],
  ["#cc2b5e", "#753a88"],
  ["#ee9ca7", "#ffdde1"],
  ["#42275a", "#734b6d"],
  ["#de6262", "#ffb88c"],
  ["#06beb6", "#48b1bf"],
  ["#eb3349", "#f45c43"],
  ["#56ab2f", "#a8e063"],
  ["#614385", "#516395"],
  ["#02aab0", "#00cdac"],
  ["#43cea2", "#185a9d"],
  ["#ff512f", "#dd2476"],
  ["#4568dc", "#b06ab3"],
  ["#ec6f66", "#f3a183"],
  ["#4ca1af", "#c4e0e5"],
  ["#ff5f6d", "#ffc371"],
  ["#36d1dc", "#5b86e5"],
  ["#ff7e5f", "#feb47b"],
  ["#ff9966", "#ff5e62"],
  ["#aa076b", "#61045f"]
];

//var gradients = [
//  ["#e96443", "#904e95"],
//  ["#654ea3", "#eaafc8"],
//  ["#8360c3", "#2ebf91"],
//  ["#8E2DE2", "#4A00E0"],
//  ["#7F7FD5", "#91EAE4"],
//  ["#92fe9d", "#00c9ff"],
//  ["#f6d365", "#fda085"],
//];

export default {
  name: "Progress",
  components: {
    ProgressCard
  },
  data() {
    return {
      list: []
    };
  },

  methods: {
    progress(event, progress, stepValue) {
      //console.log(stepValue);
    },
    progress_end(event) {
      //console.log("Circle progress end");
    },
    fetchData() {
      db.collection("users")
        .get()
        .then(querySnapshot => {
          let list = [];
          querySnapshot.forEach(doc => {
            //console.log(`${doc.id} => ${doc.data()}`);
						for (var i = 0, len = gradients.length; i < len; i++) {
              var item = doc.data();
              item.percent = ((item.progress / item.total) * 100) | 0;
              console.log(i % gradients.length);
              console.log(gradients[i % gradients.length]);
              item.color = gradients[i % gradients.length];
              list.push(item);
            }
          });
          this.list = list;
        });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped="">
.container {
}
.hidden {
  width: 19rem;
  margin: 1rem;
}
</style>
