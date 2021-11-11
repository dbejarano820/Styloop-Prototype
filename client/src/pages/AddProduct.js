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

class AddProduct extends React.Component {
    static contextType = UsersContext;
    SubmitButtonIcon = SignUpIcon;
    
    state = {
        itemsaved : false,
        addproductURL : "http://localhost:5000/api/item/create",
        istore : "",
        iname : "",
        idescription : "",
        imaterial : "",
        iquantity : 0,
        iprice : 0,
        ishipping : 0,
        iimages : [],
        isizes : [],
        icolors : []
    }

    handleInputChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
        //console.log(event.target.value)
    };

    handleInputImages = (event) => {
        this.setState({
            [event.target.name] : [event.target.value]    
        });
        //console.log(event.target.value)
    };

    handleInputList = (event) => {
        const arrayData = event.target.value.split(",");
        this.setState({
            [event.target.name] : arrayData
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const {store} = this.props.match.params
        this.state.istore = store;

        const requestOptions = {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.iname,
                store: store,
                description: this.state.idescription,
                sizes: this.state.isizes,
                colors: this.state.icolors,
                material: this.state.imaterial,
                quantity: this.state.iquantity,
                price: this.state.iprice,
                pictures: this.state.iimages,
                reviewQuantity: 0,
                shippingPrice: this.state.ishipping
            })
        };
        try{
            const res = await fetch(this.state.addproductURL, requestOptions);
            console.log(requestOptions);
            this.setState({itemsaved : true});
        }
        catch{
            console.log("error guardando items")
        }
    };

   
    render () {
        const Description = tw.span`inline-block mt-0 text-center p-12`;

        if(this.state.itemsaved){
            this.state.itemsaved = false;
            return <Redirect to={"/seller/mystore/"+this.state.istore}/>;
        }
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
                    <Input type="text" placeholder="Item Name" onChange={this.handleInputChange} name="iname"/>
                    <Input type="text" placeholder="Description" onChange={this.handleInputChange} name="idescription"/>
                    <Input type="number" min="1" placeholder="Quantity" onChange={this.handleInputChange} name="iquantity"/>
                    <Input type="number" min="0" placeholder="Price" onChange={this.handleInputChange} name="iprice"/>
                    <Input type="number" min="1" placeholder="Shipping Price" onChange={this.handleInputChange} name="ishipping"/>
                    <Input type="text" placeholder="Material" onChange={this.handleInputChange} name="imaterial"/>
                    <br/> <br/>
                    <p>Attach images:</p>
                    {/*<Input type="file" accept=".png, .jpg, .jpeg" onChange={this.handleInputImage} name="itemimage"/>*/}
                    <Input type="text" placeholder="Image URL" onChange={this.handleInputImages} name="iimages"/>
                    <br/><br/>
                    <p>Sizes (please write sizes separated by comma):</p>
                    <Input type="text" placeholder="Example: S,M,L" onChange={this.handleInputList} name="isizes"/>
                    <br/><br/>
                    <p>Colors (please write colors separated by comma):</p>
                    <Input type="text" placeholder="Example: BLUE,BLACK,WHITE" onChange={this.handleInputList} name="icolors"/>
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