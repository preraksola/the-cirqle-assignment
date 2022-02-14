<template>
	<Interests />
</template>

<script>
	import Interests from "@/components/Interests";

	export default {
		name: "App",
		components: {
			Interests
		}
	};
</script>

<style>
	#app {
		font-family: "Roboto Light", Helvetica, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		margin-top: 30px;
	}
</style>
