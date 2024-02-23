import React, { useEffect, useState } from 'react';
import '../../styles/itemsview.css';
import { Link, useSearchParams } from 'react-router-dom';
import Stock from '../../assets/libs/Stock.json';
import Item from './Item';

export default function ItemsView() {
    const [searchFilters] = useSearchParams([]);
    const [filteredStock, setFilteredStock] = useState([]);

    useEffect(() => { filterStock(); }, [searchFilters]);

    const filterStock = () => {
        const filterParams = Object.fromEntries(searchFilters.entries());
        const filteredItems = Stock.filter(item => {
            return Object.entries(item.categories).every(([key, value]) => {
                if (filterParams[key] === "true" && value !== true) {
                    return false;
                }
                else { return true; }
            });
        });
        setFilteredStock(filteredItems);
    };

    return (
        <div className='items-view'>
            {filteredStock.map((item, index) => (
                <Link key={index} to={`/preview/${item.id}`}> <Item item={item} /> </Link>
            ))}
        </div>
    );
}