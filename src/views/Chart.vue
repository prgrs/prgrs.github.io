<template>
  <div id="app">
    <div v-for="item in list">
			<ProgressCard 
			title="asdf" 
			percent="42" 
			identifier="week" 
			total="12" 
			currentProgress="4.3"/>
    </div>
  </div>
</template>

<script>
import ProgressCard from '@/components/CircularProgress.vue'

export default {
	name: 'Progress',
  components: {
    ProgressCard
  },
  data() {
    return {
			list: [],
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
			db.collection("users").get().then((querySnapshot) => {
				let list = [];
				querySnapshot.forEach((doc) => {
					//console.log(`${doc.id} => ${doc.data()}`);
					var item = doc.data();
					item.percent = (item.progress/item.total * 100) | 0;
					list.push(item);
				});
				this.list = list;
			});
		}
  },
	created(){
		this.fetchData();
	}
};
</script>

<style scoped="">
</style>
