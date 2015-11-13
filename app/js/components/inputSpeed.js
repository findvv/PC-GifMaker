var React = require('react');
module.exports = React.createClass({
  changeSpeed:function(){
    var gap = this.refs.inputSpeed.value;
    this.props.changeSpeed(gap);
  },
  makeCss:function(){
    var gap = this.refs.inputSpeed.value;
    this.props.makeCss(gap);
  },
  render:function(){
    var styleObj={
      display: this.props.btnStyle ? 'block': 'none'
    };
    return(
      <div style={styleObj}>
        <input type="range" className="speed-range" min="20" max="1000" step="1" value={this.props.speed} ref="inputSpeed" onChange={this.changeSpeed}/>
        <p className="speed-info">当前时间间隔为<b>{this.props.speed}</b>ms</p>
        <button type="button" className="btn btn-primary css-button" onClick={this.makeCss}>生成CSS代码</button>
      </div>
    )
  }
});
