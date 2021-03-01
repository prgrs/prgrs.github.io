<template>
  <div class="card">
    <div class="card-body">
      <h4>
        <gb-input
          v-model="valueTitle"
          placeholder="Title"
          :status="statusTitle"
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
        <gb-input @change="progChanged" id="input-prog" size="mini" v-model="valueProg" />
        <p>/</p>
        <gb-input @change="totalChanged" id="input-total" size="mini" v-model="valueTotal" />
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
      <gb-button
        @click="done_clicked"
        class="button-done"
        :circular="true"
        left-icon="done"
      />
    </div>
  </div>
</template>

<script>
import VueCircle from "vue2-circle-progress";

export default {
  name: "NewCard",
  components: {
    VueCircle
  },
  props: {
    title: String,
    identifier: String, // month, week etc.
    percent: Number,
    colors: Array,
		authUser: Object,
  },
	methods: {
		progChanged(value, name, event) {
			console.log(value);
			this.currentProgress = String(value);
		},
		totalChanged(value, name, event) {
			console.log(value);
			this.total = String(value);
		},
		addToDB(item) {
			if(!this.authUser) return;
      db.ref("users/" + this.authUser.uid +"/list")
				.push().set(item)
				.then(() => {
          console.log("Success");
        })
        .catch(() => {
          console.error("Error");
        });

		},
		done_clicked() {
			console.log(this.valueTitle);
			console.log(this.valueIdentifier);
			console.log(this.valueProg);
			console.log(this.valueTotal);
			let item = {};
			item.name = this.valueTitle;
			item.identifier = this.valueIdentifier;
			item.progress = this.valueProg;
			item.total = this.valueTotal;
			
			this.addToDB(item);
//			if(!this.valueTitle || this.valueTitle === "") {
//				console.log("here");
//				this.statusTitle = "error";
//			}
		},
	},
	created() {
	},
  data() {
    return {
      fill: { gradient: this.colors },
      percentage: this.percent,
			titleCheck: true, 
			currentProgress: 0,
			total: 0,
			valueTitle: "",
			valueIdentifier: "",
			valueTotal: "",
			valueProg: "",
			statusTitle: "normal",
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
#input-identifier {
  width: 6rem;
}
#input-prog {
  width: 3rem;
}
#input-total {
  width: 3rem;
}
.button-done {
  right: 1rem;
  bottom: 1rem;
  position: absolute;
}
</style>
