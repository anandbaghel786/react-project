import React, { Component } from 'react';
import { Col, Row, Form, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Welcome.css';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dataService from '../_services/_dataService';
import apiService from '../api/Api.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from 'react-images-upload';
import { Skills } from './Skills';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridColumn, AgGridReact } from "@ag-grid-community/react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import { AllCommunityModules } from "@ag-grid-community/all-modules"
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { Grid } from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import { AgGridColumn, AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const skill = {
    id: 0,
    skill: '',
    exp: ''
}

class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dbStatus1: true,
            data: [],
            formData: { name: '', email: "", age: 18, gender: '', dob: new Date().setFullYear(new Date().getFullYear() - 18), profileImgUrl: 'https://glossophs.sa.edu.au/wp-content/uploads/2018/09/placeholder-profile-sq-300x300.jpg', skills: [{ ...skill }] }, errors: { name: '', email: '', age: '', gender: '' },
            index: null,
            skillIndex: null,
            isEditMode: false,
            pictures: [],
            columnDefs: [
                { headerName: 'Name', colId: 'name', field: 'name', sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true },
                { headerName: 'Age', colId: 'age', field: 'age', sortable: true, filter: true },
                { headerName: 'Gender', colId: 'gender', field: 'gender', valueGetter: this.genderValueGetter, sortable: true, filter: true },
                { headerName: 'Email', colId: 'email', field: 'email', tooltipField: 'email', sortable: true, filter: true },
                { headerName: 'Skills', colId: 'skills', field: 'skills', valueGetter: this.skillsValueGetter, sortable: true, filter: true },
                { headerName: 'Action', colId: 'action', field: 'action' }
            ],
            rowData: [
                { name: 'Zubrato', age: 34, gender: 'male', email: 'zubrato@gmail.com', skills: 'angular 3', action: '' },
                { name: 'Cubrato', age: 34, gender: 'male', email: 'cubrato@gmail.com', skills: 'angular 3', action: '' },
                { name: 'Mubrato', age: 34, gender: 'male', email: 'mubrato@gmail.com', skills: 'angular 3', action: '' }
            ],
            modules: [ClientSideRowModelModule]
        };
        this.onChange = this.onChange.bind(this)
        this.setValue = this.setValue.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    genderValueGetter = function (params) {
        let gender = params.data.gender.toString();
        return gender.charAt(0).toUpperCase() + gender.slice(1);
    };

    skillsValueGetter = function (params) {
        let skills = [];
        skills = params.data.skills;
        let myskills = "";
        if (typeof skills != 'string') {
            skills.forEach(e => {
                myskills = myskills + e.skill.charAt(0).toUpperCase() + e.skill.slice(1) + " " + e.exp + "\n";
            })
            return myskills;
        }
    };

    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // this.gridApi.sizeColumnsToFit();
        try {
            // (params.api).context.beanWrappers.tooltipManager.beanInstance.MOUSEOVER_SHOW_TOOLTIP_TIMEOUT = 0;
        } catch (e) {
            console.error(e);
        }
        var cols = params.columnApi.getAllColumns();
        cols.forEach(function (col) {
            var colDef = col.getUserProvidedColDef();
            //     colDef.headerName + ', Column ID = ' + col.getId(),
            //     JSON.stringify(colDef)
            // );
        });
    };

    onSelectionChanged = () => {
        var selectedRows = this.gridApi.getSelectedRows();
    };

    getContextMenuItems = (params) => {
        var result = [
            {
                name: 'Windows',
                shortcut: 'Alt + W',
                action: function () {
                },
                icon:
                    '<img src="https://www.ag-grid.com/example-assets/skills/windows.png" />',
            },
            'separator',
            {
                name: 'Windows',
                shortcut: 'Alt + W',
                action: function () {
                },
                icon:
                    '<img src="https://www.ag-grid.com/example-assets/skills/windows.png" />',
            }
        ]
    };

    onDrop(picture) {
        let file = picture[picture.length - 1];
        let reader = new FileReader();
        let base64String = '';
        if (picture.length > 0) {
            let form = { ...this.state.formData };
            reader.onload = () => {
                base64String = reader.result;
                form.profileImgUrl = base64String;
                let formData = new FormData();
                formData.append('image', this.b64toBlob(form.profileImgUrl));
                apiService.httpPost("/users/uploadImage", formData, { isMultipartFormData: true }).then(res => {
                    this.setState({
                        formData: { ...this.state.formData, profileImgUrl: res.url },
                    }, () => toast.success('Profile image uploaded successfully.'))
                })
            }
            reader.readAsDataURL(file);
            this.setState({
                formData: { ...this.state.formData, profileImgUrl: form.profileImgUrl },
            });
        }
    }

    b64toBlob(dataURI) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component    
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array    
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }

    componentDidMount() {

        // apiService.httpGet("/getMyname", this.state.formData).then(res => {                
        //     toast.success(res);
        // });
        this.getUsers();
        this.subscription = dataService.getDatasource().subscribe(message => {
            if (message) {
                setTimeout(() => {
                    this.getUsers();
                });
            }
        });
    }

    getUsers = async () => {
        await apiService.httpGet("/users").then(res => {
            this.setState({
                data: res.data && res.data.length > 0 ? res.data : [],
                rowData: res.data && res.data.length > 0 ? res.data : []
            })
        })
    }


    setValue = (e) => {
        let field = e && e.target ? e.target.name : 'date';
        let index = 0;
        if (field.includes('skill') || field.includes('exp')) {
            index = field.includes('skill') ? field.slice(5) : field.slice(3);
            field = field.includes('skill') ? field.slice(0, 5) : field.slice(0, 3);
        }

        switch (field) {
            case 'name':
                this.setState({
                    formData: { ...this.state.formData, name: e.target.value }
                })
                break;

            case 'age':
                this.setState({
                    formData: { ...this.state.formData, age: e.target.value }
                })
                break;

            case 'gender':
                this.setState({
                    formData: { ...this.state.formData, gender: e.target.value }
                })
                break;

            case 'email':
                this.setState({
                    formData: { ...this.state.formData, email: e.target.value }
                })
                break;

            case 'date':
                this.setState({
                    formData: { ...this.state.formData, dob: e }
                }, () => {
                    this.calculateAge(e);
                })
                break;

            case 'skill':
                let skills = [...this.state.formData.skills];
                skills[index].skill = e.target.value;
                console.log(index, '---------', skills, '---------', skill);
                var formData = { ...this.state.formData };
                formData.skills[index] = skills[index];
                this.setState({ formData })
                break;

            case 'exp':
                const exps = [...this.state.formData.skills];
                exps[index].exp = e.target.value;

                formData = { ...this.state.formData };
                formData.skills[index] = exps[index];
                this.setState({ formData })
                break;

            default:
                break;
        }
        this.validate(e);
    }

    setGender = (e) => {
        this.setState({
            gender: e.target.value
        })
    }


    onChange(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                formData: { ...this.state.formData, age: e.target.value }
            })
        }
    }

    calculateAge = async (dob) => {
        var ageDifMs = Date.now() - new Date(dob).getTime();
        var ageDate = new Date(ageDifMs);
        let form = await this.getForm();
        form.age = dob ? Math.abs(ageDate.getUTCFullYear() - 1970) : 0;
        this.setState({
            formData: { ...this.state.formData, age: form.age }
        });
    }

    getForm = () => {
        let form = { ...this.state.formData };
        return form;
    }

    getSkills = () => {
        let skills = [...this.state.formData.skills];
        return skills;
    }

    validate = (e) => {
        // let field = e.target.name;
        // let index = 0;
        // if (field.includes('skill') || field.includes('exp')) {
        //     index = field.includes('skill') ? field.slice(5) : field.slice(3);
        //     field = field.includes('skill') ? field.slice(0, 5) : field.slice(0, 3);
        // }

        if (this.state.isEditMode) {
            this.setState({
                erros: { name: '', email: '', age: '', gender: '' }
            })
        }

        let field = e && e.target ? e.target.name : 'date';
        if (field === 'name') {
            if (e.target.value) {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, name: '' },
                }));
            } else {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, name: 'Name is required.' },
                }));
            }
        } else if (field === 'age') {
            if (e.target.value) {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, age: '' },
                }));
            } else {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, age: 'Age is required.' },
                }));
            }
        } else if (field === 'gender') {
            if (e.target.value) {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, gender: '' },
                }));
            } else {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, gender: 'Gender is required.' },
                }));
            }
        } else if (field === 'email') {
            const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (e.target.value && !email.test(e.target.value)) {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, email: 'Email is not valid.' },
                }));
            } else if (e.target.value && email.test(e.target.value)) {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, email: '' },
                }));
            } else {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, email: 'Email is required.' },
                }));
            }
        }
        // else if (e.target.name === 'skill') {
        //     if (e.target.value) {
        //         this.setState(prevState => ({
        //             errors: { ...prevState.errors, skill: '' },
        //         }));
        //     } else {
        //         this.setState(prevState => ({
        //             errors: { ...prevState.errors, skill: 'Skill is required.' },
        //         }));
        //     }
        // }
    }

    addItem = (e) => {
        // skill.localId = this.state.formData.skills[this.state.formData.skills.length - 1].localId++;
        const skills = [...this.state.formData.skills];
        skills.push({ id: 0, skill: '', exp: '' });
        this.setState(prevState => ({
            formData: { ...prevState.formData, skills: skills },
        }), () => {
        });

    }

    removeItem = (e, userId, skillId, index) => {
        if (userId && skillId) {
            apiService.httpGet(`/users/deleteSkill/${userId}/${skillId}`).then(res => {
                const skills = this.state.formData.skills;
                skills.splice(index, 1);
                this.setState({ formData: { ...this.state.formData, skills: skills } })
                // this.setState({
                //     skills: [...this.state.formData.skills]
                // })
                this.getUsers();
                toast.success("Skill deleted successfully.");
            })
                .catch(err => {
                    console.log(err);
                    toast.error("Unable to delete skill!");
                });
        } else {
            const skills = this.state.formData.skills;
            skills.splice(index, 1);
            this.setState({ formData: { ...this.state.formData, skills: skills }, data: skills })
        }
    }

    submit = (e, index) => {

        // this.state.formData.age = null;
        const skills = [...this.state.formData.skills].filter(e => e.skill || e.exp);
        this.setState(prevState => ({
            formData: { ...prevState.formData, skills: skills },
        }), () => {
            apiService.httpPost("/users/saveUser", this.state.formData).then(res => {

                // let obj = this.state.data.find(e => e.localId === this.state.formData.localId);

                // if (obj) {
                //     var mydata = this.state.data;
                //     mydata[this.state.index] = this.state.formData;
                //     this.setState({
                //         data: mydata
                //     }, () => {
                //         localStorage.setItem("data", JSON.stringify(this.state.data));
                //     })
                // } else {
                //     var add = { ...this.state.formData };
                //     this.setState({ add });
                //     this.state.data.push(Object.assign({}, add));
                // }
                // this.setState({
                //     data: this.state.data
                // }, () => {
                //     localStorage.setItem("data", JSON.stringify(this.state.data));
                // })
                this.getUsers();
                this.setState({
                    formData: { name: '', email: "", age: 18, gender: '', dob: new Date().setFullYear(new Date().getFullYear() - 18), profileImgUrl: 'https://glossophs.sa.edu.au/wp-content/uploads/2018/09/placeholder-profile-sq-300x300.jpg', skills: [{ id: 0, skill: '', exp: '' }] }, errors: { name: '', email: '', age: '', gender: '' }
                },
                    () => {
                    })
                if(this.state.isEditMode) {
                    this.state.isEditMode = false;
                }
                toast.success(`User ${this.state.isEditMode ? 'updated' : 'saved'} successfully.`);
            })
                .catch(err => {
                    toast.error("Unable to save user!");
                });
        });

    }

    deleteUserSkills = (evt) => {
        apiService.httpDelete("/deleteUserSkills").then(res => {
            toast.success(res.status);
        });
    }

    editData = (evt, item, index) => {
        item.dob = new Date(item.dob);
        if (item.skills.length == 0) {
            item.skills = [{...skill}];
        }
        this.setState({
            formData: { ...item },
            index: index,
            isEditMode: true
        })

        this.validate(evt)
    }

    removeRow = (id) => {
        let data = [...this.state.data];
        data.splice(id, 1);
        this.setState({ data: data });
        apiService.httpDelete("/users/deleteUser", this.state.data[id]).then(async (res) => {
            let result = res;
            let dat = await this.getUsers();
            // this.setState({
            //     data: result.data
            // })
            toast.success("User deleted successfully.");
        })
            .catch(err => {
                toast.error("Unable to delete user!");
            });
    }

    getSkillRowIndex = (e, i) => {
        this.setState({
            skillIndex: i
        })
    }

    setUserSkills = (skills) => {
        if (skills.length > 0) {
            let form = { ...this.state.formData };
            form.skills = skills;
            this.setState({
                formData: form
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dbStatus1 !== this.state.dbStatus1) {
        }
    }

    render() {
        return <div>
            <Container fluid>
                <Row>
                    <Col style={{ padding: '1rem', border: "2px solid grey" }}>
                        <Form>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <img src={this.state.formData.profileImgUrl} alt="profileImage" width="100" height="100" style={{ borderRadius: '50px' }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="upldImg">
                                        <ImageUploader
                                            singleImage={true}
                                            withIcon={false}
                                            label=""
                                            buttonText="Choose your photo"
                                            onChange={this.onDrop}
                                            imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif", ".svg"]}
                                            maxFileSize={1048576}
                                            fileSizeError=" file size is too big"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" value={this.state.formData.name} placeholder="Enter name" onChange={this.setValue}></Form.Control>
                                        {this.state.errors["name"] ? <span style={{ color: "red" }}>{this.state.errors["name"]}</span> : null}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="dob">
                                        <Form.Label>Date of birth</Form.Label>
                                        <DatePicker dateFormat="dd/MM/yyyy" maxDate={new Date()} isClearable selected={this.state.formData.dob} placeholder="Enter dob" onChange={(date) => this.setValue(date)} />
                                        {/* <Form.Control name="dob" type="text" value={this.state.formData.dob}  onChange={this.onChange} placeholder="Enter dob"></Form.Control> */}
                                        {/* {this.state.errors["dob"] ? <span style={{ color: "red" }}>{this.state.errors["dob"]}</span> : null} */}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="age">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control name="age" minLength="2" maxLength="2" type="text" value={this.state.formData.age} onChange={this.onChange} placeholder="Enter age"></Form.Control>
                                        {this.state.errors["age"] ? <span style={{ color: "red" }}>{this.state.errors["age"]}</span> : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="gender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select" name="gender" onChange={this.onChange, this.setValue} value={this.state.formData.gender} placeholder="Enter gender">
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Form.Control>
                                        {this.state.errors["gender"] ? <span style={{ color: "red" }}>{this.state.errors["gender"]}</span> : null}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" onChange={this.validate, this.setValue} value={this.state.formData.email} placeholder="Enter email"></Form.Control>
                                        {this.state.errors["email"] ? <span style={{ color: "red" }}>{this.state.errors["email"]}</span> : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Skills setUserSkills={this.setUserSkills} form={this.state.formData} />
                            <Row>
                                <Col style={{ padding: '24px', border: '3px solid #e2e2f1', margin: '14px' }}>
                                    <Form.Label style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Add Skill:</Form.Label>
                                    {this.state.formData.skills.map((skill, index1) => {
                                        return (
                                            <Row key={index1}>
                                                <Col md={5}>
                                                    <Form.Group>
                                                        <Form.Label>Skill Name</Form.Label>
                                                        <Form.Control as="select" type="exskillp" id={"skill" + index1} name={"skill" + index1} value={skill.skill} placeholder="Enter skill" onChange={this.setValue} onFocus={(e) => this.getSkillRowIndex(e, index1)}>
                                                            <option value="">Select</option>
                                                            <option value="angular">Angular</option>
                                                            <option value="angularjs">AngularJS </option>
                                                            <option value="nodejs">Node JS</option>
                                                            <option value="javascript">Java Script</option>
                                                            <option value="java">Java</option>
                                                            <option value="bigData">Big Data</option>
                                                        </Form.Control>
                                                        {this.state.errors["skill"] && index1 == this.state.skillIndex ? <span style={{ color: "red" }}>{this.state.errors["skill"]}</span> : null}
                                                    </Form.Group>
                                                </Col>
                                                <Col md={5}>
                                                    <Form.Group>
                                                        <Form.Label>Experience</Form.Label>
                                                        <Form.Control type="exp" id={"exp" + index1} name={"exp" + index1} value={skill.exp} onChange={this.setValue} placeholder="Enter exp"></Form.Control>
                                                        {this.state.errors["exp"] ? <span style={{ color: "red" }}>{this.state.errors["exp"]}</span> : null}
                                                    </Form.Group>
                                                </Col>
                                                <Col md={2} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                                    {this.state.formData.skills.length > 1 ? <button type="button" className="btn btn-circle" onClick={(e) => this.removeItem(e, this.state.formData._id || this.state.formData.id, (skill._id && skill._id.length > 0 && skill._id) || (skill.id > 0 && skill.id), index1)}><i className="fas fa-minus"></i></button> : null}

                                                    {this.state.formData.skills.length - 1 <= index1 ? <button type="button" className="btn btn-circle ml-2" onClick={this.addItem}><i className="fas fa-plus"></i></button> : null}
                                                </Col>
                                            </Row>
                                        )
                                    })
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <button type="button" onClick={(e) => this.submit(e)} className="btn btn-primary"> {this.state.isEditMode ? 'Update' : 'Submit'}</button>
                                </Col>
                                <Col>
                                    <button type="button" onClick={(e) => this.deleteUserSkills(e)} className="btn btn-primary">Delete user and skills</button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col style={{ padding: '1rem', border: "2px solid grey" }}>
                        {/* <div id="myGrid" style={{ height: '100%', width: '100%' }} className="ag-theme-alpine" >
                            <AgGridReact rowSelection="multiple"
                                columnDefs={this.state.columnDefs}
                                rowData={this.state.rowData}
                                onGridReady={this.onGridReady}
                                modules={AllCommunityModules}
                                groupSelectsChildren={true}
                                onSelectionChanged={this.onSelectionChanged.bind(this)}
                                autoGroupColumnDef={{
                                    headerName: "Age",
                                    field: "age",
                                    cellRenderer: 'agGroupCellRenderer',
                                    cellRendererParams: {
                                        checkbox: true
                                    }
                                }}
                                getContextMenuItems={this.getContextMenuItems}
                            />
                        </div> */}
                        <Table responsive style={{ borderRadius: '20px' }}>
                            <thead style={{ borderRadius: '20px !important' }}>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>E-mail</th>
                                    <th>Skills</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data?.map(({ ...e }, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{e.name}</td>
                                        <td>{e.age}</td>
                                        <td>{e.gender}</td>
                                        <td>{e.email}</td>
                                        <td>
                                            {e.skills?.map((e1, index1) =>
                                                <span key={index1}>{e1.skill}  {e1.exp} <br></br></span>
                                            )}
                                        </td>
                                        <td>
                                            <button type="button" className="btn" onClick={(evt) => this.editData(evt, e, index)}><i className="fas fa-edit"></i></button>
                                            <button type="button" className="btn ml-2" onClick={() => this.removeRow(index)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <ToastContainer pauseOnFocusLoss={false} />
        </div>
    }
}

export default Welcome;