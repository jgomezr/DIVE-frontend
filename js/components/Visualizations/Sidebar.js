import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchDatasetsIfNeeded } from '../../actions/DatasetActions';
import { fetchFieldPropertiesIfNeeded } from '../../actions/FieldPropertiesActions';
import { selectDataset, selectVisualizationType, selectFieldProperty } from '../../actions/VisualizationActions';
import styles from './visualizations.sass';

import Select from 'react-select';
import ToggleButtonGroup from '../Base/ToggleButtonGroup';

export class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.onSelectVisualizationType = this.onSelectVisualizationType.bind(this);
    this.onSelectFieldProperty = this.onSelectFieldProperty.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { project, datasets, specSelector, fieldProperties, fetchDatasetsIfNeeded, selectDataset } = this.props;

    if (nextProps.project.properties.id !== project.properties.id) {
      fetchDatasetsIfNeeded(nextProps.project.properties.id);
      fetchFieldPropertiesIfNeeded(project.properties.id, specSelector.datasetId)
    }

    if (nextProps.datasets.items.length !== datasets.items.length && !specSelector.datasetId) {
      selectDataset(nextProps.datasets.items[0].datasetId);
    }
  }

  onSelectVisualizationType(visualizationType) {
    this.props.selectVisualizationType(visualizationType);
  }

  onSelectFieldProperty(fieldProperty) {
    this.props.selectFieldProperty(fieldProperty)
  }

  render() {
    const menuItems = this.props.datasets.items.map((dataset, i) =>
      new Object({
        value: dataset.datasetId,
        label: dataset.title
      })
    );

    return (
      <div className={ styles.sidebar }>
        { this.props.datasets.items && this.props.datasets.items.length > 0 &&
          <div className={ styles.sidebarGroup }>
            <h3 className={ styles.sidebarHeading }>Dataset</h3>
            <Select
              value={ `${this.props.specSelector.datasetId}` }
              options={ menuItems }
              onChange={ this.props.selectDataset }
              multi={ false }
              clearable={ false }
              searchable={ false } />
          </div>
        }
        <div className={ styles.sidebarGroup }>
          <h3 className={ styles.sidebarHeading }>Visualization type</h3>
          <ToggleButtonGroup
            toggleItems={ this.props.filters.visualizationTypes }
            displayTextMember="label"
            valueMember="type"
            imageNameMember="imageName"
            imageNameSuffix=".chart.svg"
            onChange={ this.onSelectVisualizationType } />
        </div>
        <div className={ styles.sidebarGroup }>
          <h3 className={ styles.sidebarHeading }>Categorical Fields</h3>
          { this.props.fieldProperties.items.c && this.props.fieldProperties.items.c.length > 0 &&
            <ToggleButtonGroup
              toggleItems={ this.props.fieldProperties.items.c }
              displayTextMember="name"
              valueMember="id"
              onChange={ this.onSelectFieldProperty } />
          }
        </div>
        <div className={ styles.sidebarGroup }>
          <h3 className={ styles.sidebarHeading }>Quantitative Fields</h3>
          { this.props.fieldProperties.items.q && this.props.fieldProperties.items.q.length > 0 &&
            <ToggleButtonGroup
              toggleItems={ this.props.fieldProperties.items.q }
              displayTextMember="name"
              valueMember="id"
              onChange={ this.onSelectFieldProperty } />
          }
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  project: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  specSelector: PropTypes.object.isRequired,
  fieldProperties: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { project, datasets, specSelector, fieldProperties, filters } = state;
  return {
    project,
    datasets,
    specSelector,
    fieldProperties,
    filters
  }
}

export default connect(mapStateToProps, { fetchDatasetsIfNeeded, fetchFieldPropertiesIfNeeded, selectDataset, selectVisualizationType, selectFieldProperty })(Sidebar);
