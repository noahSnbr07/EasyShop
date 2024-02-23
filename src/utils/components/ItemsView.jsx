import React, { useEffect, useState } from 'react';
import '../../styles/itemsview.css';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Item from './Item';

export default function ItemsView() {
    const [filteredStock, setFilteredStock] = useState([]);
    const [stock] = useState(JSON.parse(localStorage.getItem('products')) || []);
    const [searchFilters] = useSearchParams([]);
    const [searchQuery] = useSearchParams({ q: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    useEffect(() => {
        setSearchTerm(searchQuery.get('query'));
    }, [location]);

    useEffect(() => {
        filterStock();
    }, [searchFilters, searchTerm]);

    const filterStock = () => {
        const filterParams = Object.fromEntries(searchFilters.entries());
        const filteredItems = stock.filter(item => {
            if (searchTerm !== null && item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return Object.entries(item.categories).every(([key, value]) => {
                    if ((filterParams[key] === "true") && (value !== true)) {
                        return false;
                    } else {
                        return true;
                    }
                });
            }
            if (searchQuery === '' || ' ') { return true }
            return false;
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
