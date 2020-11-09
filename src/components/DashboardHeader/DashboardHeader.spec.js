import DashboardHeader from './DashboardHeader';
import React from 'react';
import logo from '../../assets/kaboodle-logo-white.svg';
import { mountWithConfig } from '../../testing/mountWithConfig';

export const tests = describe('DashboardHeader', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: true })),
      writable: true,
    });
  });

  it('Should contain appropriate menu class when toggled is TRUE', () => {
    const wrapper = mountWithConfig(
      <DashboardHeader logo={logo}>
        <a href="#menu">Menu Item</a>
      </DashboardHeader>,
    );

    wrapper.find('DashboardHeader').setState({
      menuToggled: true,
    });
    expect(
      wrapper
        .find('.DashboardHeader__menu')
        .hasClass('DashboardHeader__menu--open'),
    ).toBe(true);
  });

  it('Should fire onLogoClick function when logo is clicked', () => {
    const testfn = jest.fn();

    const wrapper = mountWithConfig(
      <DashboardHeader logo={logo} onLogoClick={testfn}>
        <a href="#menu">Menu Item</a>
      </DashboardHeader>,
    );

    wrapper.find('[data-test="header-logo-link"]').simulate('click');
    expect(testfn).toHaveBeenCalled();
  });

  it('should contain appropriate menu class when toggled is FALSE', () => {
    const wrapper = mountWithConfig(
      <DashboardHeader logo={logo}>
        <a href="#menu">Menu Item</a>
      </DashboardHeader>,
    );

    expect(
      wrapper
        .find('.DashboardHeader__menu')
        .hasClass('DashboardHeader__menu--open'),
    ).toBe(false);
  });

  it('Should toggle menu state when Button is clicked', () => {
    const wrapper = mountWithConfig(
      <DashboardHeader logo={logo}>
        <a href="#menu">Menu Item</a>
      </DashboardHeader>,
    );

    wrapper.find('.DashboardHeader__hamburger').simulate('click');

    expect(
      wrapper
        .find('.DashboardHeader__menu')
        .hasClass('DashboardHeader__menu--open'),
    ).toBe(true);
  });

  it('Should toggle menu when menu container is clicked', () => {
    const wrapper = mountWithConfig(
      <DashboardHeader logo={logo}>
        <a href="#menu">Menu Item</a>
      </DashboardHeader>,
    );

    wrapper.find('DashboardHeader').setState({
      menuToggled: true,
    });
    wrapper.find('.DashboardHeader__links').simulate('click');

    expect(wrapper.find('DashboardHeader').state('menuToggled')).toEqual(false);
  });

  it('Should toggle menu when menu container is clicked on non-mobile menu', () => {
    // Mock matchMedia to return FALSE
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: false })),
      writable: true,
    });

    const wrapper = mountWithConfig(
      <DashboardHeader logo={logo}>
        <a href="#menu">Menu Item</a>
      </DashboardHeader>,
    );

    wrapper.find('DashboardHeader').setState({
      menuToggled: true,
    });
    wrapper.find('.DashboardHeader__links').simulate('click');

    expect(wrapper.find('DashboardHeader').state('menuToggled')).toEqual(false);
  });

  it('Should toggle menu OFF when menu is open and handleClick method called', () => {
    const wrapper = mountWithConfig(
      <DashboardHeader logo={logo}>
        <a href="#menu">Menu Item</a>
      </DashboardHeader>,
    );

    wrapper.find('DashboardHeader').setState({ menuToggled: true });
    wrapper
      .find('DashboardHeader')
      .instance()
      .handleClick({ target: document.createElement('div') });

    expect(wrapper.find('DashboardHeader').state('menuToggled')).toEqual(false);
  });

  it('Should toggle menu OFF when menu is open and handleClick method called on overlay', () => {
    const wrapper = mountWithConfig(
      <DashboardHeader logo={logo}>
        <a href="#menu">Menu Item</a>
      </DashboardHeader>,
    );

    wrapper.find('DashboardHeader').setState({ menuToggled: true });
    wrapper
      .find('DashboardHeader')
      .instance()
      .handleClick({
        target: wrapper.find('.DashboardHeaderOverlay').getDOMNode(),
      });

    expect(wrapper.find('DashboardHeader').state('menuToggled')).toEqual(false);
  });

  it('Should NOT toggle menu OFF when menu is open and handleClick method called on dahboard header', () => {
    const wrapper = mountWithConfig(
      <DashboardHeader logo={logo}>
        <a href="#menu">Menu Item</a>
      </DashboardHeader>,
    );

    wrapper.find('DashboardHeader').setState({ menuToggled: true });
    wrapper
      .find('DashboardHeader')
      .instance()
      .handleClick({ target: wrapper.find('.DashboardHeader').getDOMNode() });

    expect(wrapper.find('DashboardHeader').state('menuToggled')).toEqual(true);
  });

  it('Should NOT toggle menu OFF when event listener has been removed', () => {
    const wrapper = mountWithConfig(
      <DashboardHeader logo={logo}>
        <a href="#menu">Menu Item</a>
      </DashboardHeader>,
    );

    wrapper
      .find('DashboardHeader')
      .instance()
      .componentWillUnmount();

    document.dispatchEvent(new MouseEvent('click'));
    expect(wrapper.find('DashboardHeader').state('menuToggled')).toEqual(false);
  });
});
