var React = require('react');
module.exports = React.createClass({
  render:function(){
    var showResult = this.props.showResult,
        styleObj={
          display: showResult ? 'block': 'none'
        };  
    return(
      <div style={styleObj}>
        <p className="resultHelp">注意，以下代码的类名为imgTest，需要自行设置background-image样式。</p>
        <div className="resultArea">{this.props.result}</div>
      </div>
    )
  }
});
