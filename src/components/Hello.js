import React, { Component } from "react";
import Switch from "react-switch";
import dataService from '../_services/_dataService';

class Hello extends Component {
    constructor() {
        super();
        this.state = { checked: true };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({
            checked
        }, () => {
            dataService.setDatasource(checked);
        });
    }

    render() {
        return (
            <span className="switch-pos">
                <label className="mr-2" style={{ fontWeight: this.state.checked ? null : 'bold' }}>MySQL</label>
                <label>
                    <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon={false}
                        checkedIcon={false} />
                </label>
                <label className="ml-1" style={{ fontWeight: this.state.checked ? 'bold' : null }}>Mongo</label>
            </span>
        );
    }
}

export default Hello;