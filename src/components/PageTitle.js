import React, { Component } from 'react';
import messages from './../languages/messages';
import { injectIntl, FormattedMessage } from 'react-intl';

class PageTitle extends Component {

    updateLanguage = () => {
        document.title = this
            .props
            .intl
            .formatMessage(messages.learnTitle);            
    }

    componentDidMount() {
        this.updateLanguage();
    }

    componentDidUpdate(prevProps, prevState) {
        this.updateLanguage();    
    }

    render() {
        return (
            <div className="header">
                <h1>
                    <FormattedMessage 
                        id='learnTitle' 
                        defaultMessage='Aprender react-intl' 
                    />
                </h1>
                <h2>i18n / ReactIntl</h2>
            </div>
        );
    }
}

export default injectIntl(PageTitle);