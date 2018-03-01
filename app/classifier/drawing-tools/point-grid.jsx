/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const React = require('react');
const createReactClass = require('create-react-class');
const DrawingToolRoot = require('./root');
const deleteIfOutOfBounds = require('./delete-if-out-of-bounds');
const isInBounds = require('../../lib/is-in-bounds');
const DeleteButton = require('./delete-button');

const DELETE_BUTTON_ANGLE = 45;
const SELECTED_RADIUS = {
  large: 20,
  small: 10
};

module.exports = createReactClass({
  displayName: 'PointGridTool',

  statics: {
    defaultValues({x, y}) {
      return {x, y};
    },

    initStart({x, y}) {
      return {x: x, y: y, _inProgress: true};
    },

    initRelease() {
      return {_inProgress: false}
    },

    initValid(mark, props) {
      console.log(mark, props, props.task.tools[mark.tool])
      const naturalWidth = props.naturalWidth
      const naturalHeight = props.naturalHeight
      const offset_x = Number.parseInt(props.task.tools[mark.tool].x_offset)
      const offset_y = Number.parseInt(props.task.tools[mark.tool].y_offset)

      const notBeyondWidth = mark.x < naturalWidth;
      const notBeyondHeight = mark.y < naturalHeight;
      const beyondOffset = mark.x > offset_x && mark.y > offset_y

      return notBeyondWidth && notBeyondHeight && beyondOffset;
    },

    options: ['grid']
  },

  getDefaultProps() {
      return {
        rows: 10,
        cols: 10,
        offset_x: 50,
        offset_y: 50,
        opacity: 50,
      };
    },

  getDeleteButtonPosition() {
    const theta = (DELETE_BUTTON_ANGLE) * (Math.PI / 180);
    return {
      x: (SELECTED_RADIUS.large / this.props.scale.horizontal) * Math.cos(theta),
      y: -1 * (SELECTED_RADIUS.large / this.props.scale.vertical) * Math.sin(theta)
    };
  },

  render() {
    const { offset_x } = this.props;
    const { offset_y } = this.props;

    const width = ((this.props.containerRect.width / this.props.scale.horizontal)-offset_x) / this.props.rows; 
    const height = ((this.props.containerRect.height / this.props.scale.vertical) - offset_y) / this.props.cols;

    let x = (this.props.mark.x-offset_x);
    let y = (this.props.mark.y-offset_y);

    x = (Math.floor(x/width));
    y = Math.floor(y/height);

    x = (x*width)+offset_x;
    y = (y*height)+offset_y;

    let tool_args = {"tool": (this), "transform": `translate(${x}, ${y})`}
    // tool_args.onClick = (this.destroyTool);
    
    return React.createElement(DrawingToolRoot, tool_args,
      React.createElement("rect", {"x": "0", "y": "0", "width": `${width}`, "height": `${height}`,  
        "fill": `${this.props.color}`, "fillOpacity": `${this.props.opacity / 100}`, "strokeOpacity": "0"}),

      (this.props.selected ?
        React.createElement(DeleteButton, Object.assign({"tool": (this)}, this.getDeleteButtonPosition(), {"getScreenCurrentTransformationMatrix": (this.props.getScreenCurrentTransformationMatrix)})) : undefined)
    );
  },

  destroyTool() {
    if (this.props.mark._inProgress == false) {
      return this.setState({destroying: true}, () => {
        return setTimeout(this.props.onDestroy, 300);
      });
    }
  }
});
