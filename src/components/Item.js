import React from 'react';
import {FormattedMessage} from 'react-intl';

const Item = ({image, title, details}) => {
    return (
        <div className={`item`}>
            <img src={image} alt=""/>
            <div className="text">
                <h3>{title}</h3>
                <p>
                    <strong>
                        <FormattedMessage 
                            id='details'
                            defaultMessage='Detalles: '
                        />
                    </strong>
                    {details}</p>
            </div>
        </div>
    );
};

export default Item;