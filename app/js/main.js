var React = require('react');
var ReactDOM = require('react-dom');
var UploadBtn = require('./components/uploadBtn.js');
var InputNumBtn = require('./components/inputNumBtn.js');
var ImgArea= require('./components/imgArea.js');
var InputSpeed = require('./components/inputSpeed.js');
var ResultArea = require('./components/resultArea.js');
window.animageIntervel = null;
var MainArea = React.createClass({
  getInitialState: function() {
    var states = {
      src:'',
      showUploadBtn:true,
      showNumBtn:false,
      showSpeed:false,
      showImg:true,
      showResult:false,
      info:'第一步--上传图片',
      imgWidth:0,
      imgHeight:0,
      originWidth:0,
      positionX:0,
      imgNum:0,
      speed:0
    }
    return states;
  },
  imgChange:function(src,width,height){
    this.setState({
      src:src,
      showUploadBtn:false,
      showNumBtn:true,
      info:'第二步--确定帧数和动画速度',
      originWidth:width,
      imgWidth:width,
      imgHeight:height
    });
  },
  beginAnimate:function(num,gap){
    var startNum = 0,
        startPositionX = 0,
        imgW = this.state.originWidth,
        that = this;
    window.animageIntervel = setInterval(function(){
      startPositionX -= imgW/num;
      startNum+=1;
      if (startNum == num) {
        startNum = 0;
        startPositionX = 0;
      }
      that.setState({
        positionX:startPositionX
      });
    },gap);
  },
  resetInterval:function(gap){
    var num = this.state.imgNum;
    window.clearInterval(animageIntervel);
    this.beginAnimate(num,gap);
    this.setState({
      speed:gap
    });
  },
  numChange:function(num,gap){
    var imgW = this.state.imgWidth;
    this.setState({
      showNumBtn:false,
      showSpeed:true,
      info:'第三步--调整动画速度',
      imgNum:num,
      imgWidth:imgW/num,
      speed:gap
    });
    this.beginAnimate(num,gap);
  },
  makeCss:function(gap){
    window.clearInterval(animageIntervel);
    this.setState({
      showSpeed:false,
      showImg:false,
      showResult:true,
      info:'第四步--生成CSS代码'
    });
    var num = this.state.imgNum;
  },
  render:function(){
    return(
      <div className="main">
        <div className="helpInfo">{this.state.info}</div>
        <ImgArea imgStyle={this.state} />
        <UploadBtn imgChange={this.imgChange} btnStyle={this.state.showUploadBtn} />
        <InputNumBtn btnStyle={this.state.showNumBtn} numChange={this.numChange} />
        <InputSpeed btnStyle={this.state.showSpeed} changeSpeed={this.resetInterval} speed={this.state.speed} makeCss={this.makeCss} />
        <ResultArea result={this.state} />   
      </div>
    )
  }
});
ReactDOM.render(<MainArea />,document.getElementById('reactMain'));

