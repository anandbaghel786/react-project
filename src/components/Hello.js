import React, { Component } from "react";
import Switch from "react-switch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from "../api/Api.service";

import dataService from '../_services/_dataService';

class Hello extends Component {
    constructor() {
        super();
        this.state = { checked: true };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        apiService.httpGet(`/db/${dataService.getDb()}`);
    }

    handleChange(checked) {
        this.setState({
            checked
        }, () => {
            dataService.setDatasource(checked);
            apiService.httpGet(`/db/${dataService.getDb()}`);
            toast.success(this.state.checked ? "MongoDB selected as database." : "MySQL selected as database.");
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
                <ToastContainer pauseOnFocusLoss={false} />
            </span>
        );
    }
}

export default Hello;