import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "images/clothes-model-1.jpeg";
import logo from "images/STYLOOP-01.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { UsersContext } from "../contexts/Users";
import { Component } from "react";
import { Redirect} from 'react-router-dom';
import SweetAlert from 'sweetalert';


const Container = tw(ContainerBase)`min-h-screen bg-teal-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

class LoginBuyer extends Component {
  
  static contextType = UsersContext;
  logoLinkUrl = "#";
  illustrationImageSrc = illustration;
  headingText = "Sign In To Styloop";
  submitButtonText = "Sign In";
  SubmitButtonIcon = LoginIcon;
  forgotPasswordUrl = "#";
  signupUrl = "http://localhost:3000/sign-up";

  state = {
    email: '',
    password: '',
    alert: {
      showAlert: false,
      title: '',
      text: '',
      icon: '',
    },
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {email, password} = this.state
    let { title, text, icon } = await this.context.logUserIn(email, password);

    this.setState({
      alert: {
        showAlert: true,
        title,
        text,
        icon,
      },
    });
  };




  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    if (this.context.isLoggedIn) {
      return <Redirect to="/shop" />;
    }

    const { showAlert, title, text, icon} = this.state.alert;
    if (showAlert) {
        SweetAlert({title, text, icon})
        this.setState({ alert: { showAlert: false } })
    }
      
    return ( 
        <AnimationRevealPage>
      {/* <SweetAlert 
      show={showAlert}
      title={title}
      text={text}
      icon={icon}
      onConfirm={() => this.setState({ alert: { showAlert: false } })}/> */}
          <Container>
            <Content>
              <MainContainer>
                <LogoLink href={this.logoLinkUrl}>
                  <LogoImage src={logo} />
                </LogoLink>
                <MainContent>
                  <Heading>{this.headingText}</Heading>
                  <FormContainer>
                    <Form onSubmit={this.handleSubmit}>
                      <Input type="email" placeholder="Email" name="email" onChange={this.handleInputChange} />
                      <Input type="password" placeholder="Password" name="password" onChange={this.handleInputChange} />
                      <SubmitButton type="submit" onSubmit={this.handleSubmit}>
                        <this.SubmitButtonIcon className="icon" />
                        <span className="text">{this.submitButtonText}</span>
                      </SubmitButton>
                    </Form>
                    <p tw="mt-6 text-xs text-gray-600 text-center">
                      <a href={this.forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                        Forgot Password ?
                      </a>
                    </p>
                    <p tw="mt-8 text-sm text-gray-600 text-center">
                      Dont have an account?{" "}
                      <a href={this.signupUrl} tw="border-b border-gray-500 border-dotted">
                        Sign Up
                      </a>
                    </p>
                  </FormContainer>
                </MainContent>
              </MainContainer>
              <IllustrationContainer>
                <IllustrationImage imageSrc={this.illustrationImageSrc} />
              </IllustrationContainer>
            </Content>
          </Container>
        </AnimationRevealPage>
    );
  }
}

export default LoginBuyer;
