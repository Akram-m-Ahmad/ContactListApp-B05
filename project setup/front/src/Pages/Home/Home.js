import React, { Component } from 'react';
import './Home.css';
import Slider from '../../Components/Slider/Slider'
import CurrentEvents from '../../Components/CurrentEvents/CurrentEvents'
export default class Home extends Component{
    render()
    {
        return(
            <div>
                Home
                <Slider/>
                <CurrentEvents/>
            </div>
        )
    }
}