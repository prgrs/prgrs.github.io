<template>
  <div class="card">
    <div class="card-body">
      <h4>
        <gb-input
          v-model="valueTitle"
          placeholder="Title"
          :status="this.$v.valueTitle.$error ? 'error' : 'normal'"
          :required="true"
          :max="3"
        />
      </h4>
      <div class="row mx-auto">
        <gb-icon
          name="bookmark"
          color="#a9c7df"
          size="24px"
          style="margin-right:8px;"
        />
        <p>On</p>
        <gb-input
          id="input-identifier"
          size="mini"
          placeholder="identifier"
          info="week/chapter etc."
          v-model="valueIdentifier"
        />
        <p></p>
        <gb-input
          @input="progChanged"
          :status="this.$v.valueProg.$error ? 'error' : 'normal'"
          id="input-prog"
          size="mini"
          v-model="valueProg"
        />
        <p>/</p>
        <gb-input
          @input="totalChanged"
          :status="this.$v.valueTotal.$error ? 'error' : 'normal'"
          id="input-total"
          size="mini"
          v-model="valueTotal"
        />
      </div>
      <gb-divider margin="1.5rem 0"></gb-divider>
      <vue-circle
        ref="vueCircleUniqeId"
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
      <gb-button
        size="mini"
        :style="colorStyle"
        @click="colorClicked"
        color="black"
        class="button-color"
        :circular="true"
        left-icon="palette"
      />
      <gb-button
        @click="doneClicked"
        class="button-done"
        :circular="true"
        left-icon="done"
      />
    </div>
  </div>
</template>

<script>
import VueCircle from "vue2-circle-progress";
import { required, decimal } from "vuelidate/lib/validators";

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

export default {
  name: "NewCard",
  components: {
    VueCircle
  },
  props: {
    card: Object
  },
  methods: {
		updateColorPickerBg() {
      this.colorStyle =
        "background-image: linear-gradient(to bottom right," +
        this.card.colors[0] +
        "," +
        this.card.colors[1] +
        ")";
		},
    colorClicked() {
      this.randomColor();
      //console.log(this.card.colors);
      this.updateColor();
      this.updateProgress();
			this.updateColorPickerBg();
    },
    randomColor() {
      this.card.colors =
        gradients[Math.floor(Math.random() * gradients.length)];
    },
    updateColor() {
      this.$refs["vueCircleUniqeId"].updateFill({ gradient: this.card.colors });
    },
    updateProgress() {
      this.updatePercentage();
      this.$refs["vueCircleUniqeId"].updateProgress(this.percentage);
      this.updateColor();
    },
    progChanged(value, name, event) {
      this.card.progress = String(value);
      this.updateProgress();
    },
    totalChanged(value, name, event) {
      this.card.total = String(value);
      this.updateProgress();
    },
    doneClicked() {
      //console.log(this.valueTitle);
      //console.log(this.valueIdentifier);
      //console.log(this.valueProg);
      //console.log(this.valueTotal);

      this.$v.$touch();

      if (this.$v.$error) {
        //console.log("hata");
        return;
      }

      let item = {};
      item.title = this.valueTitle;
      item.identifier = this.valueIdentifier;
      item.progress = this.valueProg;
      item.total = this.valueTotal;
      item.colors = this.card.colors;

      // identifier can be empty
      if (!item.identifier) {
        item.identifier = "";
      }

      this.$emit("value", item);
    },
    updatePercentage() {
      this.percentage = ((this.card.progress / this.card.total) * 100) | 0;
    }
  },
  created() {
    this.updatePercentage();
    if (!this.card.id) {
      this.randomColor();
    }
		this.updateColorPickerBg();
  },
  data() {
    return {
      fill: { gradient: this.card.colors },
      percentage: this.percent,
      titleCheck: true,
      currentProgress: 0,
      total: 0,
      valueTitle: this.card.title,
      valueIdentifier: this.card.identifier,
      valueTotal: this.card.total,
      valueProg: this.card.progress,
      colorStyle: ""
    };
  },
  validations: {
    valueTitle: {
      required
    },
    valueProg: {
      required,
      decimal
    },
    valueTotal: {
      required,
      decimal
    }
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
#input-identifier {
  width: 5rem;
  margin-left: 0.2rem;
  height: 4.5em;
}
#input-prog {
  margin-left: 0.2rem;
  height: 2rem;
}
#input-prog,
#input-total {
  width: 3rem;
  -webkit-appearance: none;
  -moz-appearance: textfield;
}
.button-done {
  right: 1rem;
  bottom: 1rem;
  position: absolute;
}
.button-color {
  right: 1rem;
  bottom: 17rem;
  position: absolute;
}
</style>
