<template>
	<div class="container">
		<div class="content">
			<Row type="flex" justify="center">
				<Col v-for="item,index in catalog" class="item-block" :key="index" :sm="8" :lg="6" :xs="14">
					<router-link :to="'/poem/'+item.title" class="item animated ">{{ item.title }}</router-link>
				</Col>

        <Col :sm="8" :lg="6" :xs="14"></Col>
        <Col :sm="8" :lg="6" :xs="14"></Col>
        <Col :sm="8" :lg="6" :xs="14"></Col>
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
    color: #383838;
    display: inline-block;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 36px;
    transition: all .5s;
    //background: linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(255, 255, 288, 0.8));
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.4), rgba(255, 255, 288, 0.8));
  }
  .item:hover{
    color: #2b85e4;
    animation-name: jello;
    transform-origin: center;
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.3), rgba(255, 255, 288, 0.4));
  }
  .item-block{
    margin-bottom: 5px;
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
  .content{
    max-width: 1400px;
    margin: 100px auto;

  }

</style>
