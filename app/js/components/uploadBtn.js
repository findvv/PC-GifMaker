var React = require('react');
module.exports = React.createClass({
  uploadImg:function(){
    var that = this;
    var a = this.refs.upload.files[0];
    if (a.type && !/image\/\w+/.test(a.type)) {alert('请上传图片')};
    var b = new FileReader;
    b.readAsDataURL(a);
    b.onload = function() {
      var b = this.result;
      var img = new Image();
      img.src = b;
      img.onload = function(){
        var w = img.width,
            h = img.height;
        that.props.imgChange(b,w,h);
      }
    }
  },
  render:function(){
    var styleObj={
      display: this.props.btnStyle ? 'block': 'none'
    }
    return(
      <div className="button" style={styleObj}>
        <button type="button" className="btn btn-primary upload-button">上传图片</button>
        <input type="file" name="file" className="upload" id="userImg" onChange={this.uploadImg} ref="upload"/>
      </div>
    )
  }
});