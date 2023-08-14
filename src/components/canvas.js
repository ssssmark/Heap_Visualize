import React from "react";
import TreeNode from "./treenode";
import "./canvas.css"
export default class Canvas extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inputValue: Number(this.props.InputValue),
            allValue:this.props.allValue,
            root:this.props.root,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        console.log(nextProps)
        if (nextProps.root !== prevState.root) {
            return {
                root:nextProps.root
            };
        }
        return null;
    }
    componentDidUpdate(prevProps) {
        if (this.props.root !== prevProps.root) {
            this.setState({
                allValue: this.props.allValue ,
                inputValue:Number(this.props.InputValue),
                root:this.props.root
            });
            console.log(this.props.root)
        }

    }
    renderNode(tree, root,depth) {
        if (!root) return;
        console.log(root)
        let x = 0;
        let y = 0;
        var queue = [root];
        while (queue.length>0) {

            const len = queue.length;
            const gapX = 780 / (Math.pow(2,depth)+1) // 当前层节点x轴间距
            const nextgapX=780 / (Math.pow(2,depth+1)+1)
            const gapY=100
            for(let i = 0; i < len; i++) {
                const node = queue.shift();
                x = gapX*(i+1);
                y =(depth+1)*gapY;
                tree.push(
                    <TreeNode
                        color={/*this.state.allValue[i].isHighlight*/0? "blue":"yellow"}
                        cx={x}
                        cy={y}
                        x11={x-20*Math.cos(Math.PI/4)}
                        y11={y+20*Math.cos(Math.PI/4)}
                        x12={nextgapX*(2*i+1)}
                        y12={y+gapY}
                        x21={x+20*Math.cos(Math.PI/4)}
                        y21={y+20*Math.cos(Math.PI/4)}
                        x22={nextgapX*(2*i+2)}
                        y22={y+gapY}
                        key={"a"+node.value}
                        text={node.value}
                    />
                );

                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            depth++;
        }
    }
    render(){
        let tree=[];
        let root=this.state.root
        this.renderNode(tree,root,0)
        console.log("调用render，root为",root)
        return(

            <div className="right-box">
                <svg width="100%" height="100%">
                    {tree}
                </svg>

            </div>

        )

}
}