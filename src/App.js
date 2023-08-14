import './App.css';
import React from "react";
import  Leftbox from "./components/Leftbox"
import  Canvas from "./components/canvas"
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x=0;
        this.y=0;
        this.id=null
    }
}
class App extends React.Component{
    constructor(){
        super();
        this.state = {
            InputValue:'',
            allValue:[],
        }
    }
    // 层序遍历建立二叉树
    buildBinaryTree(arr) {
        if(arr.length===0){
            return  null
        }
        const root = new Node(arr[0]);
        const queue = [root];

        let i = 1;
        while (i < arr.length) {
            const node = queue.shift();

            if (arr[i] !== null) {
                node.left = new Node(arr[i]);
                queue.push(node.left);
            }
            i++;

            if (i < arr.length) {
                if (arr[i] !== null) {
                    node.right = new Node(arr[i]);
                    queue.push(node.right);
                }
                i++;
            }
        }

        return root;
    }
    swap(A, i, j) {
        let temp = A[i];
        A[i] = A[j];
        A[j] = temp;
        console.log("swap"+A[i]+"and"+A[j])
        console.log(A)
        this.setState({
            allValue:A
        })
    }

// 将 i 结点以下的堆整理为大顶堆，注意这一步实现的基础实际上是：
// 假设 结点 i 以下的子堆已经是一个大顶堆，shiftDown函数实现的
// 功能是实际上是：找到 结点 i 在包括结点 i 的堆中的正确位置。后面
// 将写一个 for 循环，从第一个非叶子结点开始，对每一个非叶子结点
// 都执行 shiftDown操作，所以就满足了结点 i 以下的子堆已经是一大
//顶堆
    shiftDown(A, i, length) {
        let temp = A[i]; // 当前父节点
        // j<length 的目的是对结点 i 以下的结点全部做顺序调整
        for(let j = 2*i+1; j < length; j = 2*j+1) {
            temp = A[i];  // 将 A[i] 取出，整个过程相当于找到 A[i] 应处于的位置
            if(j+1 < length && A[j] < A[j+1]) {
                j++;   // 找到两个孩子中较大的一个，再与父节点比较
            }
            if(temp < A[j]) {
                this.swap(A, i, j) // 如果父节点小于子节点:交换；否则跳出
                i = j;  // 交换后，temp 的下标变为 j
            } else {
                break;
            }
        }
    }

// 堆排序
    HeapSort=A=> {
        // 初始化大顶堆，从第一个非叶子结点开始
        console.log("初始化大顶堆")
        for(let i = Math.floor(A.length/2-1); i >= 0; i--) {
            this.shiftDown(A, i, A.length);
        }
        console.log("大顶堆完成")
        // 排序，每一次for循环找出一个当前最大值，数组长度减一
        for(let i = Math.floor(A.length-1); i > 0; i--) {
            this.swap(A, 0, i); // 根节点与最后一个节点交换
            this.shiftDown(A, 0, i); // 从根节点开始调整
        }
        console.log(this.state.root)
    }
// 高亮和显示动画
    highlightAndAnimate(array, index1, index2) {
        // 高亮和显示动画的逻辑
        // 这里只是简单地将 isHighlight 设置为 true，并打印交换的元素
        array[index1].isHighlight = true;
        array[index2].isHighlight = true;
        console.log(`Swapping ${array[index1].value} and ${array[index2].value}`);
        // 模拟动画效果，延时一段时间后恢复 isHighlight 为 false
        setTimeout(() => {
            array[index1].isHighlight = false;
            array[index2].isHighlight = false;
        }, 1000);
    }
    getInputData(val){
        //把子组件传递过来的值赋给this.state中的属性
        this.setState({
            InputValue:val,
            allValue:[...this.state.allValue,val]
        });

    }
    render(){
        let root=this.buildBinaryTree(this.state.allValue)
        console.log(root)
        return (
            <div className="App">
                <Leftbox getdata={this.getInputData.bind(this)}  allValue={this.state.allValue} root={root} heapsort={this.HeapSort}/>
                <Canvas InputValue={this.state.InputValue} allValue={this.state.allValue} root={root}/>
            </div>
        );

    }

}

export default App;
