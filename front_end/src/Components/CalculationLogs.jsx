import React, { Component } from 'react';

export default class CalculationLogs extends Component {
    render() {
        if (this.props.logs.length === 0){
            return (
                <p>Calucations List Empty So Far</p>
            )
        }
        return(
            <ul>
                {this.props.logs.reverse().map(log => 
                    <li class="list-group-item">{log}</li>
                    )}
            </ul>
        )
    }
}
