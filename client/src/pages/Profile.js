import React from 'react';
import Hero from "components/hero/TwoColumnWithPrimaryBackground";
import NavBar from 'components/hero/NavBar';
import { UsersContext } from "../contexts/Users";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { Container as ContainerBase, ContentWithVerticalPadding, ContentWithPaddingLg } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import HeaderBase, {
    LogoLink as LogoLinkBase,
    NavLinks,
    NavLink as NavLinkBase,
    PrimaryLink as PrimaryLinkBase
  } from "../components/headers/light.js";
const Container = tw(ContainerBase)`min-h-screen bg-teal-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const infoContainer = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const Details = tw.div`p-6 rounded border-2 border-t-0 rounded-t-none border-dashed border-primary-100 flex-1 flex flex-col items-center text-center lg:block lg:text-left`;

const Heading = tw(SectionHeading)`max-w-3xl lg:max-w-4xl lg:text-left leading-tight`;
const Email = tw.span`text-sm mt-6 block text-gray-500`;
const Row = tw.div`flex items-center flex-col lg:flex-row`;
const PrimaryBackgroundContainer = tw.div`-mx-8 px-8 bg-teal-900 text-gray-100`;
const Header = tw(HeaderBase)`max-w-none -mt-8 py-8 -mx-8 px-8`;
const NavLink = tw(NavLinkBase)`lg:text-gray-100 lg:hocus:text-gray-300 lg:hocus:border-gray-100`;
const LogoLink = tw(LogoLinkBase)`text-gray-100 hocus:text-gray-300`;
const PrimaryLink = tw(PrimaryLinkBase)`shadow-raised lg:bg-teal-500 lg:hocus:bg-primary-500`;

const Column = tw.div`lg:w-1/2`;
const TextColumn = tw.div`text-center lg:text-left`;
const IllustrationColumn = tw(Column)`mt-16 lg:mt-0 lg:ml-16`;
//const Description = tw(SectionDescription)`mt-4 max-w-2xl text-gray-100 lg:text-base mx-auto lg:mx-0`;
//const PrimaryButton = tw(PrimaryButtonBase)`mt-8 text-sm sm:text-base px-6 py-5 sm:px-10 sm:py-5 bg-teal-500 inline-block hocus:bg-primary-500`;
const Image = tw.img`w-144 ml-auto`

class Profile extends React.Component {
    static contextType = UsersContext;

    render () {
    
        const Subheading = tw.span`tracking-wider text-sm font-medium`;
        const HighlightedText = tw.span`bg-teal-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
        const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
        const Description = tw.span`inline-block mt-8`;
        const imageCss = tw`rounded-4xl`;

        if(this.context.user.usertype == "buyer"){
            return(
                <AnimationRevealPage>
                    <NavBar/>
                    <Container>
                        
                        <ContentWithPaddingLg>
                            <Row>
                            <TextColumn>
                                <Heading>{this.context.user.firstname} {this.context.user.lastname}'s Profile</Heading>
                                <Description>Email: {this.context.user.email}</Description>
                            </TextColumn>
                            </Row>
                            
                            <Row>
                            <TextColumn>
                                <Description>UserType: {this.context.user.usertype}</Description>
                            </TextColumn>
                            </Row>
                            <Row>
                            <TextColumn>
                                <Description>Address: </Description>
                            </TextColumn>
                            </Row>
                            <Row>
                            <TextColumn>
                                <Description>Firstline: {this.context.user.firstline} </Description>
                            </TextColumn>
                            </Row>
                            <Row>
                            <TextColumn>
                                <Description>Secondline: {this.context.user.secondline} </Description>
                            </TextColumn>
                            </Row>
                            <Row>
                            <TextColumn>
                                <Description>Zipcode: {this.context.user.zipcode} </Description>
                            </TextColumn>
                            </Row>
                            <Row>
                            <TextColumn>
                                <Description>City: {this.context.user.city} </Description>
                            </TextColumn>
                            </Row>
                            <Row>
                            <TextColumn>
                                <Description>State: {this.context.user.state} </Description>
                            </TextColumn>
                            </Row>
                            <Row>
                            <TextColumn>
                                <Description>Country: {this.context.user.country} </Description>
                            </TextColumn>
                            </Row>
                        </ContentWithPaddingLg>
                    </Container>
                    {/* <Container>
                        <ContentWithPaddingLg>
                            <Heading>Profile</Heading>
                            <Row>Hi</Row>
                        </ContentWithPaddingLg> 
                    </Container> */}
                    {/* <Hero 
                        heading={<><HighlightedText>{this.context.user.firstname}</HighlightedText></>}
                        description="Styloop is the best option to buy clothes online!"
                        imageSrc="https://assets.weforum.org/article/image/YlqprZMVrDcJUXbdjc5rAP6uqoO_YT1xZNby3HjH_KM.jpg"
                        imageCss={imageCss}
                        imageDecoratorBlob={true}
                        primaryButtonText="Shop Now"
                        primaryButtonUrl="http://localhost:3000/shop"
                        watchVideoButtonText="Meet The Chefs"
                    /> */}
                </AnimationRevealPage>
            )
        } else {            
            return(
                <AnimationRevealPage>
                    <NavBar/>
                    <Container>
                        
                        <ContentWithPaddingLg>
                            <Row>
                            <TextColumn>
                                <Heading>{this.context.user.firstname} {this.context.user.lastname}'s Profile</Heading>
                                <Description>Email: {this.context.user.email}</Description>
                            </TextColumn>
                            </Row>
                            
                            <Row>
                            <TextColumn>
                                <Description>UserType: {this.context.user.usertype}</Description>
                            </TextColumn>
                            </Row>
                            <Row>
                            <TextColumn>
                                <Description>Store: {this.context.user.store} </Description>
                            </TextColumn>
                            </Row>
                        </ContentWithPaddingLg>
                    </Container>
                    {/* <Container>
                        <ContentWithPaddingLg>
                            <Heading>Profile</Heading>
                            <Row>Hi</Row>
                        </ContentWithPaddingLg> 
                    </Container> */}
                    {/* <Hero 
                        heading={<><HighlightedText>{this.context.user.firstname}</HighlightedText></>}
                        description="Styloop is the best option to buy clothes online!"
                        imageSrc="https://assets.weforum.org/article/image/YlqprZMVrDcJUXbdjc5rAP6uqoO_YT1xZNby3HjH_KM.jpg"
                        imageCss={imageCss}
                        imageDecoratorBlob={true}
                        primaryButtonText="Shop Now"
                        primaryButtonUrl="http://localhost:3000/shop"
                        watchVideoButtonText="Meet The Chefs"
                    /> */}
                </AnimationRevealPage>
            ) 
        }
        
    }
}

export default Profile