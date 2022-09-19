/** @type {import('next-seo').DefaultSeoProps} */
// seo setup
export default {
  defaultTitle: 'Paperarium - a papercraft compendium.',
  titleTemplate: '%s - paperarium',
  description:
    'A modern archive and community for everything papercrafting. Cut, fold, and glue pieces together into figurines of all of your favorite characters!',
  canonical: 'https://paperarium.place',
  additionalMetaTags: [
    {
      property: 'author',
      content: 'Evan Kirkiles',
    },
    {
      property: 'language',
      content: 'en-us',
    },
    {
      property: 'keywords',
      content:
        'art, artist, painting, paper, papercraft, papercrafting, scissors, cut, glue, fold, visuals, graphic design, blender, 3d, 2d, concept, sculpture, game, video, videogame',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://paperarium.place',
    title: 'Paperarium - a papercraft compendium.',
    description:
      'A modern archive and community for everything papercrafting. Cut, fold, and glue pieces together into figurines of all of your favorite characters!',
    site_name: 'Paperarium',
  },
};
