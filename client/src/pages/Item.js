import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/clothes-model-1.jpeg";
import logo from "images/STYLOOP-01.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { UsersContext } from "../contexts/Users";
import { Component } from "react";
import NavBar from "components/hero/NavBar";
import { Redirect, Link , useHistory} from 'react-router-dom';
import {history} from '../global';
import { Subheading } from "components/misc/Headings";
const axios = require('axios')

const Container = tw(ContainerBase)`min-h-screen bg-teal-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Description = tw.span`inline-block mt-8`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

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

class ItemPage extends Component {
    constructor(props){
        super(props)
    }
  
  static contextType = UsersContext;
  logoLinkUrl = "#";
  illustrationImageSrc = illustration;
  headingText = "Sign In To Styloop As A Seller";
  submitButtonText = "Sign In";
  SubmitButtonIcon = LoginIcon;
  forgotPasswordUrl = "#";
  signupUrl = "/sign-up-seller";

  state = {
    isFetching: true,
    itemInfo: {},
    alert: {
      showAlert: false,
      title: '',
      text: '',
    },
  };

  handleSubmit = async (event) => {

  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentDidMount = async () => {
    const {item, store} = this.props.match.params;
    console.log(store)
    console.log(item)
    const params = 'store=' + store;
     const res = await fetch('http://localhost:5000/api/item/info?store='+store+"&name="+item, 
    {
          credentials: 'include',
          method: 'GET',
    });
    const info  = await res.json();
    this.setState({itemInfo: info[0], isFetching: false})
  }

  render() {

    if (!this.context.isLoading && !this.context.isLoggedIn) {
        return <Redirect to="/login" />;
    } 

    return ( 
        
      <AnimationRevealPage>
      <NavBar/>
      <Container>
        <Content>
        <IllustrationContainer>
            <IllustrationImage imageSrc={this.state.isFetching ? " " :  this.state.itemInfo.pictures[0]} />
          </IllustrationContainer>
          <MainContainer>
            {/* <LogoLink href={this.logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink> */}

            <MainContent>

              <Heading>{this.state.isFetching ? "Hi" : this.state.itemInfo.name}</Heading>
              <Subheading>{this.state.isFetching ? "Hi" : this.state.itemInfo.store}</Subheading>
              <Description>
                  {this.state.isFetching ? "Hi" : this.state.itemInfo.description}
                  <br></br>
                  <br></br>
                  <p>Price: ${this.state.isFetching ? "Hi" : this.state.itemInfo.price}</p> 
              </Description>
              {/* <FormContainer>
                <Form onSubmit={this.handleSubmit} >
                  <Input type="email" placeholder="Email" name="email" onChange={this.handleInputChange} />
                  <Input type="password" placeholder="Password" name="password" onChange={this.handleInputChange} />
                  <SubmitButton type="submit" onSubmit={this.handleSubmit}>
                    <this.SubmitButtonIcon className="icon" />
                    <span className="text">{this.submitButtonText}</span>
                  </SubmitButton>
                </Form>
              </FormContainer> */}
            </MainContent>
          </MainContainer>

        </Content>
      </Container>
    </AnimationRevealPage>
    );
            
  }
}

export default ItemPage;

