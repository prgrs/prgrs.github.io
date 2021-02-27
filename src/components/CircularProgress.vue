<template>
  <div class="card">
    <div class="card-body">
      <h2>
				{{ title }}
      </h2>
      <p>
				On {{ identifier }} {{ currentProgress }} / {{ total }}
      </p>
      <vue-circle
				:progress="progress"
        :size="200"
        :reverse="false"
        line-cap="round"
        :fill="fill"
        empty-fill="rgba(0, 0, 0, .1)"
        :animation-start-value="0.0"
        :start-angle="0"
        insert-mode="append"
        :thickness="5"
        :show-percent="true"
        @vue-circle-progress="progress"
        @vue-circle-end="progress_end"
      >
      </vue-circle>
    </div>
  </div>
</template>

<script>
import VueCircle from "vue2-circle-progress";

export default {
  name: "Progress",
  components: {
    VueCircle
  },
	props: {
		title: String,
		identifier: String, // month, week etc.
		currentProgress: String,
		total: String,
		percent: String,
	},
  data() {
    return {
      fill: { gradient: ["#8E2DE2", "#4A00E0"] },
			progress: this.percent
    };
  }
}

</script>

<style scoped="">
.card {
  width: 20rem;
  border-radius: 12px;
  box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.15);
  margin: auto;
}
</style>
