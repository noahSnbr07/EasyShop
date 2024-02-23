import React from 'react';
import '../../styles/aside.css';
import { useSearchParams } from 'react-router-dom';
import Icon from '../../utils/components/Icon';
export default function Aside() {
    const [searchFilters, setSearchFilters] = useSearchParams({
        bestseller: false,
        latest: false,
        trending: false,
        books: false,
        tech: false,
        sale: false,
        sport: false,
        clothing: false,
        music: false,
        movies: false,
        essentials: false,
        outdoor: false,
    });

    const toggleSearchParam = (paramName) => {
        setSearchFilters(prevParams => {
            const currentParamValue = prevParams.get(paramName) === 'true';
            const updatedParamValue = !currentParamValue;
            prevParams.set(paramName, updatedParamValue.toString());
            return prevParams;
        });
    };

    const Filter = ({ title, isActive }) => {
        return (
            <div
                onClick={() => toggleSearchParam(title.toLowerCase())}
                className={`aside-filter ${isActive ? 'aside-filter-active' : ''}`}>
                <h3>{title}</h3> {isActive && <Icon icon={'check'} />}
            </div>
        );
    };

    return (
        <aside className='aside'>
            <center>
                <h1> Filters </h1>
            </center>
            <Filter title={'Bestseller'} isActive={searchFilters.get('bestseller') === 'true'} />
            <Filter title={'Latest'} isActive={searchFilters.get('latest') === 'true'} />
            <Filter title={'Trending'} isActive={searchFilters.get('trending') === 'true'} />
            <Filter title={'Books'} isActive={searchFilters.get('books') === 'true'} />
            <Filter title={'Tech'} isActive={searchFilters.get('tech') === 'true'} />
            <Filter title={'Sale'} isActive={searchFilters.get('sale') === 'true'} />
            <Filter title={'Sport'} isActive={searchFilters.get('sport') === 'true'} />
            <Filter title={'Clothing'} isActive={searchFilters.get('clothing') === 'true'} />
            <Filter title={'Music'} isActive={searchFilters.get('music') === 'true'} />
            <Filter title={'Movies'} isActive={searchFilters.get('movies') === 'true'} />
            <Filter title={'Essentials'} isActive={searchFilters.get('essentials') === 'true'} />
            <Filter title={'Outdoor'} isActive={searchFilters.get('outdoor') === 'true'} />
        </aside>
    );
}