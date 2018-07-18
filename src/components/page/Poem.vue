<template>
	<div class="container" :style="bgimage">
		<div class="wrap">
			<div class="title">{{ poem.title }}</div>
			<!--<div class="info">相关信息</div>-->
			<div v-if="section" class="content">
				<section class="section" v-for="list in content" :key="list.id">
					<span v-for="item,index in list" :key="index" class="sentence" :class="poem.type === 'poem' ? 'poem' : 'essay' ">{{item}}</span>
				</section>
			</div>
			<div v-else class="content">
				<section class="section">
					<span v-for="item,index in content" :key="index" class="sentence" :class="poem.type === 'poem' ? 'poem' : 'essay' ">{{item}}</span>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
	import { IMG } from '@/config/url'
	import { isPc } from '@/utils/tool'
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
			},
      loading () {
        return this.$store.state.poetry.poem_loading
      },
			bgimage () {
				if (this.poem.img && this.poem.img.length > 0) {
					const path = IMG + '/poem-bg/'
					return {
						backgroundImage: isPc() ? `url(${path + this.poem.img[0]})` : `url(${path + this.poem.img[1]})`
					}
				} else{
					return {

					}
				}
			}
		},
		created () {
			const title = this.$route.params.title
			this.$store.dispatch('getPoemByTitle', { title })
		},
	}
</script>

<style scoped="scoped" lang="less">
@import '../../config/base.less';

.container{
	color: #000000;
	height: 100vh;
	overflow: auto;
	background-image: url(/assets/image/poem-bg/poem-default.jpg);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-attachment: fixed;
}
.title{
	display: block;
	text-align: center;
	font-size: 48px;
}
.wrap{
	font-family: @poem;
	max-width: 1000px;
	margin: 0 auto;
	margin-top: 50px;
	padding: 0 1em;
	border-radius: @bbr;
}
.sentence{
	display: block;
}
.poem{
	text-align: center;
}
.essay{
	text-indent: 2em;
}
.content{
	font-size: 36px;
}
.section{
	margin-bottom: 1.2em;
}
@media only screen and (max-width: @threshold) {
	.wrap{
		width: 94%;
		margin-top: 8vh;
		padding: 0 0;
		background-color: rgba(255, 255, 255, 0.3);
	}
	.title{
		font-size: 42px;
	}
	.content{
		font-size: 26px;
	}
	.container{
		background-image: url(/assets/image/poem-bg/poem-default-m.jpg);
	}
}
</style>

