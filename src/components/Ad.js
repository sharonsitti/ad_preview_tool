import React, { Component } from 'react';

const Ad = ({caption}) => {

    const styles = {
        border: 'solid 1px',
        borderRadius: '5px',
        padding: '20px',
        textAlign: 'center'
    };

    return (
        <aside className="ad-preview" style={styles}>
            {caption}
        </aside>
    );
};

export default Ad;

