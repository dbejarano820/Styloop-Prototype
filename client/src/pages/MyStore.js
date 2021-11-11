import React, {  } from "react";
import NavBar from 'components/hero/NavBar';
import { UsersContext } from "../contexts/Users";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { Container as ContainerBase, ContentWithPaddingLg } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import TabGrid from "components/cards/SimpleTabCard.js";


const Container = tw(ContainerBase)`h-56 bg-teal-900 text-white font-medium flex justify-center -m-8`;
const Heading = tw(SectionHeading)`max-w-3xl lg:max-w-4xl lg:text-center leading-tight`;
const Row = tw.div`flex items-center flex-col lg:flex-row`;
const TextColumn = tw.div`text-center lg:text-left`;

class MyStore extends React.Component {
    static contextType = UsersContext;
    
    state = {
        itemsURL : "http://localhost:5000/api/item/info?store="+this.props.match.params,
        items : [],
        isFetching : true
    }

    async componentDidMount() {
        //console.log('fetch '+this.state.itemsURL)
        const {store} = this.props.match.params
        //console.log(store)
        try{
            if(this.context.isLoading){
                console.log("cargando")
            }
            const res = await fetch("http://localhost:5000/api/item/info?store="+store, {
                credentials: 'include',
                method: 'GET'
            });
            const data = await res.json();
            let itemsinfo = [];
            const asd = data.map((article)=>{
                itemsinfo.push({
                    imageSrc:article.pictures[0], title:article.name, content:article.store, 
                    price:article.price, url:"/shop/"+article.store+"/"+article.name+"/info"})
            });
            this.setState({items : itemsinfo, isFetching : false});

            console.log('trajo los datos')
            console.log(data);
        }
        catch{
            console.log("error trayendo los items")
        }
    }
   
    render () {
        const HighlightedText = tw.span`bg-teal-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
        const Description = tw.span`inline-block mt-2 text-center`;
        const imageCss = tw`rounded-4xl`;
        //console.log("render");
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

                {/*ARTICULOS DE LA TIENDA*/}
                  
                <TabGrid
                    heading={
                    <>
                        <HighlightedText>Catalogue</HighlightedText>
                    </>
                    }
                    tabs={
                        [this.state.items]
                    }//-------------------------------------------------------------
                />
                <Footer />
            </AnimationRevealPage>
        ) 
    }
        
}

export default MyStore