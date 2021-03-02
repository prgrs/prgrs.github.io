<template>
  <div
    @mouseover="activateButton = true"
    @mouseleave="activateButton = false"
    class="card"
  >
    <div class="card-body">
      <h4>
        {{ card.title }}
      </h4>
      <transition name="fade">
        <gb-button
					v-if="editable"
          @click="$emit('delete', card.id)"
          v-show="activateButton"
          class="close"
          left-icon="close"
          size="nano"
          color="red"
          :circular="true"
        />
      </transition>
      <transition name="fade">
        <gb-button
					v-if="editable"
          @click="editClicked"
          v-show="activateButton"
          class="edit"
          left-icon="edit"
          size="nano"
          color="orange"
          :circular="true"
        />
      </transition>
      <div class="row mx-auto">
        <gb-icon
          name="bookmark"
          color="#a9c7df"
          size="24px"
          style="margin-right:8px;"
        />
        <p>On {{ card.identifier }} {{ card.progress }} / {{ card.total }}</p>
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
    //    percentage: Number,
    card: {
      id: String,
      title: String,
      identifier: String,
      progress: String,
      total: String,
      colors: Array,
    },
		editable: Boolean
  },
  methods: {
    editClicked() {
      this.$emit("edit", this.card);
    },
    updatePercentage() {
      this.percentage = ((this.card.progress / this.card.total) * 100) | 0;
    }
  },
  created() {
    this.updatePercentage();
  },
  data() {
    return {
      fill: { gradient: this.card.colors },
      activateButton: false,
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
.edit {
  z-index: 2;
  right: 3rem;
  bottom: 1rem;
  position: absolute;
}
.close {
  z-index: 2;
  right: 1rem;
  bottom: 1rem;
  position: absolute;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
