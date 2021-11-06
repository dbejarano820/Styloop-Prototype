
import React, {Component, useState} from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import HeaderBase, {
  LogoLink as LogoLinkBase,
  NavLinks,
  NavLink as NavLinkBase,
  PrimaryLink as PrimaryLinkBase
} from "../headers/light.js";
import { Container as ContainerBase, ContentWithVerticalPadding, Content2Xl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import logoImageSrc from "images/STYLOOP-02.png";
import serverIllustrationImageSrc from "images/server-illustration-2.svg";
import { UsersContext } from "../../contexts/Users";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
const PrimaryBackgroundContainer = tw.div`-mx-8 px-8 bg-teal-900 text-gray-100`;
const Header = tw(HeaderBase)`max-w-none -mt-8 py-8 -mx-8 px-8`;
const NavLink = tw(NavLinkBase)`lg:text-gray-100 lg:hocus:text-gray-300 lg:hocus:border-gray-100`;
const LogoLink = tw(LogoLinkBase)`text-gray-100 hocus:text-gray-300`;
const PrimaryLink = tw(PrimaryLinkBase)`shadow-raised lg:bg-teal-500 lg:hocus:bg-primary-500`;

const Container = tw(ContainerBase)``;
const Row = tw.div`flex items-center flex-col lg:flex-row`;
const Column = tw.div`lg:w-1/2`;
const TextColumn = tw.div`text-center lg:text-left`;
const IllustrationColumn = tw(Column)`mt-16 lg:mt-0 lg:ml-16`;
const Heading = tw(SectionHeading)`max-w-3xl lg:max-w-4xl lg:text-left leading-tight`;
const Description = tw(SectionDescription)`mt-4 max-w-2xl text-gray-100 lg:text-base mx-auto lg:mx-0`;
const PrimaryButton = tw(PrimaryButtonBase)`mt-8 text-sm sm:text-base px-6 py-5 sm:px-10 sm:py-5 bg-teal-500 inline-block hocus:bg-primary-500`;
const Image = tw.img`w-144 ml-auto`

class NavBar extends Component {
    static contextType = UsersContext;
    heading = "High Performant Servers tailored to your needs";
    description = "Our cloud provisions the best servers, with fast SSD, powerful Xeon Processors, whenever you need it. Oh, and we have 99.9% SLA";
    primaryButtonText = "Start Your 15 Day Free Trial";
    primaryButtonUrl = "#";
    imageSrc = serverIllustrationImageSrc;
  
    render() {
      let navLinks
      if (this.context.isLoggedIn) {
        if(this.context.user.usertype == "seller"){
            navLinks = [
                <NavLinks key={1}>
                <NavLink href="/seller/mystore">My Store</NavLink>
                    <NavLink href="/seller/addproduct">Add Product</NavLink>
                    <NavLink href="#">Dashboard</NavLink>
                    <NavLink href="/profile" >Profile</NavLink>
                    <PrimaryLink onClick={this.context.logUserOut}>Logout</PrimaryLink>
                </NavLinks>
                ];
        } else {
            navLinks = [
            <NavLinks key={1}>
            <NavLink href="/shop">Shop</NavLink>
                <NavLink href="#">About Us</NavLink>
                <NavLink href="/profile" >Profile</NavLink>
                <PrimaryLink onClick={this.context.logUserOut}>Logout</PrimaryLink>
            </NavLinks>
            ];
         }
      } else {
         navLinks = [
          <NavLinks key={1}>
           <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/login-seller">Sell Clothes</NavLink>
            <NavLink href="#">About Us</NavLink>
            <NavLink href="/login">Login</NavLink>
            <PrimaryLink href="sign-up">Signup</PrimaryLink> 
          </NavLinks>
        ];
      }
  
      const logoLink = (
        <LogoLink href="/">
          <img src={logoImageSrc} alt="Logo" />
          Styloop
        </LogoLink>
      );
  
  
      return (
        <PrimaryBackgroundContainer>
        <Content2Xl>
        <Header logoLink={logoLink} links={navLinks} />
        </Content2Xl>
      </PrimaryBackgroundContainer>
        );
      }
    }

export default NavBar