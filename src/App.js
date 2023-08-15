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
            root:this.buildBinaryTree([]),
        }
    }



    // 层序遍历建立二叉树
    buildBinaryTree=(arr)=> {
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
    sleep(delay) {
        let start = new Date().getTime();
        while (new Date().getTime() - start < delay) {
            continue;
        }
    }

    swap=(A, i, j,times) =>{
        let temp = A[i];
        A[i] = A[j];
        A[j] = temp;
        console.log(`Swapping ${A[i].value} and ${A[j].value}`);
        this.setState({
            allValue:A
        })
       /* this.highlightAndAnimate(A,i,j,times)*/
    }
    shiftDown=(A, i, length,times)=> {
        let temp = A[i].value; // 当前父节点
        // j<length 的目的是对结点 i 以下的结点全部做顺序调整
        for(let j = 2*i+1; j < length; j = 2*j+1) {
            temp = Number(A[i].value);  // 将 A[i] 取出，整个过程相当于找到 A[i] 应处于的位置
            if(j+1 < length && Number(A[j].value) < Number(A[j+1].value)) {
                j++;   // 找到两个孩子中较大的一个，再与父节点比较
            }
            if(temp < Number(A[j].value)) {
                this.swap(A, i, j,times) // 如果父节点小于子节点:交换；否则跳出
                times.swapTimes+=1
                i = j;  // 交换后，temp 的下标变为 j
            } else {
                break;
            }
        }
    }

// 堆排序
    HeapSort=A=> {
        let times={swapTimes:0}
        // 初始化大顶堆，从第一个非叶子结点开始
        console.log("初始化大顶堆")
        for(let i = Math.floor(A.length/2-1); i >= 0; i--) {
            this.shiftDown(A, i, A.length,times);
        }
        console.log("大顶堆完成")
        // 排序，每一次for循环找出一个当前最大值，数组长度减一
        for(let i = Math.floor(A.length-1); i > 0; i--) {
            this.swap(A, 0, i,times); // 根节点与最后一个节点交换
            times.swapTimes+=1
            this.shiftDown(A, 0, i,times); // 从根节点开始调整
        }
        console.log(A)
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
        // 如果不相同则返回true,允许重新渲染
        return true;
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // 这里可以拿到更新后的状态 prevState
        return {
            allValue: prevState.allValue
        };
    }

// 高亮和显示动画
    highlightAndAnimate=(array, index1, index2,times)=> {
        // 高亮和显示动画的逻辑
        array[index1].isHighlight = true;
        array[index2].isHighlight = true;

        // 模拟动画效果，延时一段时间后恢复 isHighlight 为 false
        this.sleep(2000)

        array[index1].isHighlight = false;
        array[index2].isHighlight = false;
        this.setState({
                allValue:array
            })
            console.log("恢复")

    }
    getInputData(val){
        //把子组件传递过来的值赋给this.state中的属性
        this.setState({
            InputValue:val,
            allValue:[...this.state.allValue,{value:val,isHighlighted:false}]

        });
    }
    render(){
        console.log("调用render")
        console.log(this.state.allValue)
        return (
            <div className="App">
                <Leftbox getdata={this.getInputData.bind(this)}  allValue={this.state.allValue} root={this.buildBinaryTree(this.state.allValue)} heapsort={this.HeapSort}/>
                <Canvas InputValue={this.state.InputValue} allValue={this.state.allValue} root={this.buildBinaryTree(this.state.allValue)}/>
            </div>
        );

    }

}

export default App;
