<template>
	<div>
		<router-link v-for="item,index in catalog"  :to="'/violin/' + item._id" class="item poetry" :key="index">
			<span>{{ item.name }}</span>
		</router-link>
				
	</div>
</template>

<script>
	export default {
		created () {
			this.$store.dispatch('getVillinCatalog')
		},
		computed: {
			catalog () {
				return this.$store.state.violin.catalog
			}
		}
	}
</script>

<style>
</style>