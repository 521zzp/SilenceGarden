<template>
	<div class="container">
		<router-link to="/poem/1">《诗经-关雎》</router-link>
		<span>
			关关雎鸠，在河之洲。
			窈窕淑女，君子好逑。
			参差荇菜，左右流之。
			窈窕淑女，寤寐求之。
			求之不得，寤寐思服。
			悠哉悠哉，辗转反侧。
			参差荇菜，左右采之。
			窈窕淑女，琴瑟友之。
			参差荇菜，左右芼之。
			窈窕淑女，钟鼓乐之。
		</span>
	</div>
</template>

<script>
	
</script>

<style lang="less" scoped="scoped">
@import '../../config/base.less';

.container{
	min-height: 100vh;
	background-image: url(/assets/image/common/poetry-list-bg.jpg);
	background-repeat: no-repeat;
	background-position: center;
	background-size: 100% 100%;
	font-family: @poem;
	font-size: 24px;
}

</style>
