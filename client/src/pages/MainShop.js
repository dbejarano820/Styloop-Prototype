import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import TabGrid from "components/cards/TabCardGrid.js";
import NavBar from "components/hero/NavBar";
import Footer from "components/footers/FiveColumnWithInputForm.js";

export default () => {
    const [articles, setArticles] = useState([])
    const HighlightedText = tw.span`bg-teal-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
    const all = []
        
    useEffect( () => {
        const fetchArticles = async () => {
            const res = await fetch('http://localhost:5000/api/item/list');
            const articlesData = await res.json();
            console.log(articlesData);
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