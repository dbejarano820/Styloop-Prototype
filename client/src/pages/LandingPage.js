import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithPrimaryBackground";
import NavBar from "components/hero/NavBar";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";


export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-teal-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage>
      <NavBar/>
      <Hero
        heading={<><HighlightedText>Fashionable & Affordable Clothing.</HighlightedText></>}
        description="Styloop is the best option to buy clothes online!"
        imageSrc="https://assets.weforum.org/article/image/YlqprZMVrDcJUXbdjc5rAP6uqoO_YT1xZNby3HjH_KM.jpg"
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Shop Now"
        primaryButtonUrl="http://localhost:3000/shop"
        watchVideoButtonText="Meet The Chefs"
      />
      <MainFeature
        subheading={<Subheading>Established Since 2015</Subheading>}
        heading={
          <>
            We've been serving for
            <wbr /> <HighlightedText>over 5 years.</HighlightedText>
          </>
        }
        description={
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
            <br />
            <br />
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Description>
        }
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="Shop Now"
        primaryButtonUrl="http://localhost:3000/shop"
        imageSrc={
          "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/09/30/Pictures/_b5b4ffd0-0320-11eb-a0ae-05799bfe6215.jpg"
        }
        imageCss={imageCss}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
      />
      <MainFeature2
        subheading={<Subheading>A Reputed Brand</Subheading>}
        heading={<>Why <HighlightedText>Shop On Styloop?</HighlightedText></>}
        statistics={[
          {
            key: "Orders",
            value: "94000+",
          },
          {
            key: "Customers",
            value: "11000+"
          },
          {
            key: "Vendors",
            value: "500+"
          }
        ]}
        primaryButtonText="Buy Now!"
        primaryButtonUrl="#"
        imageInsideDiv={false}
        imageSrc="https://assets.weforum.org/article/image/YlqprZMVrDcJUXbdjc5rAP6uqoO_YT1xZNby3HjH_KM.jpg"
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />
      <Testimonial
        subheading=""
        heading={<>Customers <HighlightedText>Love Us.</HighlightedText></>}
      />
      <Footer />
    </AnimationRevealPage>
  );
}
