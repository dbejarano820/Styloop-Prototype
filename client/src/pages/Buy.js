import React, { useState } from "react";
import NavBar from 'components/hero/NavBar';
import { UsersContext } from "../contexts/Users";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { Redirect, Link , useHistory} from 'react-router-dom';

import { Container as ContainerBase, ContentWithVerticalPadding, ContentWithPaddingLg } from "components/misc/Layouts.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";



const Container = tw(ContainerBase)`h-32 bg-teal-900 text-white font-medium flex justify-center -m-8`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const HighlightedText = tw.span`bg-teal-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
const Column = tw.div`mt-0 lg:w-1 w-24`;

const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .text {
    ${tw`ml-0`}
  }
`;


export default ({
    userinfo = {},
    iteminfo = {}
}) => {
    
    const Description = tw.span`inline-block mt-0 text-left p-12`;
    
    const handleSubmit = () =>{
        console.log("poop")
        //return (<Redirect to="/profile"/>);
    }

    return(
        
        <AnimationRevealPage>
            <NavBar/>
            <Container>
                <Description>Please confirm the information below and proceed with the purchase.</Description>
            </Container>
            <ContentWithPaddingLg>
            
            <Form>
                <div style={{ width: 350, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 15 }}>
                    <div>
                        <p><b>Payment method:</b></p><br></br>
                        <p><b>Payment user:</b></p><br></br>
                        <p><b>Item:</b></p><br></br>
                        <p><b>Item Price:</b></p><br></br>
                        <p><b>Shipping Price:</b></p><br></br>
                        <p><b>Total:</b></p><br></br>
                    </div>
                    <div>
                        <p>{userinfo.merchant}</p><br></br>
                        <p>{userinfo.user}</p><br></br>
                        <p>{iteminfo.name}</p> <br></br>
                        <p>{iteminfo.price}</p><br></br>
                        <p>{iteminfo.shipping}</p><br></br>
                        <p>{(iteminfo.price+iteminfo.shipping)}</p><br></br>
                    </div>             
                </div>
                <div>
                <SubmitButton width="100" type="button" onSubmit={handleSubmit}>
                    <span className="text">Purchase</span>
                </SubmitButton>                
                </div>
            </Form>
            
            </ContentWithPaddingLg>
            <Footer />
        </AnimationRevealPage>
    ) 
    
        
};
