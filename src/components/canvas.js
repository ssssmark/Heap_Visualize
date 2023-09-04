import React from "react";
import TreeNode from "./treenode";
import "./canvas.css";
export default class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.root !== prevState.root) {
    //         console.log("root更新！")
    //         return {
    //             root: nextProps.root,
    //         };
    //     }
    //     return null;
    // }
    /**
     * 生成随机字符串
     */
    randomString = (len) => {
        len = len || 32;
        let $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
        let maxPos = $chars.length;
        let pwd = "";
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd + new Date().getTime();
    };

    renderNode(root, depth) {
        console.log("renderNode 重新渲染！")
        if (!root) return;
        let tree = [];
        let x = 0;
        let y = 0;
        let queue = [root];
        while (queue.length > 0) {
            const len = queue.length;
            const gapX = 780 / (Math.pow(2, depth) + 1); // 当前层节点x轴间距
            const nextgapX = 780 / (Math.pow(2, depth + 1) + 1);
            const gapY = 100;
            for (let i = 0; i < len; i++) {
                const node = queue.shift();
                x = gapX * (i + 1);
                y = (depth + 1) * gapY;
                const nowKey = this.randomString(16)
                tree.push(
                    <TreeNode
                        color={node.value.isHighlight ? "red" : "yellow"}
                        cx={x}
                        cy={y}
                        x11={x - 20 * Math.cos(Math.PI / 4)}
                        y11={y + 20 * Math.cos(Math.PI / 4)}
                        x12={nextgapX * (2 * i + 1)}
                        y12={y + gapY}
                        x21={x + 20 * Math.cos(Math.PI / 4)}
                        y21={y + 20 * Math.cos(Math.PI / 4)}
                        x22={nextgapX * (2 * i + 2)}
                        y22={y + gapY}
                        key={nowKey}
                        text={+node.value.value}
                    />
                );

                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            depth++;
        }
        return tree;
    }
    render() {
        const { root } = this.props;
        return (
            <div className="right-box">
                <svg width="100%" height="100%">
                    {root ? this.renderNode(root, 0) : null}
                </svg>
            </div>
        );
    }
}

