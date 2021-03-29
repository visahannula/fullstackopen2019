import React from 'react';
import './MapIframe.css';

/**
 * OpenstreetMap map export in iframe element.
 */
const baseURI = 'https://www.openstreetmap.org/export/embed.html';
const layerParam = 'layer=mapnik';

/**
 * Creates bounding box for the map coordinates.
 * Output is URL params as an array [ bounding box, marker].
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns URL params
 */
function createURLParamBBoxAndMarker(latitude, longitude) {
    const multiplier = 2.5;
    let boundingBox = [
        longitude - multiplier,
        latitude - multiplier,
        longitude + multiplier,
        latitude + multiplier
    ];
    // bounging box measurements and marker position
    return [
        'bbox=' + boundingBox.join(','),
        'marker=' + [latitude, longitude].join(',')
    ];
}

/**
 * Create full URL for the map
 * @param {string} baseURI 
 * @param {array} params 
 * @returns 
 */
function createMapURL(baseURI, params) {
    return baseURI + '?' + params.join('&');
}

export const MapIframe = ({ latitude, longitude }) =>
    <iframe
        src={createMapURL(
            baseURI,
            createURLParamBBoxAndMarker(latitude, longitude).concat(layerParam)
        )}
        title={"Map showing coordinates " + latitude + "," + longitude}
    >Map cannot be shown.</iframe>;