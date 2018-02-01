import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styled-theming';
import { IndexLink } from 'react-router';
import counterpart from 'counterpart';
import { pxToRem, zooTheme } from '../../../../../../theme';

const zooniverseApprovedTranslation = counterpart('project.nav.zooniverseApproved');

export const H1 = styled.h1`
  color: white;
  display: inline-flex;
  flex-direction: column;
  font-family: Karla;
  font-size: ${pxToRem(30)};
  font-weight: bold;
  letter-spacing: ${pxToRem(-1)};
  line-height: 1.2;
  text-shadow: 0 ${pxToRem(2)} ${pxToRem(3)} rgba(0,0,0,0.5);
`;

export const StyledLink = styled(IndexLink).attrs({
  activeClassName: 'active'
})`
  border-bottom: ${pxToRem(3)} solid transparent;
  color: white;
  text-decoration: none;
  white-space: nowrap;

  &:hover,
  &:focus {
    border-bottom: ${pxToRem(3)} solid white;
  }
`;

export const StyledCheckMarkWrapper = styled.span.attrs({
  'aria-label': zooniverseApprovedTranslation,
  role: 'img',
  title: zooniverseApprovedTranslation
})`
  font-size: 0.75rem;
  margin-left: 1rem;
`;

export const StyledCheckMark = styled.i`
  color: ${theme('mode', {
    light: zooTheme.colors.brand.default
  })};
  text-shadow: none;
`;

export const StyledUnderReview = styled.small`
  align-self: left;
  color: ${theme('mode', {
    light: zooTheme.colors.teal.light
  })};
  font-size: ${pxToRem(15)};
  text-transform: uppercase;
  white-space: nowrap;
`;


function ProjectTitle({ launched, link, title, underReview }) {
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <H1>
        <StyledLink to={`${link}?facelift=true`}>
          <span>
            {title}
            {launched &&
              <StyledCheckMarkWrapper className="fa-stack">
                <i className="fa fa-circle fa-stack-2x" />
                <StyledCheckMark className="fa fa-check fa-stack-1x" />
              </StyledCheckMarkWrapper>}
            </span>
        </StyledLink>
        {underReview && !launched &&
          <StyledUnderReview>{counterpart('project.nav.underReview')}</StyledUnderReview>}
      </H1>
    </ThemeProvider>
  );
}

ProjectTitle.defaultProps = {
  launched: false,
  link: '',
  title: '',
  underReview: false
};

ProjectTitle.propTypes = {
  launched: PropTypes.bool,
  link: PropTypes.string,
  title: PropTypes.string,
  underReview: PropTypes.bool
};

export default ProjectTitle;