import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "images/clothes-model-1.jpeg";
import logo from "images/STYLOOP-01.png";
import { UsersContext } from "../contexts/Users";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { Redirect} from 'react-router-dom';
import SweetAlert from 'sweetalert';

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
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
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;


class SignupClient extends React.Component {
  static contextType = UsersContext
  logoLinkUrl = "#";
  illustrationImageSrc = illustration;
  headingText = "Sign Up For Styloop";
  submitButtonText = "Sign Up";
  SubmitButtonIcon = SignUpIcon;
  tosUrl = "#";
  privacyPolicyUrl = "#";
  signInUrl = "https://www.youtube.com/";

  state = {
    alert: {
      showAlert: false,
      title: '',
      text: '',
      icon: '',
    },
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {email, firstname, lastname, firstline, secondline, zipcode, city,
      state, country, merchant, username, password, confirmpassword} = this.state

    const { title, text, icon } = await this.context.registerUserBuyer(email, firstname, lastname, firstline, secondline, zipcode, city,
      state, country, merchant, username, password, confirmpassword, "buyer");

    if (title === "Done") {
      await this.context.logUserIn(email, password);
    }
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

    return(
    <AnimationRevealPage>
        <Container>
          <Content>
            <MainContainer>
              <LogoLink href={this.logoLinkUrl}>
                <LogoImage src={logo} />
              </LogoLink>
              <MainContent>
                <Heading>{this.headingText}</Heading>
                <FormContainer>
                  <Form>
                  <p>Personal:</p>
                    <Input type="email" placeholder="Email" onChange={this.handleInputChange} name="email"/>
                    <Input type="text" placeholder="First Name" onChange={this.handleInputChange} name="firstname"/>
                    <Input type="text" placeholder="Last Name" onChange={this.handleInputChange} name="lastname"/>
                    <br/> <br/>
                    <p>Address:</p>
                    <Input type="text" placeholder="Firstline" onChange={this.handleInputChange} name="firstline"/>
                    <Input type="text" placeholder="Secondline" onChange={this.handleInputChange} name="secondline"/>
                    <Input type="text" placeholder="Zipcode" onChange={this.handleInputChange} name="zipcode"/>
                    <Input type="text" placeholder="City" onChange={this.handleInputChange} name="city"/>
                    <Input type="text" placeholder="State" onChange={this.handleInputChange} name="state"/>
                    <Input type="text" placeholder="Country" onChange={this.handleInputChange} name="country"/>
                    <br/> <br/>
                    <p>Payment:</p>
                    <Input type="text" placeholder="Merchant" onChange={this.handleInputChange} name="merchant"/>
                    <Input type="text" placeholder="Username" onChange={this.handleInputChange} name="username"/>
                    <p>Security:</p>
                    <Input type="password" placeholder="Password" onChange={this.handleInputChange} name="password"/>
                    <Input type="password" placeholder="Confirm Password" onChange={this.handleInputChange} name="confirmpassword"/>
                    <SubmitButton type="button" onClick={this.handleSubmit}>
                      <this.SubmitButtonIcon className="icon" />
                      <span className="text">{this.submitButtonText}</span>
                    </SubmitButton>
                    <p tw="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by Styloop's{" "}
                      <a href={this.tosUrl} tw="border-b border-gray-500 border-dotted">
                        Terms of Service
                      </a>{" "}
                      and its{" "}
                      <a href={this.privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                        Privacy Policy
                      </a>
                    </p>

                    <p tw="mt-8 text-sm text-gray-600 text-center">
                      Already have an account?{" "}
                      <a href={"#"} tw="border-b border-gray-500 border-dotted">
                        Sign In
                      </a>
                    </p>
                  </Form>
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

export default SignupClient;