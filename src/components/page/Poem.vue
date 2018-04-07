<template>
	<div class="container">
		<div class="wrap">
			<div class="title">{{ poem.title }}</div>
			<!--<div class="info">相关信息</div>-->
			<div v-if="section" class="content">
				<section class="section" v-for="list in content" :key="list.id">
					<span v-for="item,index in list" :key="index" class="sentence">{{item}}</span>
				</section>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		}, 
		computed: {
			poem () {
				return this.$store.state.poetry.poem
			},
			section () {
				return this.poem.section
			},
			content () {
				return this.poem.content
			}
		},
		mounted () {
			const title = this.$route.params.title
			this.$store.dispatch('getPoemByTitle', { title })
		}
	}
</script>

<style scoped="scoped" lang="less">
@import '../../config/base.less';

.title{
	display: block;
	text-align: center;
	font-size: 36px;
}
.wrap{
	font-family: @poem;
}
.sentence{
	display: block;
	text-align: center;
}
.content{
	font-size: 24px;
}
.section{
	margin-bottom: 1.5em;
}
</style>