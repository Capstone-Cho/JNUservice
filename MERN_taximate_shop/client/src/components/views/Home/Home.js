/* global kakao */
import React, {useEffect} from 'react'
import './Home.css'

import Taxi from './taxi.png'
import Cart from './shopping-cart.png'
import Tree from './tree.png'
import Mountain from './mountains.png'
import Contrast from './contrast.png'

const Home = () => {
    return (
        <div className="HomeBody">
            <div className="scene">
                <span className="text">Taxi Mate & Used Deal</span>
                <img src={Taxi} className="fa-car-side" />
                <img src={Cart} class="fa-shopping-cart" />

                <i className="fas fa-cloud" style={{'--i': '1'}}></i>
                <i className="fas fa-cloud" style={{'--i': '2'}}></i>
                <i className="fas fa-cloud" style={{'--i': '3'}}></i>
                <i className="fas fa-cloud" style={{'--i': '4'}}></i>
                <i className="fas fa-cloud" style={{'--i': '5'}}></i>

                <img src={Tree} className="fas fa-tree" style={{'--i': '1'}} />
                <img src={Tree} className="fas fa-tree" style={{'--i': '2'}} />
                <img src={Tree} className="fas fa-tree" style={{'--i': '3'}} />
                <img src={Tree} className="fas fa-tree" style={{'--i': '4'}} />
                <img src={Tree} className="fas fa-tree" style={{'--i': '5'}} />
                <img src={Tree} className="fas fa-tree" style={{'--i': '6'}} />
                <img src={Tree} className="fas fa-tree" style={{'--i': '7'}} />

                <img src={Mountain} className="fas fa-mountain" style={{'--i': '1'}} />
                <img src={Mountain} className="fas fa-mountain" style={{'--i': '2'}} />
                <img src={Mountain} className="fas fa-mountain" style={{'--i': '3'}} />
                <img src={Mountain} className="fas fa-mountain" style={{'--i': '4'}} />
                <img src={Mountain} className="fas fa-mountain" style={{'--i': '5'}} />

                <img src={Contrast} className="sun" />
                <div className="road"></div>
            </div>
            <div></div>
        </div>
    )
}

export default Home
