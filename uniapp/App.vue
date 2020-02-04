<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
  .show-arrow {
    flex: 1;
    padding-right: 40upx;
    overflow: hidden;
    position: relative;
    text-align: right;
    line-height: 100upx;
  }
  .show-arrow::after{
    font-family: cuIcon;
    display: block;
    content: "\E6A3";
    position: absolute;
    font-size: 17px;
    color: #8799a3;
    line-height: 100upx;
    width: 60upx;
    text-align: center;
    top: 0;
    bottom: 0;
    right: -20upx;
    margin: auto;
  }

  .q-fixed {
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .uni-input-form{
    height: 100%;
  }

  .padding-25 {
    padding: 25rpx;
  }
  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
  }
  .border-bottom {
    border: 1rpx solid #eee;
  }
</style>
