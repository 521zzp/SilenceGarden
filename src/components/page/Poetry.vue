<template>
	<div class="container">
		<div class="content">
			<Row v-for="item,index in catalog" :key="index" type="flex" justify="center">
				
				<Col :sm="8" :lg="6" :xs="14">
					<router-link :to="'/poem/'+item.title" class="item">{{ item.title }}</router-link>
				</Col>
				
			</Row>
			<!--<Row  type="flex" justify="center">
				<Col :sm="8" :lg="6" :xs="14">
					<router-link to="/poem/采薇" class="item">采薇</router-link>
				</Col>
			</Row>-->
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
		catalog () {
			return this.$store.state.poetry.catalog
		}
	},
	created () {
		this.$store.dispatch('getPoetryCatalog')
	},
	methods: {
		
		
		
		aa (arr) {
			for (var i = 0; i < arr.length; i++) {
				for (var j =0; j< arr[i].length; i++) {
					console.log(arr[i][j])
				}
			}
		}
	}
}
</script>

<style lang="less" scoped="scoped">
@import '../../config/base.less';

.item{
	color: #000000;
	display: block;
	font-size: 36px;
	transition: all .5s;
}
.item:hover{
	color: #57a3f3;
}
.container{
	height: 100vh;
	overflow: auto;
	background-image: url(/assets/image/common/poetry-list-bg.jpg);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	font-family: @poem;
	font-size: 24px;
	background-attachment: fixed;
}
.title{
	font-size: 36px
}

</style>
