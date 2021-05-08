import React, { Component } from 'react';
import { Col, Row, Form, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Welcome.css';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  dataService  from '../_services/_dataService';

const skill = {
    id: 1,
    skill: '',
    exp: ''
}

class Welcome extends Component {
    constructor() {
        super();
        this.state = { 
            data:[], 
            formData: { id: 100, name: "", email: "", age: "", gender: '', skills: [{ ...skill }] }, errors: { name: '', email: '', age: '', gender: '' },
            index: null,
            skillIndex: null,
            isEditMode: false
        };
        this.onChange = this.onChange.bind(this)
        this.setValue = this.setValue.bind(this);
    }

    componentDidMount() {
        let storeData = JSON.parse(localStorage.getItem("data"));
        if(localStorage.getItem("data")) {
            this.setState({
                data: storeData
            })
        }

        this.subscription = dataService.getDatasource().subscribe(message => {
            if (message) {
                // console.log(message);
                console.log(message.datasource);
                // add message to local state if not empty
                // this.setState({ messages: [...this.state.messages, message] });
            } else {
                // clear messages when empty message received
                // this.setState({ messages: [] });
            }
        });
    }
    
    
    setValue = (e) => {
        let field = e.target.name;
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

            case 'skill':
                const skills = [...this.state.formData.skills];
                skills[index].skill = e.target.value;

                var formData = { ...this.state.formData };
        formData.skills[index] = skills[index];
        this.setState({formData})
                break;

            case 'exp':
                const exps = [...this.state.formData.skills];
                exps[index].exp = e.target.value;

                formData = { ...this.state.formData };
        formData.skills[index] = exps[index];
        this.setState({formData})
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
            this.setState({ age: e.target.value })
        }
    }

    validate = (e) => {
        // let field = e.target.name;
        // let index = 0;
        // if (field.includes('skill') || field.includes('exp')) {
        //     index = field.includes('skill') ? field.slice(5) : field.slice(3);
        //     field = field.includes('skill') ? field.slice(0, 5) : field.slice(0, 3);
        // }

        console.log(e.target.value);

        if (e.target.name ==='name') {
            if (e.target.value) {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, name: '' },
                }));
            } else {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, name: 'Name is required.' },
                }));
            }
        }  else if (e.target.name === 'age') {
            if (e.target.value) {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, age: '' },
                }));
            } else {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, age: 'Age is required.' },
                }));
            }
        }  else if (e.target.name === 'gender') {
            if (e.target.value) {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, gender: '' },
                }));
            } else {
                this.setState(prevState => ({
                    errors: { ...prevState.errors, gender: 'Gender is required.' },
                }));
            }
        } else if (e.target.name === 'email') {
            if (e.target.value) {
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
        skill.id = this.state.formData.skills[this.state.formData.skills.length-1].id++;
        this.setState(prevState => ({
            formData: { ...prevState.formData, skills: [...prevState.formData.skills, { ...skill }]},
        }));
    }

    removeItem = (e) => {
        this.state.formData.skills.pop();
        this.setState({
            skills: [...this.state.formData.skills]
        })
    }

    submit = (e, index) => {
        let obj = this.state.data.find(e => e.id===this.state.formData.id);

        if(obj) {
            var mydata = this.state.data;
            mydata[this.state.index] = this.state.formData;
            this.setState({
                data: mydata
            }, () => {
            localStorage.setItem("data", JSON.stringify(this.state.data));
            })
        } else {
            var add = { ...this.state.formData };
            add.id = this.state.formData.id++;
            this.setState({add});
            this.state.data.push(Object.assign({}, this.state.formData));
        }
        this.setState( {
            data: this.state.data
        }, () => {
        localStorage.setItem("data", JSON.stringify(this.state.data));
        })
        
    }

    editData = (e, index) => {
        this.setState({
            formData: this.state.data[index],
            index: index,
            isEditMode: true
        }, () => {
            console.log(this.state.formData);
        })  
        this.validate(e)      
    }

    removeRow = (id) => {
        this.state.data.splice(id, 1);
        localStorage.setItem("data", JSON.stringify(this.state.data));
        this.setState({data: this.state.data});
    }

    getSkillRowIndex = (e, i) => {
        this.setState({
            skillIndex: i
        })
    }

    render() {
        return <div>

            <Container fluid>
                <Row>
                    <Col style={{ padding: '1rem', border: "2px solid grey" }}>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" value={this.state.formData.name} placeholder="Enter name" onChange={this.setValue}></Form.Control>
                                        {this.state.errors["name"] ? <span style={{ color: "red" }}>{this.state.errors["name"]}</span> : null}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="age">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control name="age" minLength="2" maxLength="2" type="text" value={this.state.formData.age} onChange={this.onChange, this.setValue} placeholder="Enter age"></Form.Control>
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
                            <Row>
                                <Col style={{padding: '24px', border: '3px solid #e2e2f1', margin: '14px'}}>
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
                                                            <option value="javascript">Javascript</option>
                                                        </Form.Control>
                                                        {this.state.errors["skill"] && index1==this.state.skillIndex ? <span style={{ color: "red" }}>{this.state.errors["skill"]}</span> : null}
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
                                                { this.state.formData.skills.length > 1 ? <button type="button" className="btn btn-circle" onClick={this.removeItem}><i className="fas fa-minus"></i></button> : null }

                                                    { this.state.formData.skills.length-1 <= index1 ? <button type="button" className="btn btn-circle ml-2" onClick={this.addItem}><i className="fas fa-plus"></i></button> : null }

                                                    {/* <FontAwesomeIcon icon={faHome} /> */}
                                                </Col>
                                            </Row>
                                        )
                                    })
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <button type="button" onClick={(e) => this.submit(e)} className="btn btn-primary"> {this.state.isEditMode ? 'Update' : 'Submit' }</button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col style={{ padding: '1rem', border: "2px solid grey" }}>
                        <Table responsive variant="dark" style={{borderRadius: '20px'}}>
                            <thead style={{background: 'rgb(38 115 118)', borderRadius: '20px !important'}}>
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
                                   { this.state.data?.map((e, index) =>
                                            <tr  key={index}>
                                                <td>{e.name}</td>
                                                <td>{e.age}</td>
                                                <td>{e.gender}</td>
                                                <td>{e.email}</td>
                                                <td>
                                                { e.skills?.map((e1, index) =>
                                                    <span   key={index}>{e1.skill}  {e1.exp} <br></br></span>
                                                )}
                                                </td>
                                                <td>
                                                <button type="button" style={{color: 'white'}} className="btn" onClick={(e) => this.editData(e, index)}><i className="fas fa-edit"></i></button>
                                                <button type="button" style={{color: 'white'}} className="btn ml-2" onClick={() => this.removeRow(index)}><i className="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                   )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    }
}

export default Welcome;