import React from 'react'
import moment from 'moment'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {registerUser} from '../../../_actions/user_actions'
import {useDispatch} from 'react-redux'

// import './RegisterPage.css'

import styled from 'styled-components'

const App = styled.div`
    position: relative;
    width: 400px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Form = styled.form`
    width: 100%;
    margin: 50px;
    display: flex;
    flex-direction: column;
`

const H2 = styled.h2`
    font-size: 2rem;
`

const Input = styled.input`
    line-height: 20px;
    padding: 5px 15px;
    border-radius: 10px;
    border: 2px solid #f43648;
    margin-bottom: 20px;
    &:focus {
        outline: none;
        box-shadow: 0 1px 5px #f43648;
    }
`

const Button = styled.button`
    margin-top: 5px;
    background: #f43648;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    max-width: 100px;
    padding: 3px;
    cursor: pointer;
`

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
}

function RegisterPage(props) {
    const dispatch = useDispatch()
    return (
        <Formik
            initialValues={{
                email: '',
                lastName: '',
                name: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required('Name is required'),
                lastName: Yup.string().required('Last Name is required'),
                email: Yup.string().email('Email is invalid').required('Email is required'),
                password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm Password is required'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        lastname: values.lastname,
                        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
                    }

                    dispatch(registerUser(dataToSubmit)).then(response => {
                        if (response.payload.success) {
                            window.location.replace('/login_register')
                        } else {
                            alert(response.payload.err.errmsg)
                        }
                    })

                    setSubmitting(false)
                }, 500)
            }}
        >
            {props => {
                const {values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset} = props
                return (
                    <App className="app">
                        <Form onSubmit={handleSubmit}>
                            <H2>Sign up</H2>
                            <Input id="name" placeholder="Enter your name" type="text" value={values.name} onChange={handleChange} />
                            {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}

                            <Input
                                id="lastName"
                                placeholder="Enter your Last Name"
                                type="text"
                                value={values.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && touched.lastName && <div className="input-feedback">{errors.lastName}</div>}

                            <Input id="email" placeholder="Enter your Email" type="email" value={values.email} onChange={handleChange} />
                            {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}

                            <Input
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            {errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}

                            <Input
                                id="confirmPassword"
                                placeholder="Enter your confirmPassword"
                                type="password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && touched.confirmPassword && (
                                <div className="input-feedback">{errors.confirmPassword}</div>
                            )}
                            <Button onClick={handleSubmit} disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Form>
                    </App>
                )
            }}
        </Formik>
    )
}

export default RegisterPage
