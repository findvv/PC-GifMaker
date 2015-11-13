var React = require('react');
module.exports = React.createClass({
  render:function(){
    var imgState = this.props.imgStyle,
        divStyle = {
          backgroundImage:('url('+imgState.src+')'),
          width:imgState.imgWidth,
          height:imgState.imgHeight,
          margin:'0 auto',
          backgroundPositionX:imgState.positionX
        },
        styleObj={
          display: imgState.showImg ? 'block': 'none'
        };
    return(
      <div className="imgArea" style={styleObj}>
        <div className="imgDiv" style={divStyle}></div>
      </div>
    )
  }
});
