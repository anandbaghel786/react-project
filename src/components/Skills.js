import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { Col, Row, Form } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

export const Skills = (props) => {

    let skill = {
        id: 1,
        skill: '',
        exp: ''
    }
    let skillIndex = null;
    let userName = props.form.name ? props.form.name : 'User';
    let [isModalOpen, setIsisModalOpen] = useState(false);
    const [skillList, setSkills] = useState([...props.form.skills]);

    React.useEffect(() => {
        setSkills(props.form.skills);
    }, [props.form.skills])

    const skillsModel = React.createRef();

    function setValue(e) {
        let field = e.target.name;
        let index = 0;
        if (field.includes('skill') || field.includes('exp')) {
            index = field.includes('skill') ? field.slice(5) : field.slice(3);
            field = field.includes('skill') ? field.slice(0, 5) : field.slice(0, 3);
        }

        let skills = [...skillList];
        let form = { ...props.form };
        switch (field) {
            case 'skill':
                skills[index].skill = e.target.value;
                break;

            case 'exp':
                skills[index].exp = e.target.value;
                break;

            default:
                break;
        }
        form.skills = skills;
        setSkills(form.skills)
        // this.validate(e);
    }

    function hideShowModal() {
        // skillsModel.modal.show();
        setIsisModalOpen(!isModalOpen)
        props.setUserSkills(skillList.filter(ele => ele.skill && ele.exp))
    };

    function getSkillRowIndex(e, i) {
        skillIndex = i;
    }

    function addItem(e) {
        let skillList1 = [...skillList, skill]
        setSkills(skillList1);
    }

    function removeItem(e, index) {
        let skillList1 = [...skillList]
        skillList1.splice(index, 1);
        setSkills(skillList1);
    }


    return <>
        <div style={{ paddingRight: '0rem', textAlign: 'end' }}>
            <NavLink exact to={{ pathname: "/welcome", state: { isAdmin: true } }} activeStyle={{ color: 'white', padding: '5px', background: 'black', borderRadius: '10%' }} onClick={() => hideShowModal()}>
                Add Skills
            </NavLink>
        </div>
        {/* <Button variant="primary" >
            Click to hide/show
        </Button> */}
        <Modal ref={skillsModel}
            show={isModalOpen}
            onHide={hideShowModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Skills</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col style={{ padding: '0 66px 0px 26px' }}>
                        <Form.Label style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{userName.charAt(0).toUpperCase() + userName.slice(1)}'s skills:</Form.Label>
                        {skillList.map((skill, index1) => {
                            return (
                                <Row key={index1}>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label>Skill Name</Form.Label>
                                            <Form.Control as="select" type="exskillp" id={"skill" + index1} name={"skill" + index1} value={skill.skill} placeholder="Enter skill" onChange={setValue} onFocus={(e) => getSkillRowIndex(e, index1)}>
                                                <option value="">Select</option>
                                                <option value="angular">Angular</option>
                                                <option value="angularjs">AngularJS </option>
                                                <option value="node JS">Node JS</option>
                                                <option value="javascript">Java Script</option>
                                                <option value="java">Java</option>
                                                <option value="bigData">Big Data</option>
                                            </Form.Control>
                                            {/* {this.state.errors["skill"] && index1 == this.state.skillIndex ? <span style={{ color: "red" }}>{this.state.errors["skill"]}</span> : null} */}
                                        </Form.Group>
                                    </Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label>Experience</Form.Label>
                                            <Form.Control type="exp" id={"exp" + index1} name={"exp" + index1} value={skill.exp} onChange={setValue} placeholder="Enter exp"></Form.Control>
                                            {/* {this.state.errors["exp"] ? <span style={{ color: "red" }}>{this.state.errors["exp"]}</span> : null} */}
                                        </Form.Group>
                                    </Col>
                                    <Col md={2} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                        {skillList.length > 1 ? <button type="button" className="btn btn-circle" onClick={(e) => removeItem(e, index1)}><i className="fas fa-minus"></i></button> : null}

                                        {skillList.length - 1 <= index1 ? <button type="button" className="btn btn-circle ml-2" onClick={addItem}><i className="fas fa-plus"></i></button> : null}
                                    </Col>
                                </Row>
                            )
                        })
                        }
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideShowModal}>
                    Close
          </Button>
                <Button variant="primary" onClick={() => props.setUserSkills(skillList.filter(ele => ele.skill && ele.exp)), hideShowModal}>Set User Skills</Button>
            </Modal.Footer>
        </Modal>
        <div></div>
    </>

}