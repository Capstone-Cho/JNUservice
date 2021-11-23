import React, {useState} from 'react'
import LoginPage from '../LoginPage/LoginPage'
import RegisterPage from '../RegisterPage/RegisterPage'
import styled from 'styled-components'
// import './login_register.css'

const Container = styled.div`
    position: relative;
    width: 800px;
    height: 500px;
    margin: 100px auto;
`

const Banner = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 40px;
    width: 100%;
    height: 420px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 5px 45px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    background: #03a9f4;
    &.active {
        background: #f43648;
    }
`

const Box = styled.div`
    position: relative;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Box_h2 = styled.div`
    color: #fff;
    font-size: 1.7rem;
    font-weight: 500;
    margin-bottom: 10px;
`

const Box_button = styled.div`
    border: none;
    background: #fff;
    border-radius: 10px;
    padding: 5px 10px;
    cursor: pointer;
`

const FormBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: #fff;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 45px rgba(0, 0, 0, 0.25);
    transition: 0.5s ease-in-out;
    overflow: hidden;
    &.active {
        left: 50%;
    }
`

const Signin_form = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    transition: 0.5s;
    transition-delay: 0.25s;
    &.active {
        left: -100%;
    }
`

const Signup_form = styled.div`
    position: absolute;
    left: 0;
    width: 100%;
    transition: 0.5s;
    left: 100%;
    transition-delay: 0.25s;
    &.active {
        left: 0;
        transition-delay: 0.25s;
    }
`

const LoginRegisterPage = () => {
    const [isOn, setIsOn] = useState(true)

    const handlerActive = () => {
        setIsOn(!isOn)
    }

    return (
        <Container>
            <Banner className={isOn ? ' ' : 'active'}>
                <Box>
                    <Box_h2>Already Have an Account ?</Box_h2>
                    <Box_button onClick={handlerActive}>Sign in</Box_button>
                </Box>
                <Box>
                    <Box_h2>Don't Have an Account ?</Box_h2>
                    <Box_button onClick={handlerActive}>Sign up</Box_button>
                </Box>
            </Banner>

            <FormBox className={isOn ? ' ' : 'active'}>
                <Signin_form className={isOn ? ' ' : 'active'}>
                    <LoginPage />
                </Signin_form>
                <Signup_form className={isOn ? ' ' : 'active'}>
                    <RegisterPage />
                </Signup_form>
            </FormBox>
        </Container>
    )
}

export default LoginRegisterPage
