import React, { Component } from 'react';
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
    learnTitle: {
        id: 'learnTitle',
        defaultMessage: 'Aprender react-intl'
    }
});

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
                        {...messages.learnTitle}
                    />
                </h1>
                <h2>i18n / ReactIntl</h2>
            </div>
        );
    }
}

export default injectIntl(PageTitle);