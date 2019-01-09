import React from 'react';
import {FormattedMessage} from 'react-intl';

const Search = ({search, onChangeSearch}) => {

    return (
        <div className={`search`}>
            <FormattedMessage id='search' defaultMessage='Búsqueda'/>
            <input
                type="text"
                value={search}
                onChange={e => {
                const {value} = e.target;
                onChangeSearch(value);
            }}/>
        </div>
    );
};

export default Search;