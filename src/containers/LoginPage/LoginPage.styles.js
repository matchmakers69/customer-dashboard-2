const styles = ({ variables, breakpoints, mixins }) => ({
  page: {
    composes: 'pageLayout',
    marginBottom: '-12em',
    position: 'relative',
    zIndex: 100,
  },
  bg: {
    width: '100%',
    height: '12em',
    bottom: 0,
    backgroundColor: variables.colors.primary,
    backgroundImage: 'url(/images/loginBg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom center',
    position: 'relative',
    [breakpoints.lg]: {
      position: 'absolute',
      display: 'block',
      height: '100vh',
      top: 0,
      width: '50%',
      left: '50%',
    },
  },
  slice: {
    position: 'absolute',
    bottom: 0,
    backgroundImage:
      'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxMDQwcHgiIGhlaWdodD0iNTdweCIgdmlld0JveD0iMCAwIDEwNDAgNTciIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+dmVydGljYWwtc2xpY2U8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+ICAgICAgICA8cmVjdCBpZD0icGF0aC0xIiB4PSIwLjUiIHk9IjAuNSIgd2lkdGg9IjU5IiBoZWlnaHQ9IjEwNDAiPjwvcmVjdD4gICAgPC9kZWZzPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJ2ZXJ0aWNhbC1zbGljZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTIwLjAwMDAwMCwgMjkuNTAwMDAwKSBzY2FsZSgxLCAtMSkgcm90YXRlKDI3MC4wMDAwMDApIHRyYW5zbGF0ZSgtNTIwLjAwMDAwMCwgLTI5LjUwMDAwMCkgdHJhbnNsYXRlKDQ5MC4wMDAwMDAsIC00OTEuMDAwMDAwKSI+ICAgICAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgZmlsbD0id2hpdGUiPiAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPiAgICAgICAgICAgIDwvbWFzaz4gICAgICAgICAgICA8ZyBpZD0icGF0aC0xIj48L2c+ICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI0ZDRkNGQyIgZmlsbC1ydWxlPSJub256ZXJvIiBtYXNrPSJ1cmwoI21hc2stMikiIHBvaW50cz0iLTY4MyA5LjA5NDk0NzAyZS0xMyA1NyA5LjA5NDk0NzAyZS0xMyA0IDEwNDEgLTY4MyAxMDQxIj48L3BvbHlnb24+ICAgICAgICA8L2c+ICAgIDwvZz48L3N2Zz4=)',
    width: '100%',
    height: '12em',
    [breakpoints.lg]: {
      width: '50%',
      top: 0,
      backgroundImage:
        'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI1N3B4IiBoZWlnaHQ9IjEwMjRweCIgdmlld0JveD0iMCAwIDU3IDEwMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+R3JvdXA8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+ICAgICAgICA8cmVjdCBpZD0icGF0aC0xIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTciIGhlaWdodD0iMTAyNCI+PC9yZWN0PiAgICA8L2RlZnM+ICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9Ikdyb3VwIj4gICAgICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+ICAgICAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+ICAgICAgICAgICAgPC9tYXNrPiAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUiPjwvZz4gICAgICAgICAgICA8cG9seWdvbiBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjRkNGQ0ZDIiBtYXNrPSJ1cmwoI21hc2stMikiIHBvaW50cz0iLTY4MyAwIDU3IDAgNCAxMDI0IC02ODMgMTAyNCI+PC9wb2x5Z29uPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+)',
      height: 'auto',
    },
  },
  logo: {
    composes: 'logo',
    backgroundImage: 'url(/images/kaboodle-logo-colour.png)',
    height: '2em',
    margin: '1em 0',
    backgroundSize: 'contain',
  },
  header: {
    color: variables.colors.primary,
  },
  container: {
    paddingBottom: '12em',
    [breakpoints.lg]: {
      maxWidth: '30em',
      paddingBottom: 0,
    },
  },
  '@global': {
    '.pageLayout': {
      minHeight: '100%',
    },
    body: {
      ...mixins.init(),
      backgroundColor: variables.colors.light,
      color: variables.colors.dark,
    },
    h1: {
      ...variables.type.h1,
    },
  },
});

export default styles;
