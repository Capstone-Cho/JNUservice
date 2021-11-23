import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import {loginUser} from '../../../_actions/user_actions'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {Checkbox} from 'antd'
import {useDispatch} from 'react-redux'
// import './LoginPage.css'

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
    border: 2px solid #03a9f4;
    margin-bottom: 20px;
    &:focus {
        outline: none;
        box-shadow: 0 1px 5px #03a9f4;
    }
`

const Button = styled.button`
    margin-top: 5px;
    background: #03a9f4;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    max-width: 100px;
    padding: 3px;
    cursor: pointer;
`

function LoginPage(props) {
    const dispatch = useDispatch()
    const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false

    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    }

    const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : ''

    return (
        <Formik
            initialValues={{
                email: initialEmail,
                password: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Email is invalid').required('Email is required'),
                password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                    }

                    dispatch(loginUser(dataToSubmit))
                        .then(response => {
                            if (response.payload.loginSuccess) {
                                window.localStorage.setItem('userId', response.payload.userId)
                                if (rememberMe === true) {
                                    window.localStorage.setItem('rememberMe', values.id)
                                } else {
                                    localStorage.removeItem('rememberMe')
                                }
                                console.log(props.history)

                                props.history.push('/')
                            } else {
                                setFormErrorMessage('Check out your Account or Password again')
                            }
                        })
                        .catch(err => {
                            setFormErrorMessage('Check out your Account or Password again')
                            setTimeout(() => {
                                setFormErrorMessage('')
                            }, 3000)
                        })
                    setSubmitting(false)
                }, 500)
            }}
        >
            {props => {
                const {values, touched, errors, isSubmitting, handleChange, handleSubmit} = props
                return (
                    <App className="app">
                        <Form onSubmit={handleSubmit}>
                            <H2>Sign In</H2>
                            <Input id="email" placeholder="Enter your email" type="email" value={values.email} onChange={handleChange} />
                            {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}

                            <Input
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            {errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}
                            {formErrorMessage && (
                                <label>
                                    <p
                                        style={{
                                            color: '#ff0000bf',
                                            fontSize: '0.7rem',
                                            border: '1px solid',
                                            padding: '1rem',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        {formErrorMessage}
                                    </p>
                                </label>
                            )}
                            <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe}>
                                Remember me
                            </Checkbox>
                            <Button className="login_button" disabled={isSubmitting} onSubmit={handleSubmit}>
                                Log In
                            </Button>
                            <div>
                                Or <a href="/register">register now!</a>
                            </div>
                        </Form>
                    </App>
                )
            }}
        </Formik>
    )
}

export default withRouter(LoginPage)
