<template>
	<div class="top-left">
		<ul>
			<li class="text-muted">
				<div style="color:#fff;">实时温度</div>
				<div style="color:#5B92FF">temperature</div>
			</li>
		</ul>
		<div class="temperature">
			<div class="t-title">
				<countTo :startVal='startVal' :endVal='endVal' :duration='5000'></countTo>
				<div>{{endVal}}</div>
			</div>
			<div class="t-describe">当前温度 &#176;C</div>
			<div class="unboder">
			<img src="http://dev.thingspanel.cn/extensions/humiture/view/5.png" alt="">
			</div>
		</div>
		<div class="ordie">
			<div>
			<img src="http://dev.thingspanel.cn/extensions/humiture/view/3.png" alt="">
			</div>
			<div class="info">
			<div>当前温度偏高，请调试温度</div>
			</div>
		</div>
		<div class="box"></div>
	</div>
</template> 
<script>
	export default {
		props: {
			id: '',
			loading: {
				type: Boolean,
				default: true,
			},
			legend: {
				type: Boolean,
				default: true,
			},
			apiData: {
				type: Object,
			},
			title: {
				type: String,
				default: "",
			},
			colorStart: {
				type: String,
				default: "#7956EC",
			},
			colorEnd: {
				type: String,
				default: "#3CECCF",
			},
		},
		data() {
			return {
				latest: {},  //最新的一组数据
				fields: [], //多组数据 ，首次推送是全量，后续增量
				startVal:0,//温度初始值
				endVal:36,  //温度最新值
			};
		},
		computed: {
		},
		watch: {
			apiData: {
				// deep: true,
				immediate: true,
				handler(val, oldVal) {
					var _this = this;
					if (!_this.loading) {
						if (val['fields']) {
							_this.latest = val["latest"];
							_this.fields = val["fields"];
							// _this.endVal = _this.latest['endVal']
						}
					}
				},
			},
			colorStart() {},
			colorEnd() {},
			legend(val, oldVal) {
			},
		},
		methods: {
		},
	};
</script>

<style scoped>
	.text-muted{
		position:absolute;
		top:46px;
		left:22px;
	}
	.temperature{
		color:#fff;
		margin:30px auto;
		width:212px;
		height:150px;
		text-align:center;
		background:url('http://dev.thingspanel.cn/extensions/humiture/view/1.png') 0 0/212px 150px;
	}
	.t-title{
	    font-size:60px;
	    font-weight:bold;
	}
	.t-describe{
		margin-top:-10px;
		font-size:10px;
	}
	.unboder img{
	width: 82px;
	height: 13px;

	}
	.ordie{
	display:flex;
	align-items:center;
	padding:2px;
	width:95%;
	margin:auto;
	background-color:#1B2554;
	border-radius:20px;
	}
	.ordie .info{
	margin-left:5px;
	}
	.info div:nth-child(1){
	color:#fff;
	}
</style>
