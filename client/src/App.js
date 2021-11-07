import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React, {Component} from "react";

/*
 * This is the entry point component of this project. You can change the below exported default App component to any of
 * the prebuilt landing page components by uncommenting their import and export lines respectively.
 * See one of the landing page components to better understand how to import and render different components (Always
 * make sure if you are building your own page, the root component should be the AnimationRevealPage component. You can
 * disable the animation by using the disabled prop.
 *
 * The App component below is using React router to render the landing page that you see on the live demo website
 * and the component previews.
 *
 */

/* Use AnimationRevealPage as a wrapper component for your pages if you are building a custom one yourself */
// import AnimationRevealPage from "helpers/AnimationRevealPage.js";

/*
 * Hero section is the top most section on the page. It contains the header as well.
 * So you dont need to import headers
 * separately
 */

/* Inner Pages */
 import LoginPage from "pages/Login-Client.js";
 import SignupPage from "pages/Signup-Client.js";
 import LoginPageVendor from "pages/Login-Vendor.js";
 import SignupPageVendor from "pages/Signup-Vendor.js";
 import LandingPage from "pages/LandingPage";
 import ProfilePage from "pages/Profile";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainShop from "pages/MainShop";
import SellerStore from "pages/MyStore";
import AddProduct from "pages/AddProduct";
import ItemPage from "pages/Item";
import ItemInfoPage from "pages/ItemInfo";

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
        <Route exact path="/shop/:store/:item/info" component={ItemInfoPage} />
        <Route exact path="/shop" component={MainShop} />  
        <Route exact path="/profile" component={ProfilePage} /> 
        <Route exact path="/seller/mystore/:store" component={SellerStore} /> 
        <Route exact path="/seller/addproduct/:store" component={AddProduct} /> 
        <Route exact path= "*" component={LandingPage}/>
      </Switch>
    );
  }
}

export default App;