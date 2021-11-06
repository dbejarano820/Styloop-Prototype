import React from 'react';
import NavBar from 'components/hero/NavBar';
import { UsersContext } from "../contexts/Users";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { Container as ContainerBase, ContentWithVerticalPadding, ContentWithPaddingLg } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import TabGrid from "components/cards/SimpleTabCard.js";

const Container = tw(ContainerBase)`h-56 bg-teal-900 text-white font-medium flex justify-center -m-8`;
const Heading = tw(SectionHeading)`max-w-3xl lg:max-w-4xl lg:text-center leading-tight`;
const Row = tw.div`flex items-center flex-col lg:flex-row`;
const TextColumn = tw.div`text-center lg:text-left`;

class MyStore extends React.Component {
    static contextType = UsersContext;
    render () {
      const HighlightedText = tw.span`bg-teal-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
      const Description = tw.span`inline-block mt-2 text-center`;
      const imageCss = tw`rounded-4xl`;
      return(
          <AnimationRevealPage>
            <NavBar/>
              <Container>
                <ContentWithPaddingLg>
                  <Row>
                    <TextColumn>
                      <Heading>This is {this.context.user.store}</Heading>
                    </TextColumn>
                  </Row>
                  
                  <Row>
                    <TextColumn>
                      <Description>Welcome, {this.context.user.firstname} {this.context.user.lastname} </Description>
                    </TextColumn>
                  </Row>
                </ContentWithPaddingLg>
              </Container>
              <TabGrid
                heading={
                  <>
                    <HighlightedText>Catalogue</HighlightedText>
                  </>
                }
              />
              <Footer />
          </AnimationRevealPage>
      ) 
  }
        
}

export default MyStore