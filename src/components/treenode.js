import React from "react";
import PropTypes from "prop-types";
import "./treenode.css"
export default class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            color: props.color,
            cx: props.cx,
            cy: props.cy,
        };
    }
    static propTypes = {
        text: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        cx: PropTypes.number.isRequired,
        cy: PropTypes.number.isRequired,
        x11: PropTypes.number.isRequired,
        x12: PropTypes.number.isRequired,
        y11: PropTypes.number.isRequired,
        y12: PropTypes.number.isRequired,
        x21: PropTypes.number.isRequired,
        x22: PropTypes.number.isRequired,
        y21: PropTypes.number.isRequired,
        y22: PropTypes.number.isRequired,
    }
    static defaultProps = {
        text: 1,
        color: "blue",
        cx: 50,
        cy: 50,
    }
    render() {
        const { text, color, cx, cy } = this.props;
        return (
            <svg>
                <circle cx={cx} cy={cy} r="20" fill={color}></circle>
                <text x={cx} y={cy + 5} textAnchor="middle" fill="black">{text}</text>
                <line x1={this.props.x11} y1={this.props.y11} x2={this.props.x12} y2={this.props.y12} stroke="black" strokeWidth="2"></line>
                <line x1={this.props.x21} y1={this.props.y21} x2={this.props.x22} y2={this.props.y22} stroke="black" strokeWidth="2"></line>
            </svg>
        )
    }
}