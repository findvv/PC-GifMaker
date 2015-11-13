var React = require('react');
module.exports = React.createClass({
  numOk:function(e){
    e.preventDefault();
    var num = this.refs.inputNum.value;
    var gap = this.refs.inputGap.value;
    if ( num>0 && gap>19) {
      this.props.numChange(num,gap);      
    }
    else{
      alert('请输入合适的数字');
      this.refs.inputNum.value = '';
      this.refs.inputGap.value = '';
    }
  },
  render:function(){
    var styleObj={
      display: this.props.btnStyle ? 'block': 'none'
    }
    return(
      <div className="inputNum" style={styleObj}>
        <input className="form-control input-num"  placeholder="一张图片有几帧" ref="inputNum"/>
        <input className="form-control input-num"  placeholder="每帧之间间隔多少ms(大于20)" ref="inputGap"/>
        <button type="button" className="btn btn-primary num-button" onClick={this.numOk}>确认</button>
      </div>
    )
  }
});