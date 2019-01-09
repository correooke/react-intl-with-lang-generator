import React from 'react';
import {
    FormattedMessage,
    FormattedNumber,
    FormattedDate,
    FormattedRelative,
    FormattedTime,
} from 'react-intl';
import Search from './components/Search';
import List from './components/List';
import Configuration from './components/Configuration';
import PageTitle from './components/PageTitle';

const Home = ({start, search, items, lang, onChangeLang, onChangeSearch}) => {
    return (
        <div className={`app`}>
            <div className="timer">
                <FormattedDate value={Date.now()}/>
                <FormattedTime value={Date.now()}/>
            </div>
            <div className="timer start">
                <FormattedRelative value={start} updateInterval={1000}/>
            </div>
            <PageTitle />
            <Configuration lang={lang} onChangeLang={onChangeLang}/>
            <Search search={search} onChangeSearch={onChangeSearch}/>
            <div className="results">
                <FormattedMessage id='results' defaultMessage='Resultados de la búsqueda'>
                    {text => <h2>{text}</h2>}
                </FormattedMessage>
                <h4>
                    <FormattedNumber value={items.length}/>
                    <span> </span>
                    <FormattedMessage
                        id="foundTecnologies"
                        defaultMessage={`- {count, plural, 
                            =0 {Ninguna tecnología}
                            one {Una tecnología} 
                            other {Son {count} tecnologías}
                        }`}
                        values={{count: items.length}} 
                    />
                </h4>
            </div>
            <List items={items}/>
        </div>
    );
};

export default Home;