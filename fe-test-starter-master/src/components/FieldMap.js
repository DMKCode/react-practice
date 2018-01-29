import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

const URL = '';
const ZOOM = 13;

export default class FieldMap extends Component {
  static propTypes = {
    farm: PropTypes.object,
    onClick: PropTypes.func,
  };

  render() {
    return (
      <Map
        style={ { width: '500px', height: '500px' } }
        center={ this.props.farm.centre.coordinates }
        zoom={ { ZOOM } }
      >
        <TileLayer url={ URL } />
        { this.props.farm.fields.map(field => (
          <GeoJSON
            color="green"
            key={ field.name }
            data={ field.boundary }
            onClick={ this.props.onClick }
          />
        )) }
      </Map>
    );
  }
}
