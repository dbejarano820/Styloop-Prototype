import React from 'react';
import NavBar from 'components/hero/NavBar';
import { UsersContext } from "../contexts/Users";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { Container as ContainerBase, ContentWithVerticalPadding, ContentWithPaddingLg } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";

const Container = tw(ContainerBase)`min-h-screen bg-teal-900 text-white font-medium flex justify-center -m-8`;
const Heading = tw(SectionHeading)`max-w-3xl lg:max-w-4xl lg:text-left leading-tight`;
const Row = tw.div`flex items-center flex-col lg:flex-row`;
const TextColumn = tw.div`text-center lg:text-left`;

class Profile extends React.Component {
    static contextType = UsersContext;

    state = {
        purchases : [],
        ejemplo : "adasfasd\nfdgsdfg"
    }

    render () {
        const Subheading = tw.span`tracking-wider text-sm font-medium`;
        const Description = tw.span`inline-block mt-8`;
        /*
        for (var i = 0; i < this.context.user.purchases.length; i++) {
            this.state.purchases.push({})
        }*/
        

        if(this.context.user.usertype == "buyer"){
            return(
                <AnimationRevealPage>
                <NavBar/>
                <Container>
                <ContentWithPaddingLg>
                    <TextColumn>
                        <Heading>{this.context.user.firstname} {this.context.user.lastname}'s Profile</Heading>
                    </TextColumn>
                    <div style={{ width: 600, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 120 }}>
                    <div>
                        <Description><b>Email:</b> {this.context.user.email}</Description>
                        <br></br>
                        <Description><b>UserType:</b> {this.context.user.usertype}</Description>
                        <br></br>
                        <Description><b>Address:</b> </Description>
                        <br></br>
                        <Subheading><i>Firstline:</i> {this.context.user.firstline} </Subheading>
                        <br></br>
                        <Subheading><i>Secondline:</i> {this.context.user.secondline} </Subheading>
                        <br></br>
                        <Subheading><i>Zipcode:</i> {this.context.user.zipcode} </Subheading>
                        <br></br>
                        <Subheading><i>City:</i> {this.context.user.city} </Subheading>
                        <br></br>
                        <Subheading><i>State:</i> {this.context.user.state} </Subheading>
                        <br></br>
                        <Subheading><i>Country:</i> {this.context.user.country} </Subheading>
                    </div>
                    <div>
                        <Description><b>Purchases:</b></Description>
                        <br></br>
                        <Description>{this.state.ejemplo}</Description>
                    </div>
                    </div>
                </ContentWithPaddingLg>
                </Container>
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
                </AnimationRevealPage>
            ) 
        }
        
    }
}

export default Profile