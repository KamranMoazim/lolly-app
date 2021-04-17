/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 * url:
        "https://virtual-lolly-by-mateen.netlify.app/.netlify/functions/lollies",
 */

module.exports = {
  /* Your site config here */
plugins: [
    {
    resolve: "gatsby-source-graphql",
    options: {
        // This type will contain remote schema Query type
        typeName: "Lollies",
        // This is field under which it's accessible
        fieldName: "get_lollies",
        // Url to query from
        url: "https://607a9209b62f2000079f50c9--serene-mahavira-bafc5f.netlify.app/.netlify/functions/vCard"
    },
    },
],
}
// LOLLIES