<template>
	<!-- :style="{ backgroundImage: `url(${diskBGImg})` }" -->
	<div class="violin-wrap" 
		@keyup.space.prevent="keyBoardChontroller" tabindex="-1" ref="page">
		<div class="violin-bg-content">
			<img class="vioin-bg-img" :src="diskBGImg" :class="{ 'vioin-bg-img-blur': !paused }"/>
		</div>
		<div class="container">
			<div class="title">{{ title }}
			<span style="color: #FFF5E6;">{{ paused }}</span>
			</div>
			
			<!-- 音频控件 -->
			<audio ref="music" :src="aud" @play="startPlay" @pause="pauseListener" @ended="playEnded" :autoplay="true"></audio>
			
			<div class="violin-content">
				<div class="disc">
					<div class="disc-bg"></div>	
					<img :src="discImg" class="melody-disk" :class="{ 'melody-pause': paused }" @click.prevent="preventImageShow"/>	
					<div v-if="isPc" :style="lightScale" class="disk-light" 
						:class="{ 'disk-light-show': !paused }">
					</div>
					<div v-if="isPc" class="disk-controller" :class="{ 'disk-controller-transition': !pointer.flag }"
						:style="{ transform: 'rotate(' + controllerRotate +  'deg)'  }">
					</div>
					
				</div>
				<div class="time-content clearfix">
					<div class="slider-wrap " @mousedown="stopClock" @mouseup="awakenClock">
						<Slider :value="current" :max="max" :step="0.01" :tip-format="currentFormat" @on-change="currentSet"  class="violin-slider"></Slider>
					</div>
					<span class="time-show">{{playTimeFormat(current)}} / {{playTimeFormat(during)}}</span>
				</div>
			</div>
			<!-- 播放控制组件 -->
			<div class="controller">
				<div class="single-circle melody-exchange" @click="playModelChange('single')">
					 <div class="play-model-bg " :class="{ 'play-model-on-bg': model === 'single' }"></div>
					<Tooltip content="单曲循环" placement="top" :delay="800">
			            <Icon type="ios-loop-strong"></Icon>
			        </Tooltip>
				</div>
				<Tooltip content="上一曲" class="last melody-exchange" placement="top" :delay="800">
					<div @click="changeMusic(last, 'last')" class="melody-exchange-box">
						<Icon type="ios-skipbackward" ></Icon>
					</div>
				</Tooltip>
				<Tooltip :content="paused ? '播放' : '暂停' " class="play-puase" placement="top" :delay="800">
					<div @click="playPause" style="width: 60px; height: 60px;">
						<Icon v-show="paused" type="ios-play" style="margin-left: 6px;"></Icon>
						<Icon v-show="!paused" type="ios-pause"></Icon>
					</div>
				</Tooltip>
				<Tooltip content="下一曲" class="next melody-exchange" placement="top" :delay="800">
					<div @click="changeMusic(next, 'next')" class="melody-exchange-box">
						<Icon type="ios-skipforward"></Icon>
					</div>
				</Tooltip>
				<div class="random-play melody-exchange" @click="playModelChange('random')">
					<div class="play-model-bg " :class="{ 'play-model-on-bg': model === 'random' }"></div>
					<Tooltip content="随机播放" placement="top" :delay="800">
						<Icon type="ios-shuffle-strong"></Icon>
					</Tooltip>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { isPc } from '@/utils/tool'
	import { message } from '@/utils/talk'
	import { Slider, Tooltip } from 'iview';
	import { IMG } from '@/config/url'
	export default {
		data () {
			return {
				paused: true, 			//是否暂停状态
				during: '',				//文件时长
				current: 0,				//当前时间
				clock: null,			//定时器,获取更新播放进度
				min: 0, 				//最小值
				max: 0,					//最大值
				model: '', 		//播放模式 single：单曲循环 random：随机播放
				pointer: {
					init_value: -30,
					flag: false, 		//是否跟随播放时间实时更改
				},
				current_src: '', 		//当前播放地址
			}
		},
		computed: {
			melody () {
				return this.$store.state.violin.melody
			},
			isPc () {
				return isPc()
			},
			aud () {
				const store_src = this.$store.state.violin.melody.src;
				const src = store_src ? store_src : this.current_src;
				if (store_src) this.current_src = store_src;
				return `/assets/audio/${src}`
			},
			discImg () {
				let disk_img = this.$store.state.violin.melody.disk_img
				disk_img = disk_img ? disk_img : '四月是你的谎言-disk.png'
				return `${IMG}/violin/${disk_img}`
			},
			diskBGImg () {
				let bg_img = this.$store.state.violin.melody.bg_img
				bg_img = bg_img ? bg_img : '四月是你的谎言-bg.jpg'
				return `${IMG}/violin/${bg_img}`
			},
			//歌曲名
			title () {
				return this.$store.state.violin.melody.name
			},
			//上一曲和下一曲
			last () {
				return this.$store.state.violin.last
			},
			next () {
				return this.$store.state.violin.next
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
					if (this.pointer.flag) {
						return (this.current / this.during) * 11.2 - 4.6
					} else {
						return  (this.pointer.init_value / this.during) * 11.2 - 4.6
					}
				}
			}
		},
		watch: {
			melody () {
				
			}
		},
		created () {
			this.$store.dispatch('violinInint', {})
			this.$store.dispatch('getViolinInfo', { id: this.$route.params.id })
		},
		mounted () {
			//页面聚焦
			this.$refs.page.focus()
    			
			console.log('mounted........................')
			console.log(this.$refs.music)
			const music = this.$refs.music
			const vm = this
			
			//成功获取资源长度  
			music.addEventListener('loadedmetadata', (value) => {
				this.init()
				this.pausedChange()
			})
		},
		// 歌曲参数切换
		beforeRouteUpdate (to, from ,next) {
			const id = to.params.id ? to.params.id : 1
			this.$store.dispatch('getViolinInfo', { id })
			next()
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
			// 播放结束
			playEnded () {
				if (this.model === 'single') {
					this.$refs.music.play()
					//this.$refs.music.load(this.aud)
				} else if (this.model === 'random') {
					if (this.clock) {
						clearInterval(this.clock)
						this.paused = true
					} 
					console.log('随机播放！')
					this.$store.dispatch('getRamdonViolinInfo', { id: this.$route.params.id })
					//this.$router.push('/violin/' + 3)
				} else {
					//停止
					if (this.clock) {
						clearInterval(this.clock)
						this.paused = true
					} 
				}
			},
			//play()和autoplay开始播放时触发  
			startPlay () {
				console.log('playing musci_______________')
				console.log('play()和autoplay开始播放时触发  ')
				console.log('当前播放位置：')
				console.log(this.$refs.music.currentTime)
				this.pointer.init_value = this.$refs.music.currentTime
				this.pausedChange()
				this.startClock()
				//控制指针到位后跟随播放时间变化
				const vm = this
				setTimeout(function () {
					vm.pointer.flag = true
				}, 800)
			},
			//pause()触发 
			pauseListener (){
				this.pointer.flag = false
			},
			exchange (id) {
				this.$router.push('/violin/' + id)
				this.$store.dispatch('getViolinInfo', { id })
			},
			//键盘按键控制
			keyBoardChontroller () {
				console.log('key down')
				this.playPause()
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
			// 播放模式改变
			playModelChange (model) {
				this.model = this.model === model ? '' : model
			},
			// 换歌
			changeMusic (music, type) {
				console.log('音乐切换：' + music)
				console.log('音乐切换类型：' + type)
				if (!music && type === 'last') {
					message('前面什么也没有┐(´∀｀)┌！', 4);
				} else if (!music && type === 'next') {
					message('已经是最后一首啦ヽ(`Д´)ﾉ！', 4);
				} else {
					message('切歌[]~(￣▽￣)~*！', 2);
					this.$router.push(`/violin/${music}`)
				}
			},
			//移动端防止点图片预览
			preventImageShow () {
				return false
			},
		},
		components: {
			Slider,
			Tooltip
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

.title{
	margin-top: 20px;
	font-size: 60px;
	height: 90px;
	font-family: @poem;
	color: #fff; 
	text-shadow: 0 0 1px #fff;
}
.controller{
	width: 310px;
	height: 70px;
	background-color: rgba(255, 255, 255, 0.3);
	margin-left: auto;
	margin-right: auto;
	position: relative;
	border-radius: 4px;
	opacity: .6;
	transition: all .3s;
	margin-top: 30px;
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
.play-model-bg{
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #98FB98;
	top: 0;
	left: 0;
	border-radius: 50%;
	transform: scale(0);
	transition: transform .3s;
}
.play-model-on-bg{
	transform: scale(1);
}
.single-circle-on{
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
.melody-exchange-box{
	width: 30px;
}
.violin-wrap {
	min-height: 100vh;
	overflow: auto;
	background-image: url('@{image}/violin/四月是你的谎言-背景.jpg');
	background-position: center;
	background-attachment: fixed;
	background-repeat: no-repeat;
}
.violin-bg-content{
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: -1;
}
.violin-bg-content:after{
	content: '';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.vioin-bg-img{
	filter: blur(0px);
 	margin:0 calc(50% - 960px);
 	transition: filter ease .8s;
}
.vioin-bg-img-blur{
	filter: blur(16px); 
}
.violin-content{
	max-width: 1200px;
	margin-top: 80px;
	margin-left: auto;
	margin-right: auto;
	user-select:none;
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
	background-size: cover;
	background-repeat: no-repeat;
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
	transition-delay: .8s;
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
	transition: all .5s;
}
.melody-disk{
	position: absolute;
	animation: roll 10s linear infinite;
}
.melody-pause {
	animation-play-state: paused;
	-webkit-animation-play-state: paused;
}
.play{
	font-size: 24px;
	cursor: pointer;
}
.slider-wrap{
	margin-right: 100px;
}
.container{
	width: 100%;
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
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
@-webkit-keyframes wroll{
	from{
		-webkit-transform: rotateZ(0deg);
	}
	to{
		-webkit-transform: rotateZ(360deg);
	}
}
@media only screen and (max-width: @threshold) {
	.disc{
		width: 80vw;
		height: 80vw;
		overflow: hidden;
	}
	.melody-disk{
		width: 100%;
		height: 100%;
	}
	.disk-light, .disk-controller{
		display: none;
	}
	.time-content{
		width: 94%;
		margin-left: auto;
		margin-right: auto;
	}
	.title{
		height: 60px;
		font-size: 28px;
		display: block;
		text-align: center;
	}
	.violin-content{
		margin-top: 2vh;
	}
	.slider-wrap{
		margin-right: 86px;
	}
}
</style>