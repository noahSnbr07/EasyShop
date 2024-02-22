import React from 'react'
import '../styles/landing.css';
import Icon from '../utils/components/Icon';
import Aside from '../utils/components/Aside';
import ItemsView from '../utils/components/ItemsView';
export default function Landing() {
    return (
        <div className='landing-page'>
            <Aside />
            <ItemsView />
        </div>
    );
}