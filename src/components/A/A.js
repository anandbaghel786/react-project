import { useFormik, Formik, Form, Field, FastField, FieldArray, ErrorMessage } from 'formik';
import { Col, Row, Container, Table } from 'react-bootstrap';
import React, { useState } from 'react';
import './A.css';
import * as Yup from 'yup';
import ErrorText from './ErrorText';

const initialValues = {
    id: 1,
    name: '',
    gender: 'Male',
    email: '',
    website: {
        facebook: '',
        twitter: ''
    },
    contacts: ['', ''],
    address: '',
    playerlist: ['']
}

const onSubmit = values => {
    console.log(values);
}

// const validate = values => {
//     let errors = {};
//     if (!values.id) {
//         errors.id = 'id is required!';
//     }

//     if (!values.name) {
//         errors.name = 'name is required!';
//     }

//     if (!values.gender) {
//         errors.gender = 'gender is required!';
//     }

//     if(!values.email) {
//         errors.email = 'email is required!';
//     } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(errors.email)) {
//         errors.email = 'incorrect email format!';
//     }

//     return errors;
// }



function A() {
    // const vs = 
    const validationSchema = Yup.object({
        id: Yup.string().required('id field is required!'),
        name: Yup.string().required('name field is required!'),
        gender: Yup.string().required('gender field is required!'),
        email: Yup.string().required('email field is required!').email('email format is not valid!'),
        website: Yup.object({
            facebook: Yup.string().required('fb profile field is required!'),
            twitter: Yup.string().required('twitter field is required!'),
        }),
        contacts: Yup.array().of(Yup.string().required('Contact field is required!')),
        address: Yup.string().required('Address field is required!'),
        playerlist: Yup.array().of(Yup.string().required('player name field is required!'))
    })

    const savedData = {
        "id": 1,
        "name": "lkj",
        "gender": "lj",
        "email": "ljl@mfil.c",
        "website": {
            "facebook": "khh",
            "twitter": "khj"
        },
        "contacts": [
            ",kjlk",
            "ljklj"
        ],
        "address": "jhkj",
        "playerlist": [
            "khj", "apple"
        ]
    }
    const [data, setData] = useState(null);
    const formik = useFormik(
        {
            initialValues,
            onSubmit,
            validationSchema
        });

    console.log(formik.touched);
    return <>
        <Formik initialValues={data || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} and validateOnBlur={true} enableReinitialize>
            {
                ({ resetForm, isValid }) => {
                    return (
                        <Container fluid="md">
                            <Form >
                                <Row>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label htmlFor="id">Id</label>
                                            <Field type="number" id="id" name="id" className="form-control" ></Field>
                                            <ErrorMessage name="id" className="invalid-feedback">{(errorMsg) => <div className="error">{errorMsg}</div>}</ErrorMessage>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <Field type="text" id="name" name="name" className="form-control" ></Field>
                                            <ErrorMessage name="name" className="invalid-feedback">{(errorMsg) => <div className="error">{errorMsg}</div>}</ErrorMessage>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label htmlFor="gender">Gender</label>
                                            <Field type="text" id="gender" name="gender" className="form-control" ></Field>
                                            <ErrorMessage name="gender" className="invalid-feedback">{(errorMsg) => <div className="error">{errorMsg}</div>}</ErrorMessage>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label htmlFor="email">email</label>
                                            <FastField type="email" id="email" name="email" className="form-control" ></FastField>
                                            <ErrorMessage name="email" className="invalid-feedback">{(errorMsg) => <div className="error">{errorMsg}</div>}</ErrorMessage>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label htmlFor="facebook">Facebook Profile</label>
                                            <Field type="text" id="facebook" name="website.facebook" className="form-control" ></Field>
                                            <ErrorMessage name="website.facebook" className="invalid-feedback">{(errorMsg) => <div className="error">{errorMsg}</div>}</ErrorMessage>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label htmlFor="twitter">Twitter Profile</label>
                                            <Field type="text" id="twitter" name="website.twitter" className="form-control" ></Field>
                                            <ErrorMessage name="website.twitter" className="invalid-feedback">{(errorMsg) => <div className="error">{errorMsg}</div>}</ErrorMessage>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label htmlFor="homeContact">Home Contact</label>
                                            <Field type="text" id="homeContact" name="contacts[0]" className="form-control" ></Field>
                                            <ErrorMessage name="contacts[0]" className="invalid-feedback">{(errorMsg) => <div className="error">{errorMsg}</div>}</ErrorMessage>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label htmlFor="officeContact">Office Contact</label>
                                            <Field type="text" id="officeContact" name="contacts[1]" className="form-control" ></Field>
                                            <ErrorMessage name="contacts[1]" className="invalid-feedback">{(errorMsg) => <div className="error">{errorMsg}</div>}</ErrorMessage>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <FastField as="textarea" type="text" id="address" name="address" className="form-control" ></FastField>
                                            <ErrorMessage name="address" className="invalid-feedback">{(errorMsg) => <div className="error">{errorMsg}</div>}</ErrorMessage>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <div className="form-group">
                                            <Row>
                                                <FieldArray type="text" id="playerlist" name="playerlist" className="form-control" >
                                                    {
                                                        (fieldArrayProps) => {
                                                            const { push, remove, form } = fieldArrayProps;
                                                            const { values } = form;
                                                            const { playerlist } = values;
                                                            return (
                                                                playerlist.map((player, index) =>
                                                                    <Col xs={6} key={index}>
                                                                        <label htmlFor="playerlist">Player Name</label>
                                                                        <div className="d-flex">
                                                                            <Field type="text" id={`playerlist[${index}]`} name={`playerlist[${index}]`} className="form-control" ></Field>
                                                                            {playerlist.length > 1 ? <button type="button" className="btn btn-primary ml-2 mr-2" onClick={() => remove(index)}>-</button> : null}
                                                                            {playerlist.length - 1 <= index ? <button type="button" className="btn btn-primary ml-1" onClick={() => push('')}>+</button> : null}
                                                                        </div>
                                                                        <ErrorMessage name={`playerlist[${index}]`} className="invalid-feedback">{(errorMsg) => <div className="error">{errorMsg}</div>}</ErrorMessage>
                                                                    </Col>
                                                                )
                                                            )
                                                        }
                                                    }
                                                </FieldArray>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <button type="submit" disabled={!isValid} className="btn btn-primary">Submit{isValid}</button>
                                <button type="reset" onClick={() => resetForm()}>Reset</button>
                                <button type="button" className="btn btn-primary" onClick={() => setData(savedData)}>Fill Data{isValid}</button>
                            </Form>
                            {/* <button type="button" className="btn btn-primary" onClick={() => formikProps.validateField("name")}>Validate Address</button>
                            <button type="button" className="btn btn-primary" onClick={() => formikProps.validateForm()}>Validate Form</button>
                            <button type="button" className="btn btn-primary" onClick={() => formikProps.setFieldTouched("name")}>Touch Address</button>
                            <button type="button" className="btn btn-primary" onClick={() => formikProps.setTouched({
                                id: true,
                                name: true,
                                gender: true,
                                email: true,
                                website: {
                                    facebook: true,
                                    twitter: true
                                },
                                contacts: true,
                                address: true,
                                playerlist: [true, true]
                            })}>Touch Form</button> */}
                        </Container>
                    )
                }
            }
        </Formik>
    </>
}

export default A

{/* <Container fluid>
<Form onSubmit={formik.handleSubmit} >
    <Row>
        <Col xs={6}>
            <Form.Group controlId="id">
                <Form.Label>Id</Form.Label>
                <Form.Control type="number" name="id" {...formik.getFieldProps('id')} ></Form.Control>
                {formik.touched.id && formik.errors.id ? <div className="error">{formik.errors.id}</div> : null}
            </Form.Group>
        </Col>
    </Row>
    <Row>
        <Col xs={6}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" {...formik.getFieldProps('name')} ></Form.Control>
                {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
            </Form.Group>
        </Col>
    </Row>
    <Row>
        <Col xs={6}>
            <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control type="text" name="gender" {...formik.getFieldProps('gender')} ></Form.Control>
                {formik.touched.gender && formik.errors.gender ? <div className="error">{formik.errors.gender}</div> : null}
            </Form.Group>
        </Col>
    </Row>
    <Row>
        <Col xs={6}>
            <Form.Group controlId="email">
                <Form.Label>email</Form.Label>
                <Form.Control type="email" name="email" {...formik.getFieldProps('email')} ></Form.Control>
                {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
            </Form.Group>
        </Col>
    </Row>
    <Row>
        <Col xs={6}>
            <button className="btn btn-primary">Submit</button>
        </Col>
    </Row>
</Form>
</Container> */}

