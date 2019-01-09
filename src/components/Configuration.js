import React from 'react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
    es: {
        id: 'es',
        defaultMessage: 'Español',
    },
    en: {
        id: 'en',
        defaultMessage: 'Ingles',
    }
});

const Configuration = ({lang, onChangeLang, intl}) => {
    return (
        <div className="configuration">
            <div>
                <span>
                    <FormattedMessage 
                    id='language'
                    defaultMessage='Lenguaje: '
                    />
                </span>
                <select onChange={onChangeLang}>
                    <option value="es">{intl.formatMessage(messages.es)}</option>
                    <option value="en">{intl.formatMessage(messages.en)}</option>
                </select>
                <span> </span>
                { 
                    <FormattedMessage 
                        id='selectedLanguage' 
                        defaultMessage='Se ha seleccionado {language} como lenguaje de la aplicación'
                        values={{ 
                                language: lang === 'es' ? (
                                    <FormattedMessage {...messages.es} />   
                                ) : (
                                    <FormattedMessage {...messages.en} />
                                )
                            }}
                    />
                }
            </div>
        </div>
    );
};

export default injectIntl(Configuration);