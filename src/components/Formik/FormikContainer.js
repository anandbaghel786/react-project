import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import { Col, Container, Row } from 'react-bootstrap';
import Manager1 from '../company/managers/Manager1';
import Manager2 from '../company/managers/Manager2';
import { UserProvider } from '../company/Accessories/Context/UserContext';
import { AdminProvider } from '../company/Accessories/Context/AdminContext';

function FormikContainer() {
    const dropdownOptions = [
        { key: 'Select options', value: '' },
        { key: 'Option 2', value: 'option2' },
        { key: 'Option 1', value: 'option1' }
    ]

    const radioOptions = [
        { key: 'Option 1', value: 'rOption1' },
        { key: 'Option 2', value: 'rOption2' },
        { key: 'Option 3', value: 'rOption3' }
    ]

    const checkboxOptions = [
        { key: 'Option 1', value: 'cbOption1' },
        { key: 'Option 2', value: 'cbOption2' },
        { key: 'Option 3', value: 'cbOption3' }
    ]

    const initialValues = {
        id: 1,
        name: 'anand',
        email: '',
        selectoption: 'option2',
        radiooption: 'rOption1',
        checkboxoption: ['cbOption3']
    };
    const validationSchema = Yup.object({});
    const onSubmit = (values) => console.log("Form data: ", values);
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <UserProvider value='Value from parent(Formik Container) through UserProvider Context'>
                            <AdminProvider value='Value from parent(Formik Container) through AdminProvider Context'>
                                <Manager1 />
                            </AdminProvider>
                        </UserProvider>
                    </Col>
                    <Col>
                        <Manager2 />
                    </Col>
                </Row>
            </Container>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
                {
                    (formikProps) => {
                        return (
                            <div>
                                <Container fluid="md">
                                    <Form>
                                        <Row>
                                            <Col xs={6}>
                                                <FormikControl control="input" type='number' label='id' name='id' />
                                            </Col>
                                            <Col xs={6}>
                                                <FormikControl control="input" type='text' label='name' name='name' />
                                            </Col>
                                            <Col xs={6}>
                                                <FormikControl control="textarea" type='email' label='email' name='email' />
                                            </Col>
                                            <Col xs={6}>
                                                <FormikControl control="select" label='selectoption' name='selectoption' options={dropdownOptions} />
                                            </Col>
                                            <Col xs={6}>
                                                <FormikControl control="radio" label='radiooption' name='radiooption' options={radioOptions} />
                                            </Col>
                                            <Col xs={6}>
                                                <FormikControl control="checkbox" label='checkbox topics' name='checkboxoption' options={checkboxOptions} />
                                            </Col>
                                        </Row>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </Form>
                                </Container>
                            </div>
                        )
                    }
                }
            </Formik>
        </div>
    )
}

export default FormikContainer
