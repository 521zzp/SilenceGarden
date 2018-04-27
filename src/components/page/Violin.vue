<template>
	<div class="violin-wrap">
		<audio ref="music" :src="aud" @play="startPlay" :autoplay="true"></audio>
		<div class="violin-content">
			<div class="disc">
				<div class="disc-bg"></div>	
				<img src="/assets/image/violin/四月是你的谎言.png" class="melody-disk" :class="{ 'melody-pause': paused }"/>	
				<div :style="lightScale" class="disk-light" 
					:class="{ 'disk-light-show': !paused }">
					
				</div>
				<div class="disk-controller" :style="{ transform: 'rotate(' + controllerRotate +  'deg)'  }">
				</div>
				
			</div>
			<div class="time-content clearfix">
				<div class="slider-wrap " @mousedown="stopClock" @mouseup="awakenClock">
					<Slider :value="current" :max="max" :step="0.01" :tip-format="currentFormat" @on-change="currentSet"  class="violin-slider"></Slider>
				</div>
				<span class="time-show">{{playTimeFormat(current)}} / {{playTimeFormat(during)}}</span>
			</div>
		</div>
		<div class="controller">
			<div class="single-circle melody-exchange" 
				 :class="{ 'single-circle-on': model === 'single' }">
				<Icon type="ios-loop-strong"></Icon>
			</div>
			<div class="last melody-exchange">
				<Icon type="ios-skipbackward"></Icon>
			</div>
			<div class="play-puase" @click="playPause">
				<Icon v-show="paused" type="ios-play" style="margin-left: 8px;"></Icon>
				<Icon v-show="!paused" type="ios-pause"></Icon>
			</div>
			<div class="next melody-exchange">
				<Icon type="ios-skipforward"></Icon>
			</div>
			<div class="random-play melody-exchange">
				<Icon type="ios-shuffle-strong"></Icon>
			</div>
		</div>
<!--		<span class="play" @click="a">
			<span v-show="!paused">暂停</span>
			<span v-show="paused">播放</span>
		</span>
-->		<div>
			<div @click="exchange(1)">爱的忧伤-低音质.mp3</div>
			<div @click="exchange(2)">汐.mp3</div>
		</div>
	</div>
</template>

<script>
	import { Slider } from 'iview';
	export default {
		data () {
			return {
				paused: true, 			//是否暂停状态
				during: '',				//文件时长
				current: 0,				//当前时间
				clock: null,			//定时器,获取更新播放进度
				min: 0, 				//最小值
				max: 0,					//最大值
				model: 'single', 		//播放模式 single：单曲循环 random：随机播放
			}
		},
		computed: {
			melody () {
				return this.$store.state.violin.melody
			},
			aud () {
				return this.$store.state.violin.melody.src
			},
			discImg () {
				
			},
			// 光线缩放与选择控制
			lightScale () {
				let scale, rorate;
				try {
					scale = 1.17 - (this.current / this.during) * 0.4
					rorate = (this.current / this.during) * 12 - 6
				} catch (e) {
					
				}
					return {
						transform: `scale(${scale}) rotate(${rorate}deg)`
					}
			},
			// 磁盘指针角度控制
			controllerRotate () {
				if (this.paused) {
					return -30
				} else {
					return (this.current / this.during) * 11.2 - 4.6
				}
			}
		},
		watch: {
			melody () {
				
			}
		},
		created () {
			this.$store.dispatch('getViolinInfo', { id: this.$route.params.id })
		},
		mounted () {
			console.log('mounted........................')
			console.log(this.$refs.music)
			const music = this.$refs.music
			const vm = this
			
			//成功获取资源长度  
			music.addEventListener('loadedmetadata', (value) => {
				this.init()
				this.pausedChange()
			})
			music.addEventListener('ended', (value) => {
				if (this.clock) {
					clearInterval(this.clock)
					this.paused = true
				} 
			})
			//play()和autoplay开始播放时触发  
			music.addEventListener('play', (value) => {
				
			})
		},
		beforeDestroy () {
			console.log('曲子播放组件即将销毁')
		},
		destroyed () {
			console.log('曲子播放组件已经销毁')
			if (this.clock) {
				clearInterval(this.clock)
			}
		},
		methods: {
			//play()和autoplay开始播放时触发  
			startPlay () {
				console.log('playing musci_______________')
				console.log('play()和autoplay开始播放时触发  ')
				this.pausedChange()
				this.startClock()
			},
			exchange (id) {
				this.$router.push('/violin/' + id)
				this.$store.dispatch('getViolinInfo', { id })
			},
			playPause () {
				console.log(this.$refs.music)
				console.log(this.$refs.music.paused)
				const music = this.$refs.music
				music.paused ? music.play() : music.pause()
				this.pausedChange()
				this.startClock ()
				if (!music.paused) {
					const vm = this
					setTimeout(function () {
						console.log('claer delay')
						console.log(vm.paused)
					}, 800)
				}
			},
			pausedChange () {
				console.log('audio suorce')
				console.log(this.$refs.music)
				console.log()
				console.log('change playing status')
				console.log(this.$refs.music.paused)
				console.log()
				console.log('change playing during')
				console.log(this.$refs.music.duration)
				console.log(this.$refs.music.currentTime)
				this.paused = this.$refs.music.paused
			},
			// 播放组件初始化
			init () {
				console.log('初始化')
				this.min = 0
				this.max = this.$refs.music.duration
				this.paused = this.$refs.music.paused
				this.during = this.$refs.music.duration
				console.log('当前暂停状态:' + this.paused)
			},
			// 开始计时器
			startClock () {
				console.log(this.$refs.music.play.playing)
				this.stopClock()
				const vm = this
				this.clock = setInterval( () => {
					vm.current = vm.$refs.music.currentTime
				}, 30)
			},
			// 停止计时器
			stopClock () {
				if (this.clock) {
					clearInterval(this.clock)
				}
			},
			awakenClock (){
			},
			// 更改播放位置
			currentSet (value){
				console.log('播放位置更改')
				this.$refs.music.currentTime = value
				this.startClock()
			},
			currentFormat (value) {
				return this.playTimeFormat(value)				
			},
			// 播放时间格式化
			playTimeFormat (value) {
				if (value) {
					let minu = Math.floor(value / 60)
					minu = minu > 0 && minu < 10 ? '0' + minu : minu
					minu = minu ? minu + ' : ' : '00 : '
					let sec = (value % 60).toFixed(0)
					sec = sec < 10 ? '0' + sec : sec
					return minu + sec
				} else {
					return '00 : 00'
				}
			},
		},
		components: {
			Slider
		}
		
	}
</script>

<style type="text/css">
.violin-slider .ivu-slider-bar{
	background: #4F4F4F;
}
.violin-slider .ivu-slider-button{
	background-color: #383838;
	border-color: #383838;
}
</style>
<style scoped="scoped" lang="less">
@import '../../config/base.less';

.controller{
	width: 310px;
	height: 70px;
	background-color: rgba(255, 255, 255, 0.3);
	margin-left: auto;
	margin-right: auto;
	position: relative;
	border-radius: 4px;
	opacity: 1;
	transition: all .3s;
}
.controller:hover{
	opacity: 1;
}
.play-puase:hover{
	cursor: pointer;
	color:  #000000;
	border: 2px solid #000;
}
.play-puase{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	font-size: 40px;
	text-align: center;
	margin: auto auto;
	width: 60px;
	height: 60px;
	border: 1px solid #2C3E50;
	border-radius: 50%;
	transition: all .3s;
}
.last{
	left: 70px;
}
.next{
	right: 70px;
}
.single-circle{
	left: 10px;
	border-radius: 50%;
}
.single-circle-on{
	background: radial-gradient(circle, white 30%, gray 70%);
}
.random-play{
	right: 10px;
}
.melody-exchange:hover{
	cursor: pointer;
	color: #000;
}
.melody-exchange{
	position: absolute;
	width: 30px;
	height: 30px;
	font-size: 30px;
	margin-top: auto;
	margin-bottom: auto;
	top: 0;
	text-align: center;
	line-height: 30px;
	bottom: 0;
	transition: all .3s;
}
.violin-wrap{
	min-height: 100vh;
	overflow: auto;
	background-image: url('@{image}/violin/四月是你的谎言-背景.jpg');
	background-position: center;
	background-attachment: fixed;
	
}
.violin-content{
	max-width: 1200px;
	margin-top: 160px;
	margin-left: auto;
	margin-right: auto;
}
.disc{
	position: relative;
	width: 490px;
	height: 490px;
	margin-left: auto;
	margin-right: auto;
}
.disc-bg{
	width: 100%;
	height: 100%;
	background-image: url('@{image}/violin/disk.png');
	position: absolute;
	left: 0;
	top: 0;
}
.disk-light{
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 0;
	transform-origin: center;
	transition: opacity .8s;
	background-image: url('@{image}/violin/disk-light.png');
}
.disk-light-show{
	opacity: 1;
	transition-delay: 1s;
}
.disk-controller{
	position: absolute;
	width: 259px;
	height:527px;
	right: -107px;
	top: -94px;
	background-image: url('@{image}/violin/disk-controllerArm.png');
	transform: rotate(-30deg);
	/*transform-origin: 85% 15%;*/
	transform-origin: 83.78% 11.2%;
	transition: all .3s;
}
.disk-controller.disk-controller-on{
	
}
.melody-disk{
	position: absolute;
	animation: roll 10s linear infinite;
}
.melody-pause {
	animation-play-state: paused;
}
.play{
	font-size: 24px;
	cursor: pointer;
}
.slider-wrap{
	margin-right: 100px;
}
.time-show{
	color: #000000;
	float: right;
	margin-top: -26px;
	/*background-color: rgba(255, 255, 255, 0.3);
	padding: 0 5px;
	border-radius: 4px;*/
}
@keyframes roll{
	from{
		transform: rotateZ(0deg);
	}
	to{
		transform: rotateZ(360deg);
	}
}
</style>