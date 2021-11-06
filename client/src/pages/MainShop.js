import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImage";
import Features from "components/features/ThreeColSimple.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/TabCardGrid.js";
import NavBar from "components/hero/NavBar";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
import DownloadApp from "components/cta/DownloadApp.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { prependOnceListener } from "process";
import { UsersContext } from "../contexts/Users";


// class MainShop extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         articles : {}
//       };
//     }
//     static contextType = UsersContext;
//     // const [articles, setArticles] = useState([]);
//     Subheading = tw.span`tracking-wider text-sm font-medium`;
//      HighlightedText = tw.span`bg-teal-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
//      HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
//      Description = tw.span`inline-block mt-8`;
//      imageCss = tw`rounded-4xl`;
//      all = []
//      cards = [
//       {
//         imageSrc:
//           "https://cdn.childrensalon.com/media/catalog/product/cache/0/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/g/u/gucci-green-wool-logo-sweater-355716-fad697ba7c763abe3becba61a0adf6af77cdb03e.jpg",
//         title: "Gucci Sweater",
//         content: "Chicken Main Course",
//         price: "$5.99",
//         rating: "5.0",
//         reviews: "87",
//         url: "https://github.com/geraldzm/crypto_swap/blob/develop/front/web/src/pages/LoginPage/LoginPage.js"
//       }]
//       componentDidMount = async () => {
//         // const fetchArticles = async () => {
//           const res = await fetch('http://localhost:5000/api/item/list');
//           const articlesData = await res.json();
//           this.setState({articles: articlesData});
//           this.state.articles.map((article)=>{
//             this.all.push({imageSrc:article.pictures[0], title:article.name, content:article.store, price:article.price, url:"/shop/"+article.store+"/"+article.name});
          
//         // };
//         // fetchArticles();
//         })
//       }
//     //   useEffect( () => {
//     //   const fetchArticles = async () => {
//     //     const res = await fetch('http://localhost:5000/api/item/list');
//     //     const articlesData = await res.json();
//     //     setArticles(articlesData)
//     //   };
//     //   fetchArticles();
//     // }, []);

//     //   useArticles = this.state.articles.map((article)=>{
//     //   this.all.push({imageSrc:article.pictures[0], title:article.name, content:article.store, price:article.price, url:"/shop/"+article.store+"/"+article.name})
//     // });

//     render() {

//       return (
//       <AnimationRevealPage>
//          <NavBar/>
//          {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
//          <TabGrid
//           heading={
//             <>
//               Checkout our <this.HighlightedText>catalogue.</this.HighlightedText>
//             </>
//           }
//           tabs={
//                [this.all]
//           }
          
//         />
//         <div>{this.state.articles && this.useArticles} </div>
//         <Footer />
//       </AnimationRevealPage>
    
//     )
//     }
// }

// export default MainShop

export default () => {
    const [articles, setArticles] = useState([])
    const Subheading = tw.span`tracking-wider text-sm font-medium`;
    const HighlightedText = tw.span`bg-teal-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
    const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
    const Description = tw.span`inline-block mt-8`;
    const imageCss = tw`rounded-4xl`;
    const all = []
    const cards = [
      {
        imageSrc:
          "https://cdn.childrensalon.com/media/catalog/product/cache/0/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/g/u/gucci-green-wool-logo-sweater-355716-fad697ba7c763abe3becba61a0adf6af77cdb03e.jpg",
        title: "Gucci Sweater",
        content: "Chicken Main Course",
        price: "$5.99",
        rating: "5.0",
        reviews: "87",
        url: "https://github.com/geraldzm/crypto_swap/blob/develop/front/web/src/pages/LoginPage/LoginPage.js"
      }]
      
    useEffect( () => {
      const fetchArticles = async () => {
        const res = await fetch('http://localhost:5000/api/item/list');
        const articlesData = await res.json();
        setArticles(articlesData)
      };
      fetchArticles();
    }, []);

    const useArticles = articles.map((article)=>{
      all.push({imageSrc:article.pictures[0], title:article.name, content:article.store, price:article.price, url:"/shop/"+article.store+"/"+article.name})
    })

    return (
      <AnimationRevealPage>
        <NavBar/>
        {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
        <TabGrid
          heading={
            <>
              Checkout our <HighlightedText>catalogue.</HighlightedText>
            </>
          }
          tabs={
               [all]
          }
          
        />
        <div>{articles && useArticles} </div>
        <Footer />
      </AnimationRevealPage>
    );
  }