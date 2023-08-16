import React from "react";
import "./Leftbox.css"
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
export default class Leftbox extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            InputValue:'',
            allValue:this.props.allValue,

        }
    }
    handleClick=()=>{
        this.props.getdata(this.state.InputValue)
        this.setState({
            InputValue:'',
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.allValue !== prevProps.allValue) {
            this.setState({
                allValue: this.props.allValue
            });
        }
    }

    render(){
        return(
            <div className="leftbox">
                <div className="info-text">
                    Heap-Visualize
                </div>
                <div className="insert-number">
                    <TextField
                        helperText="Please add a number"
                        id="demo-helper-text-aligned"
                        label="New Number"
                        className="input-box"
                        margin="normal"
                        value={this.state.InputValue}
                        onChange={(event)=>{this.setState({
                            InputValue:event.target.value
                        })}}
                        inputProps={{
                            type: 'number',
                            pattern: '[0-9]*',
                            inputMode: 'numeric',
                        }}
                    />
                    <div className="buttons">
                        <div className="button">
                            <Button variant="contained"
                                    color="primary"
                                    className="button"
                                    onClick={this.handleClick}>
                                Insert
                            </Button>
                        </div>

                        <div className="button">
                            <Button variant="contained"
                                    color="primary"
                                    className="button"
                                    onClick={()=> {
                                        this.props.handlebtnclick()
                                    }}
                            >
                                Sort
                            </Button>
                        </div>

                    </div>

                </div>

            </div>
        )

    }
}