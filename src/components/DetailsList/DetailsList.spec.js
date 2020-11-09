import { Button } from '@kaboodle-solutions/design-system';
import DetailsList from './DetailsList';
import DetailsListField from '../DetailsListField';
import React from 'react';
import { mountWithConfig } from '../../testing/mountWithConfig';

export const tests = describe('DetailsList', () => {
  it('should render children when passed through', () => {
    const wrapper = mountWithConfig(
      <DetailsList>
        <DetailsListField title="Gender" value="Female">
          <Button>Update</Button>
        </DetailsListField>
        <DetailsListField title="Phone Number" value="0254323623">
          <Button>Update</Button>
        </DetailsListField>
      </DetailsList>,
    );
    expect(wrapper.find('.DetailsList').children().length).toEqual(2);
  });
});
