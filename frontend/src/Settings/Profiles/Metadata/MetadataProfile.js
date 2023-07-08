import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MiddleTruncate from 'react-middle-truncate';
import Card from 'Components/Card';
import Label from 'Components/Label';
import IconButton from 'Components/Link/IconButton';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import { icons, kinds } from 'Helpers/Props';
import translate from 'Utilities/String/translate';
import EditMetadataProfileModalConnector from './EditMetadataProfileModalConnector';
import styles from './MetadataProfile.css';

class MetadataProfile extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditMetadataProfileModalOpen: false,
      isDeleteMetadataProfileModalOpen: false
    };
  }

  //
  // Listeners

  onEditMetadataProfilePress = () => {
    this.setState({ isEditMetadataProfileModalOpen: true });
  };

  onEditMetadataProfileModalClose = () => {
    this.setState({ isEditMetadataProfileModalOpen: false });
  };

  onDeleteMetadataProfilePress = () => {
    this.setState({
      isEditMetadataProfileModalOpen: false,
      isDeleteMetadataProfileModalOpen: true
    });
  };

  onDeleteMetadataProfileModalClose = () => {
    this.setState({ isDeleteMetadataProfileModalOpen: false });
  };

  onConfirmDeleteMetadataProfile = () => {
    this.props.onConfirmDeleteMetadataProfile(this.props.id);
  };

  onCloneMetadataProfilePress = () => {
    const {
      id,
      onCloneMetadataProfilePress
    } = this.props;

    onCloneMetadataProfilePress(id);
  };

  //
  // Render

  render() {
    const {
      id,
      name,
      minPopularity,
      minPages,
      ignored,
      isDeleting
    } = this.props;

    return (
      <Card
        className={styles.metadataProfile}
        overlayContent={true}
        onPress={this.onEditMetadataProfilePress}
      >
        <div className={styles.nameContainer}>
          <div className={styles.name}>
            {name}
          </div>

          <IconButton
            className={styles.cloneButton}
            title={translate('CloneProfile')}
            name={icons.CLONE}
            onPress={this.onCloneMetadataProfilePress}
          />
        </div>

        <div className={styles.enabled}>
          {
            minPopularity ?
              <Label kind={kinds.DEFAULT}>
                {translate('MinimumPopularity')}: {minPopularity}
              </Label> :
              null
          }

          {
            minPages ?
              <Label kind={kinds.DEFAULT}>
                {translate('MinimumPages')}: {minPages}
              </Label> :
              null
          }
        </div>

        <div>
          {
            ignored.map((item) => {
              if (!item) {
                return null;
              }

              return (
                <Label
                  className={styles.label}
                  key={item}
                  kind={kinds.DANGER}
                >
                  <MiddleTruncate
                    text={item}
                    start={10}
                    end={10}
                  />
                </Label>
              );
            })
          }
        </div>

        <EditMetadataProfileModalConnector
          id={id}
          isOpen={this.state.isEditMetadataProfileModalOpen}
          onModalClose={this.onEditMetadataProfileModalClose}
          onDeleteMetadataProfilePress={this.onDeleteMetadataProfilePress}
        />

        <ConfirmModal
          isOpen={this.state.isDeleteMetadataProfileModalOpen}
          kind={kinds.DANGER}
          title={translate('DeleteMetadataProfile')}
          message={translate('DeleteMetadataProfileMessageText', [name])}
          confirmLabel={translate('Delete')}
          isSpinning={isDeleting}
          onConfirm={this.onConfirmDeleteMetadataProfile}
          onCancel={this.onDeleteMetadataProfileModalClose}
        />
      </Card>
    );
  }
}

MetadataProfile.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  minPopularity: PropTypes.number.isRequired,
  minPages: PropTypes.number.isRequired,
  ignored: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDeleting: PropTypes.bool.isRequired,
  onConfirmDeleteMetadataProfile: PropTypes.func.isRequired,
  onCloneMetadataProfilePress: PropTypes.func.isRequired

};

MetadataProfile.defaultProps = {
  minPopularity: 0,
  minPages: 0,
  ignored: []
};

export default MetadataProfile;
