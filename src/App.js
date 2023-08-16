import "./App.css";
import React from "react";
import Leftbox from "./components/Leftbox";
import Canvas from "./components/canvas";
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
        this.id = null;
    }
}
class App extends React.Component {
    state = {
        InputValue: "",
        allValue: [],
        root: null,
    };
    constructor() {
        super();
    }
    componentDidMount() {
        this.setState({
            root: this.buildBinaryTree([]),
        });
    }
    // 层序遍历建立二叉树
    buildBinaryTree = (arr) => {
        if (arr.length === 0) {
            return null;
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
    };
    swap = async (A, i, j, times) => {
        let temp = A[i];
        A[i] = A[j];
        A[j] = temp;
        /**
         * tips:这里设置当前组件state.allValue的值是没问题的，肯定可以成功的，如果有视图中使用了allValue的值，那么视图也会更新。
         * 1.下面视图中的canvas组件也传递了state.allValue是没有问题的
         * 2.为何state.allValue没有触发canvas组件的渲染，请看canvas组件内的tips
         */
            // this.syncSleep(2000);
        const root = this.buildBinaryTree(A);
        console.log("swap root = ", root);
        this.setState({
            root,
            allValue: A,
        });
        return true;
        /*console.log(this.state.allValue.map(item=>item.value))*/
        /* this.highlightAndAnimate(A,i,j,times)*/
    };
    shiftDown = (A, i, length, times) => {
        let temp = A[i].value; // 当前父节点
        // j<length 的目的是对结点 i 以下的结点全部做顺序调整
        for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
            temp = Number(A[i].value); // 将 A[i] 取出，整个过程相当于找到 A[i] 应处于的位置
            if (j + 1 < length && Number(A[j].value) < Number(A[j + 1].value)) {
                j++; // 找到两个孩子中较大的一个，再与父节点比较
            }
            if (temp < Number(A[j].value)) {
                this.swap(A, i, j, times); // 如果父节点小于子节点:交换；否则跳出
                times.swapTimes += 1;
                i = j; // 交换后，temp 的下标变为 j
            } else {
                break;
            }
        }
    };

    // 堆排序
    HeapSort = (A) => {
        let times = { swapTimes: 0 };
        // 初始化大顶堆，从第一个非叶子结点开始
        console.log("初始化大顶堆");
        for (let i = Math.floor(A.length / 2 - 1); i >= 0; i--) {
            this.shiftDown(A, i, A.length, times);
        }
        console.log("大顶堆完成");
        /**
         * issus:
         * 1.这里导致的为何你延迟了2s，但是视图没有按照你预期的2s一更新
         * 2.首先这不是bug，这是react的渲染机制导致
         * 3.你这里循环去setState，react会默认将其合并为一次进行render渲染，所以你的延迟2s后的setState实际上被react合并成了一次进行渲染
         * 4.这你就理解为啥swap内打印符合预期，但是渲染不符合预期
         */
        // 排序，每一次for循环找出一个当前最大值，数组长度减一
        // for (let i = Math.floor(A.length - 1); i > 0; i--) {
        //   this.swap(A, 0, i, times); // 根节点与最后一个节点交换
        //   times.swapTimes += 1;
        //   this.shiftDown(A, 0, i, times); // 从根节点开始调整
        // }
        /**
         * issus:这个函数为啥能实现延迟2s后再执行，而不被react合并render
         * 1.对于react内部机制而言，他没法去分析异步代码的逻辑，所以此函数它只会分析到下面注释行的逻辑
         * 2.分析到了的setState就会被合并，显然，你只有this.swap有setState，所以自然就被render渲染了
         * 3.然后我们判断是否循环完整个数组，如果没有，那么我们就延迟2s后再次调用此函数，此时，react内部机制就没法分析到这个延迟2s后的逻辑了
         */
        this.handleLoopFor(times, A, Math.floor(A.length - 1));
    };
    //   单独声明一个递归概念的循环自调函数
    handleLoopFor(times, A, currentIndex) {
        this.swap(A, 0, currentIndex, times);
        times.swapTimes += 1;
        this.shiftDown(A, 0, currentIndex, times);
        // 在这来延迟2s
        if (currentIndex > 0) { // react只能分析到此行
            this.asyncSleep(2000).then(() => {
                this.handleLoopFor(times, A, currentIndex - 1);
            });
        }
    }

    /*    shouldComponentUpdate(nextProps, nextState) {
          console.log(nextState);

          return true;
      }
      static getDerivedStateFromProps(nextProps, prevState) {
          // 这里可以拿到更新后的状态 prevState
          console.log("state更新啦")
          return {
              allValue: prevState.allValue
          };
      }*/

    // 高亮和显示动画
    highlightAndAnimate = (array, index1, index2, times) => {
        // 高亮和显示动画的逻辑
        array[index1].isHighlight = true;
        array[index2].isHighlight = true;

        // 模拟动画效果，延时一段时间后恢复 isHighlight 为 false
        this.sleep(2000);

        array[index1].isHighlight = false;
        array[index2].isHighlight = false;
        this.setState({
            allValue: array,
        });
        console.log("恢复");
    };
    /**tips
     * 异步延迟函数
     * @param {number} delay 延迟毫秒数
     * @example await syncSleep(1024) // 延迟1秒，使用时所处的函数块需要加上async关键字
     */
    asyncSleep(delay) {
        return new Promise((resolve) => setTimeout(resolve, delay));
    }
    /**tips
     * 同步延迟函数-不建议这种方式
     * @param {number} delay 延迟毫秒数
     */
    syncSleep(delay) {
        let start = new Date().getTime();
        while (new Date().getTime() - start < delay) {
            continue;
        }
    }
    getInputData(val) {
        //把子组件传递过来的值赋给this.state中的属性
        this.setState({
            InputValue: val,
            allValue: [...this.state.allValue, { value: val, isHighlighted: false }],
            root: this.buildBinaryTree([
                ...this.state.allValue,
                { value: val, isHighlighted: false },
            ]),
        });
    }
    handlebtnclick() {
        let A = this.state.allValue;
        this.HeapSort(A);
    }
    render() {
        console.log("app render root=", this.state.root);
        return (
            <div className="App">
                <Leftbox
                    getdata={this.getInputData.bind(this)}
                    allValue={this.state.allValue}
                    root={this.buildBinaryTree(this.state.allValue)}
                    handlebtnclick={this.handlebtnclick.bind(this)}
                />
                <Canvas InputValue={this.state.InputValue} root={this.state.root} />
            </div>
        );
    }
}

export default App;
