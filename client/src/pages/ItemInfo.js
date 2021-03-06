import React, {setState} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "images/clothes-model-1.jpeg";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/corner-down-right.svg";
import { UsersContext } from "../contexts/Users";
import { Component } from "react";
import NavBar from "components/hero/NavBar";
import { Redirect, Link , useHistory} from 'react-router-dom';
import { Subheading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

const Container = tw(ContainerBase)`min-h-screen bg-teal-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const Description = tw.span`inline-block mt-8`;
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
        color: "none"
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

    handleSubmit = async() => {
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
    }

    componentDidMount = async () => {
        const {item, store} = this.props.match.params;
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
                        <br></br>
                        <br></br>
                        {/*--------------AQUI SE CAMBIAN LOS REVIEWS------------------------ */}
                        <HighlightedText>Reviews</HighlightedText>
                        <br></br>
                        <div style={{maxHeight:"200px", scrollBehavior:"smooth", overflowY:"scroll"}}>{this.state.isFetching ? "Hi" : this.state.itemInfo.reviews.map((d) => <p>{d.firstname} {d.lastname}: <br/> {d.rating} stars<br/> - {d.comment}<br/><br/></p>)} </div>
                        
                    </Description>
                    
                    </MainContent>
                </MainContainer>

                </Content>
            </Container>
            </AnimationRevealPage>
            );      
    }
}

export default ItemPage;

