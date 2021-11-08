import React, {setState} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/clothes-model-1.jpeg";
import logo from "images/STYLOOP-01.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/corner-down-right.svg";
import { UsersContext } from "../contexts/Users";
import { Component } from "react";
import NavBar from "components/hero/NavBar";
import { Redirect, Link , useHistory} from 'react-router-dom';
import {history} from '../global';
import { Subheading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import BuyItem from "pages/Buy.js";

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
const PrimaryButton = tw(PrimaryButtonBase)`mt-8 inline-block w-56 tracking-wide text-center py-5`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-0`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;
const HighlightedText = tw.span`bg-teal-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;




class ItemPage extends Component {
    constructor(props){
        super(props)

    }
    static contextType = UsersContext;
    logoLinkUrl = "#";
    illustrationImageSrc = illustration;
    headingText = "Sign In To Styloop As A Seller";
    submitButtonText = "Comment";
    SubmitButtonIcon = LoginIcon;
    forgotPasswordUrl = "#";
    signupUrl = "/sign-up-seller";

    state = {
        isFetching: true,
        itemInfo: {},
        size: "none",
        color: "none",
        isBuying : false
    };

    handleInputChange = (event) => {
        this.setState({
        [event.target.name]: event.target.value,
        });
    };

    handleColorChange = async(e) => {
        this.setState({color: e.target.value})
    }

    handleSizeChange = async(e) => {
        this.setState({size: e.target.value})
    }

    handleBuy = (event) => {
        this.setState ({isBuying : true});
    };

    handleSubmit = async(event) => {
        const firstname = this.context.user.firstname
        const lastname = this.context.user.lastname
        const {rating, comment} = this.state
        const {item, store} = this.props.match.params;

        const res = await fetch('http://localhost:5000/api/item/writereview', 
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify({name: item, store, firstname, lastname, rating, comment}),
        });
        
        await res.json()
    };

    componentDidMount = async () => {
        const {item, store} = this.props.match.params;
        const params = 'store=' + store;
        const res = await fetch('http://localhost:5000/api/item/info?store='+store+"&name="+item, 
        {
            credentials: 'include',
            method: 'GET',
        });
        const info  = await res.json();
        this.setState({itemInfo: info[0], isFetching: false})
    };

    render() {

        if (!this.context.isLoading && !this.context.isLoggedIn) {
            return <Redirect to="/login" />;
        } 

        if(this.state.isBuying){
            return(
                <BuyItem
                    userinfo={{merchant : "CORREGIR ESTO"/*this.context.user.paymentmethods.merchant*/, user:"CORREGIR"/*this.context.user.paymentmethods.user*/}}
                    iteminfo={{store: this.context.user.store, name:this.state.itemInfo.name, 
                        price:this.state.itemInfo.price, shipping :this.state.itemInfo.shippingPrice}}
                />
            )
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
            <MainContent>
                <Heading>{this.state.isFetching ? "Hi" : this.state.itemInfo.name}</Heading>
                <Subheading>{this.state.isFetching ? "Hi" : this.state.itemInfo.store}</Subheading>
                <Description>
                    {this.state.isFetching ? "Hi" : this.state.itemInfo.description}
                    <br></br>
                    
                    <p>Material: {this.state.isFetching ? "Hi" : this.state.itemInfo.material}</p> 
                    <br></br>
                    
                    <p>Price: ${this.state.isFetching ? "Hi" : this.state.itemInfo.price}</p> 
                    <br></br>
                    <p>Available Sizes: </p>
                    <select value={this.state.size} onChange={this.handleSizeChange}>{this.state.isFetching ? "Hi" : this.state.itemInfo.sizes.map((d) => <option>{d}</option>)}</select>
                    <br></br>
                    <br></br>
                    <p>Colors:</p>
                    <select value={this.state.color} onChange={this.handleColorChange}>{this.state.isFetching ? "Hi" : this.state.itemInfo.colors.map((d) => <option>{d}</option>)}</select>
                    <br></br>
                    <SubmitButton type="button" onClick={this.handleBuy}>
                        <span className="text">Buy now</span>
                    </SubmitButton>
                    <br></br>
                    <br></br>
                    <br></br>
                    <HighlightedText>Reviews</HighlightedText>
                    <br></br>
                    <div style={{maxHeight:"200px", scrollBehavior:"smooth", overflowY:"scroll"}}>{this.state.isFetching ? "Hi" : this.state.itemInfo.reviews.map((d) => <p>{d.firstname} {d.lastname}: <br/> {d.rating} stars<br/> - {d.comment}<br/><br/></p>)} </div>
                    
                </Description>
                <FormContainer>
                <Form onSubmit={this.handleSubmit} >
                    <Input type="text" placeholder="Rating" name="rating" onChange={this.handleInputChange} />
                    <Input type="text" placeholder="Comment" name="comment" onChange={this.handleInputChange} />
                    <SubmitButton type="submit" onSubmit={this.handleSubmit}>
                    <this.SubmitButtonIcon className="icon" />
                    <span className="text">{this.submitButtonText}</span>
                    </SubmitButton>
                </Form>
                </FormContainer>
            </MainContent>
            </MainContainer>

            </Content>
        </Container>
        </AnimationRevealPage>
        );
                
    }
}

export default ItemPage;

