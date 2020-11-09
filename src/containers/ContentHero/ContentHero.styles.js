const styles = ({ mixins }) => ({
  contentHero: {
    ...mixins.init(),
    composes: 'ContentHero',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    color: '#fff',
    backgroundColor: '#000',
  },
  image: {
    composes: 'ContentHero__image',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: '1',
    opacity: '0.8',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: 'scale(1.1)',
    filter: 'blur(5px)',
    backgroundImage: 'url(/images/defaultContentHero.jpg)',
  },
  details: {
    composes: 'ContentHero__details',
    width: '100%',
    zIndex: '2',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '2em',
  },
  detail: {
    composes: 'ContentHero__detail',
    fontSize: '1.1em',
    lineHeight: '1.2',
    '&:last-child': {
      marginBottom: '0',
    },
  },
  headings: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.7em',
  },
  title: {
    composes: 'ContentHero__title',
    fontSize: '1.4em',
    lineHeight: '1.3',
    fontWeight: '700',
  },
  subtitle: {
    composes: 'ContentHero__subtitle',
    fontSize: '1.15em',
    fontWeight: '700',
  },
  date: {
    extend: 'detail',
    composes: 'ContentHero__date',
  },
  location: {
    extend: 'detail',
    composes: 'ContentHero__location',
  },
});

export default styles;
