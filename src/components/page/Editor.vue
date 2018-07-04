<template>
	<div class="write-container">
		<mavon-editor style="height: calc(100vh - 80px)"></mavon-editor>
	</div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
	data () {
		return {
			
		}
	},
	components: {
		mavonEditor
	}
}
	
</script>

<style lang="less" scoped="scoped">
.write-container{
	height: 100vh;
}
	
</style>