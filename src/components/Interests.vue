<template>
	<div class="row">
		<div class="card interest-selection" v-if="!isLoading">
			<h3>Available Interests</h3>
			<pre v-if="interestTree.length === 0">None</pre>
			<div v-for="p in interestTree" v-bind:key="p.name" class="interest-checkbox">
				<input type="checkbox" v-model="selectedInterests" :name="p.name" :value="p.name" :id="p.id" @change="onTicked" />
				<label :for="p.id">{{ p.name }}</label>
			</div>
		</div>

		<div class="interest-list" v-if="!isLoading">
			<h3>Selected Interests</h3>
			<pre> {{ selectionStructure.length > 0 ? JSON.stringify(selectionStructure, null, 2) : "None" }}</pre>
		</div>
		<div v-if="isLoading">
			<span>Loading data...</span>
		</div>
	</div>
</template>

<script>
	import { getInterests } from "@/utilities/api-access";

	export default {
		name: "Interests",
		data() {
			return {
				isLoading: false,
				interestTree: [],
				selectionStructure: [],
				selectedInterests: []
			};
		},
		mounted() {
			this.getData();
		},
		methods: {
			onTicked() {
				console.log(this.selectedInterests);
				this.selectionStructure = this.selectedInterests.map((i) => this.interestTree.find((int) => int.name === i));
				this.selectionStructure.forEach((ss) => this.cleanUpData(ss));
			},
			cleanUpData(data) {
				if (data.children?.length > 0) {
					data.children.forEach((c) => this.cleanUpData(c));
				} else {
					delete data.children;
				}
				return data;
			},
			getData() {
				this.isLoading = true;
				getInterests()
					.then((res) => {
						let data = res.data;
						if (data.status === 1) {
							let interestData = data.interests;
							this.interestTree = this.getTree(interestData);
						} else {
							console.error(data.message);
							alert("Error fetching data!");
						}
						this.isLoading = false;
					})
					.catch((err) => {
						console.error(err);
						this.isLoading = false;
					});
			},
			getTree(interestData) {
				let result = [];

				let tmp = {
					children: result
				};

				interestData.forEach(function (interest) {
					interest.path.reduce(function (acc, path) {
						if (!acc[path]) {
							acc[path] = {
								children: []
							};
							acc.children.push({
								name: path,
								children: acc[path].children
							});
						}
						return acc[path];
					}, tmp);
				});
				return result;
			}
		}
	};
</script>

<style>
	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		padding: 1vw;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: flex-start;
	}

	.interest-selection {
		width: 30%;
	}

	.interest-list {
		width: 50%;
	}

	.interest-checkbox {
		padding: 0.5vh 0;
	}
</style>
