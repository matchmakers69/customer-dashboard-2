import { Button, Title } from '@kaboodle-solutions/design-system';

import PropTypes from 'prop-types';
import React from 'react';
import constants from '../../constants';
import styles from './BookingSidebar.styles';
import withParams from '../../lib/router/withParams';
import withStyles from 'react-jss';

const SidebarDownload = ({ classes, downloads }) => {
  if (!downloads.length) return null;

  const downloadUrl = ({ key, external, url }) =>
    external ? url : withParams(constants.DOWNLOAD_URL, { key });

  const buttonVariant = type => (type === 'eticket' ? 'success' : 'default');

  return (
    <div className={classes.sidebarSection}>
      <Title>Downloads</Title>
      {downloads.map(download => (
        <a
          className="DownloadLink"
          key={downloadUrl(download)}
          href={downloadUrl(download)}
          target={download.external ? '_blank' : null}
          rel="noopener noreferrer">
          <Button variant={buttonVariant(download.type)}>
            {download.description}
          </Button>
        </a>
      ))}
    </div>
  );
};

SidebarDownload.propTypes = {
  classes: PropTypes.object,
  downloads: PropTypes.array,
};

SidebarDownload.defaultProps = {
  classes: {},
  downloads: [],
};

export default withStyles(styles)(SidebarDownload);
