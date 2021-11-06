import React, { useState } from "react";
import NavBar from 'components/hero/NavBar';
import { UsersContext } from "../contexts/Users";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";

import { Container as ContainerBase, ContentWithVerticalPadding, ContentWithPaddingLg } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import TabGrid from "components/cards/SimpleTabCard.js";
import ContactUs from "./ContactUs";


const Container = tw(ContainerBase)`h-32 bg-teal-900 text-white font-medium flex justify-center -m-8`;
const Heading = tw(SectionHeading)`max-w-3xl lg:max-w-4xl lg:text-center leading-tight`;
const Row = tw.div`flex items-center flex-col lg:flex-row`;
const TextColumn = tw.div`text-center lg:text-left`;

//-------------------------------------------------------------------
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
//const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
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
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;
//-------------------------------------------------------------------




class AddProduct extends React.Component {
    static contextType = UsersContext;
    SubmitButtonIcon = SignUpIcon;
    
    state = {
        itemsURL : "http://localhost:5000/api/item/info?store="+this.context.user.store,
        items : []
    }

    async componentDidMount() {
        console.log('fetch '+this.state.itemsURL)
        try{
            const res = await fetch(this.state.itemsURL, {
                credentials: 'include',
                method: 'GET'
            });
            const data = await res.json();
            this.setState( 
                data.map((article)=>{
                    this.state.items.push({imageSrc:article.pictures[0], title:article.name, content:article.store, price:article.price, url:"/shop/"+article.store+"/"+article.name})
                })
            );
            console.log('trajo los datos')
            console.log(data);
        }
        catch{
            console.log("error trayendo los items")
        }
    }

    handleInputChange(){
        console.log('un campo se llenó')
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log("se enviaron los datos")
    };

   
    render () {
        const HighlightedText = tw.span`bg-teal-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
        const Description = tw.span`inline-block mt-0 text-center p-12`;
        const imageCss = tw`rounded-4xl`;
        console.log("render");
        return(
            <AnimationRevealPage>
                <NavBar/>
                <Container>
                    <Description>Fill the requiered fields to upload a new item to your store.</Description>
                </Container>
                <ContentWithPaddingLg>
                <FormContainer>
                  <Form>
                    <p>Item information:</p>
                    <Input type="text" placeholder="Item Name" onChange={this.handleInputChange} name="itemname"/>
                    <Input type="text" placeholder="Description" onChange={this.handleInputChange} name="itemdescription"/>
                    <Input type="number" min="1" placeholder="Quantity" onChange={this.handleInputChange} name="itemquantity"/>
                    <Input type="number" min="0" placeholder="Price" onChange={this.handleInputChange} name="itemprice"/>
                    <br/> <br/>
                    <p>Attach images:</p>
                    <Input type="file" accept="image/*" onChange={this.handleInputChange} name="itemimage"/>
                    <br/><br/>
                    <p>Sizes:</p>
                    <Row>
                        <Input type="checkbox" placeholder="sizeS" onChange={this.handleInputChange} name="store"/>S
                        <Input type="checkbox" placeholder="sizeM" onChange={this.handleInputChange} name="asd"/>M
                        <Input type="checkbox" placeholder="sizeL" onChange={this.handleInputChange} name="fdg"/>L
                    </Row>
                    <br/><br/>
                    <p>Colors:</p>
                    <Row>
                        <Input type="checkbox" placeholder="sizeS" onChange={this.handleInputChange} name="sto"/> RED
                        <Input type="checkbox" placeholder="sizeM" onChange={this.handleInputChange} name="asd"/> WHITE
                        <Input type="checkbox" placeholder="sizeL" onChange={this.handleInputChange} name="fdg"/> BLACK
                    </Row>
                    <br/><br/>
                    <SubmitButton type="button" onClick={this.handleSubmit}>
                        {/*<this.SubmitButtonIcon className="icon" />*/}
                        <span className="text">Add to my store</span>
                    </SubmitButton>
                  </Form>
                </FormContainer>
                </ContentWithPaddingLg>
                <Footer />
            </AnimationRevealPage>
        ) 
    }
        
}

export default AddProduct