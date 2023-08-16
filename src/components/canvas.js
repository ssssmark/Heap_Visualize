import React from "react";
import TreeNode from "./treenode";
import "./canvas.css";
/**
 * tips：当前组件没有接收/视图中也没有使用上面组件传递下面的allValue，那么自然不会触发渲染，这是七一
 * 看下面的getDerivedStateFromProps生命周期内，你只比较props.root变化了就允许组件响应变化，其他的都直接返回null部响应渲染了，这是其二
 * 你当前组件也没有使用allValue，如果不需要使用，父组件最好也不要传递，额外增加组件性能损耗
 * 当前组件目前只使用了props.root到视图中，所以只有props.root的改变会触发组件重新渲染
 * 特别注意：你传递了allValue，但是不用，组件的逻辑可能会重新生成，但是，react内部通过fiber机制会去对比前后生成的实际视图进行对比，在逻辑上更新并不等于在视图上更新。
 * 举个例子：你在组件内监听了allValue的更改并且console.log出来了，你父组件更改allValue，当前组件也成功打印，但是视图本身没有更新哦，因为你allValue并没有在
 * 视图中进行绑定使用。
 */
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
                /***
                 * tips：要使此处的TreeNode节点重新渲染，当前情况下一般会渲染，因为你是通过函数返回的节点构造，相当于每次都是新节点。
                 * 但是要注意因为你此处是使用了循环，且自己控制了key，所以有些情况下不会渲染甚至堵塞，例如两个节点的值都是8，那么key也是相同的，就会报错冲突
                 * 想要节点每次数据变化都渲染：只需要在当前循环内随机生成一个随机字符当做key即可，这里我已经将对应代码注入了
                 *  const nowKey = this.randomString(16)
                 */
                const nowKey = this.randomString(16)
                tree.push(
                    <TreeNode
                        color={/*node.value.isHighlight*/0 ? "red" : "yellow"}
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



// export default class ComponentName extends React.Component {
//     // 组件的状态直接写这样，不通过函数进行声明赋值，提效，使用也是通过this.state使用
//     state = {}
//     constructor(){
//         super(props);
//         // 这里用来绑定函数this指向等副作用纠正操作，不需要去设置this.state
//     }
//     // ...生命周期函数
//     // ...自定义函数



//     render(){
//         const {}=this.props; // render内部使用props最好解构出来，不要在视图中直接this.props.xxx
//         const {}=this.state; // render内部使用state最好解构出来，不要在视图中直接this.state.xxx
//         return <></>
//     }
// }