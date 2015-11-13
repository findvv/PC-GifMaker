var React = require('react');
module.exports = React.createClass({
  componentDidUpdate:function(){
    var result = this.props.result;
    var num = result.imgNum;
    var allCode = '.imgTest{width:'+result.imgWidth+'px;height:'+result.imgHeight+'px;-webkit-animation-name: gif;-webkit-animation-iteration-count:infinite;-webkit-animation-timing-function:step-start;-webkit-animation-duration: '+(result.speed*num)+'ms;animation-name: gif;animation-iteration-count:infinite;animation-timing-function:step-start;animation-duration: '+(result.speed*num)+'ms;}';
    var strings = '';
    for (var i=0;i<num;i++){
      strings += ( 100/num * i + '% {background-position: ' + (-result.originWidth/num * i) + 'px 0;}');
    }
    strings += '100% {background-position: 0 0;}';
    var newStrings = '@-webkit-keyframes gif{'+strings+'}'+'@keyframes gif{'+strings+'}';
    this.refs.code.innerHTML=allCode+newStrings;
  },
  render:function(){
    var result = this.props.result,
        styleObj={
          display: result.showResult ? 'block': 'none'
        };  
    return(
      <div style={styleObj}>
        <p className="resultHelp">注意，以下代码的类名为imgTest，需要自行设置background-image样式。</p>
        <div className="resultArea" ref="code"></div>
      </div>
    )
  }
});
