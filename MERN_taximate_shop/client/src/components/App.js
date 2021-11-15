import React, {Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import Auth from '../hoc/auth'
// pages for this product
import ShopLandingPage from './views/LandingPage/LandingPage.js'
import LoginPage from './views/LoginPage/LoginPage.js'
import RegisterPage from './views/RegisterPage/RegisterPage.js'
import NavBar from './views/NavBar/NavBar'
import Footer from './views/Footer/Footer'
import UploadProductPage from './views/UploadProductPage/UploadProductPage.js'
import DetailProductPage from './views/DetailProductPage/DetailProductPage'
import CartPage from './views/CartPage/CartPage'
import HistoryPage from './views/HistoryPage/HistoryPage'
import Home from './views/Home/Home'

import taxiLandingPage from './views/TaxiLandingPage/LandingPage'
import UploadVideoPage from './views/UploadVideoPage/UploadVideoPage'
import DetailVideoPage from './views/DetailVideoPage/DetailVideoPage'
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage'

import '../static/fonts/font.css'

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
    return (
        <div style={{fontFamily: 'Jua'}}>
            <Suspense fallback={<div>Loading...</div>}>
                <NavBar />
                <div style={{paddingTop: '69px', minHeight: 'calc(100vh - 80px)'}}>
                    <Switch>
                        <Route exact path="/" component={Auth(Home, null)} />
                        <Route exact path="/shop" component={Auth(ShopLandingPage, null)} />
                        <Route exact path="/login" component={Auth(LoginPage, false)} />
                        <Route exact path="/register" component={Auth(RegisterPage, false)} />
                        <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
                        <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
                        <Route exact path="/user/cart" component={Auth(CartPage, true)} />
                        <Route exact path="/history" component={Auth(HistoryPage, true)} />

                        <Route exact path="/taxi" component={Auth(taxiLandingPage, null)} />
                        <Route exact path="/video/upload" component={Auth(UploadVideoPage, true)} />
                        <Route exact path="/video/:videoId" component={Auth(DetailVideoPage, null)} />
                        <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
                    </Switch>
                </div>
                <Footer />
            </Suspense>
        </div>
    )
}

export default App
