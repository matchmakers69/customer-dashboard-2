import { Button } from '@kaboodle-solutions/design-system';
import DetailsList from '../DetailsList';
import DetailsListField from '../DetailsListField';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const ProfileDetailsList = ({ details }) => (
  <DetailsList>
    {details.map(detail => (
      <DetailsListField
        key={detail.title}
        title={detail.title}
        value={detail.value}
        type={detail.type}>
        {detail.link && (
          <Link to={detail.link}>
            <Button>Update</Button>
          </Link>
        )}
      </DetailsListField>
    ))}
  </DetailsList>
);

ProfileDetailsList.propTypes = {
  details: PropTypes.array.isRequired,
};

export default ProfileDetailsList;
