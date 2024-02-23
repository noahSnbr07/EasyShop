import React, { useState } from 'react'
import '../../styles/itemsview.css';
import { useSearchParams } from 'react-router-dom';
import Stock from '../../assets/libs/Stock.json';
export default function ItemsView() {
    const [searchFilters] = useSearchParams([]);

    for (const entry of searchFilters.entries()) {
        console.log(entry[0]);
    }

    return (
        <div className='items-view'>

        </div>
    );
}
