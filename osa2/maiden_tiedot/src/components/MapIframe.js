import React from 'react';
import './MapIframe.css';

/**
 * OpenstreetMap map export in iframe element.
 */
const baseURI = 'https://www.openstreetmap.org/export/embed.html?bbox=';
const URIpart = '&layer=mapnik&marker=';

/**
 * Creates bounding box for the map coordinates.
 * Output is a URL as a string.
 * @param {float} lat 
 * @param {*} lon 
 * @returns 
 */
function createMapURL(lat, lon) {
    let Bbox = [
        lon - 2.5,
        lat - 2.5,
        lon + 2.5,
        lat + 2.5
    ];

    return baseURI + Bbox.join(',') + URIpart + [lat, lon].join(',');

}

export const MapIframe = ({ latitude, longitude }) => 
    <iframe
        src={createMapURL(latitude, longitude)} 
        title={ "Map showing coordinates" + latitude + "," + longitude }
        >Map cannot be shown.</iframe>;