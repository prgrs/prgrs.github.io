<template>
  <div class="card">
    <div class="card-body">
      <h4>
        {{ title }}
      </h4>
      <div class="row mx-auto">
        <gb-icon name="bookmark" color="#a9c7df" size="24px" style="margin-right:8px;" />
        <p>On {{ identifier }} {{ currentProgress }} / {{ total }}</p>
      </div>
      <gb-divider margin="1.5rem 0"></gb-divider>
      <vue-circle
        :progress="percentage"
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
      >
      </vue-circle>
    </div>
  </div>
</template>

<script>
import VueCircle from "vue2-circle-progress";

export default {
  name: "ProgressCard",
  components: {
    VueCircle
  },
  props: {
    title: String,
    identifier: String, // month, week etc.
    currentProgress: String,
    total: String,
    percent: Number,
    colors: Array
  },
  data() {
    return {
      fill: { gradient: this.colors },
      percentage: this.percent
    };
  }
};
</script>

<style scoped="">
h4,
p {
  text-align: left;
}

p {
  color: #a9c7df;
}

.card {
  width: 19rem;
  border-radius: 12px;
  border: 2px solid #313d4f;
  box-shadow: 0 6px 10px -4px #18191a88;
  margin: 1rem;
  color: #fff;
  background: #171e29;
}
</style>
