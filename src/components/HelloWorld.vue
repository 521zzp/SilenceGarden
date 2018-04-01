<template>
  <div class="hello" @click="bgmplay">
  		曾志鹏的个人网站，开发中……
  		<audio src="/assets/audio/汐.mp3" ref="bgm"  loop="loop"></audio>
  		<h3>湘君</h3>
  		<span>君不行兮夷犹，蹇谁留兮中洲？</span>
  		<span>美要眇兮宜修，沛吾乘兮桂舟。</span>
  		<span>令沅湘兮无波，使江水兮安流！</span>
  		<span>望夫君兮未来，吹参差兮谁思？</span>
  		<span>驾飞龙兮北征，邅吾道兮洞庭。</span>
  		<span>薜荔柏兮蕙绸，荪桡兮兰旌。</span>
  		<span>望涔阳兮极浦，横大江兮扬灵。</span>
  		<span>扬灵兮未极，女婵媛兮为余太息。</span>
  		<span>横流涕兮潺湲，隐思君兮陫侧。</span>
  		<span>桂櫂兮兰枻，斫冰兮积雪。</span>
  		<span>采薜荔兮水中，搴芙蓉兮木末。</span>
  		<span>心不同兮媒劳，恩不甚兮轻绝。</span>
  		<span>石濑兮浅浅，飞龙兮翩翩。</span>
  		<span>交不忠兮怨长，期不信兮告余以不闲。</span>
  		<span>鼌骋骛兮江皋，夕弭节兮北渚。</span>
  		<span>鸟次兮屋上，水周兮堂下。</span>
  		<span>捐余玦兮江中，遗余佩兮澧浦。</span>
  		<span>采芳洲兮杜若，将以遗兮下女。</span>
  		<span>时不可兮再得，聊逍遥兮容与。</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
  	bgmplay () {
  		this.$refs.bgm.play()
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
span{
	display: block;
}
.hello{
	padding-top: 60px;
	height: 100vh;
	width: 100vw;
	background-image: url(/assets/image/home-bg.jpg);
	overflow: hidden;
	box-sizing: border-box;
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
}
</style>
