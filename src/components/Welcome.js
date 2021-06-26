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

const skill = {
    id: 1,
    skill: '',
    exp: ''
}

class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            formData: { localId: 100, _id: '', sqlId: 0, name: '', email: "", age: 0, gender: '', dob: new Date(), profileImgUrl: 'https://glossophs.sa.edu.au/wp-content/uploads/2018/09/placeholder-profile-sq-300x300.jpg', skills: [{ ...skill }] }, errors: { name: '', email: '', age: '', gender: '' },
            index: null,
            skillIndex: null,
            isEditMode: false,
            pictures: []
        };
        this.onChange = this.onChange.bind(this)
        this.setValue = this.setValue.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        console.log(picture);
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
                apiService.httpPost("/users/uploadImage", formData, {isMultipartFormData: true}).then(res => {
                    console.log(res);
                    this.setState({
                        formData: { ...this.state.formData, profileImgUrl: res.url },
                    })
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
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array    
        var ia = new Uint8Array(byteString.length);    
        for (var i = 0; i < byteString.length; i++) {      
            ia[i] = byteString.charCodeAt(i);    
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
                // console.log(message.datasource);
            }
        });
    }

    getUsers = () => {
        apiService.httpGet("/users").then(res => {
            this.setState({
                data: res.data && res.data.length > 0 ? res.data : []
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
                console.log(new Date(e));
                this.setState({
                    formData: { ...this.state.formData, dob: e }
                }, () => {
                    this.calculateAge(e);
                })
                break;

            case 'skill':
                let skills = [...this.state.formData.skills];
                skills[index].skill = e.target.value;

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
        skill.localId = this.state.formData.skills[this.state.formData.skills.length - 1].localId++;
        this.setState(prevState => ({
            formData: { ...prevState.formData, skills: [...prevState.formData.skills, { ...skill }] },
        }));
    }

    removeItem = (e) => {
        this.state.formData.skills.pop();
        this.setState({
            skills: [...this.state.formData.skills]
        })
    }

    submit = (e, index) => {

        // this.state.formData.age = null;
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

            toast.success(`User ${this.state.isEditMode ? 'updated' : 'saved'} successfully.`);
        })
            .catch(err => {
                toast.error("Unable to save user!");
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
            item.skills = [skill];
        }
        console.log(item);
        this.setState({
            formData: { ...item },
            index: index,
            isEditMode: true
        })

        this.validate(evt)
    }

    removeRow = (id) => {
        console.log(this.state.data[id]);
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
        console.log(nextProps);
    }

    render() {
        return <div>
            <Container fluid>
                <Row>
                    <Col style={{ padding: '1rem', border: "2px solid grey" }}>
                        <Form>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <img src={this.state.formData.profileImgUrl} alt="profileImage" width="100" height="100" />
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
                                                    {this.state.formData.skills.length > 1 ? <button type="button" className="btn btn-circle" onClick={this.removeItem}><i className="fas fa-minus"></i></button> : null}

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
                        <Table responsive variant="dark" style={{ borderRadius: '20px' }}>
                            <thead style={{ background: 'rgb(38 115 118)', borderRadius: '20px !important' }}>
                                <tr>
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
                                            <button type="button" style={{ color: 'white' }} className="btn" onClick={(evt) => this.editData(evt, e, index)}><i className="fas fa-edit"></i></button>
                                            <button type="button" style={{ color: 'white' }} className="btn ml-2" onClick={() => this.removeRow(index)}><i className="fas fa-trash"></i></button>
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