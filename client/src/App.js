import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "pages/Login-Client.js";
import SignupPage from "pages/Signup-Client.js";
import LoginPageVendor from "pages/Login-Vendor.js";
import SignupPageVendor from "pages/Signup-Vendor.js";
import LandingPage from "pages/LandingPage";
import ProfilePage from "pages/Profile";
import MainShop from "pages/MainShop";
import SellerStore from "pages/MyStore";
import AddProduct from "pages/AddProduct";
import ItemPage from "pages/Item";
import ItemInfoPage from "pages/ItemInfo";
import BuyPage from "pages/Buy";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path= "/" component={LandingPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/login-seller" component={LoginPageVendor} />
        <Route exact path="/sign-up" component={SignupPage} />
        <Route exact path="/sign-up-seller" component={SignupPageVendor} />
        <Route exact path="/shop/:store/:item" component={ItemPage} />
        <Route exact path="/shop/buy/:store/:item" component={BuyPage} />
        <Route exact path="/shop/:store/:item/info" component={ItemInfoPage} />
        <Route exact path="/shop" component={MainShop} />  
        <Route exact path="/profile/:email" component={ProfilePage} /> 
        <Route exact path="/seller/mystore/:store" component={SellerStore} /> 
        <Route exact path="/seller/addproduct/:store" component={AddProduct} /> 
        <Route exact path= "*" component={LandingPage}/>
      </Switch>
    );
  }
}

export default App;