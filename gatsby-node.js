// // const path = require("path")

// // exports.createPages = async ({ graphql, actions }) => {
// //     const { createPage } = actions
// //     const response = await graphql(`
// //         query {
// //             allGraphCmsBlog {
// //                 nodes {
// //                     link
// //                 }
// //             }
// //         }
// //     `)

// // response.data.allGraphCmsBlog.nodes.forEach(node => {
// //     createPage({
// //         path: `/showLolly/${node.link}`,
// //         component: path.resolve("./src/templates/sendingTemp.js"),
// //         context: {
// //             link: node.link,
// //         },
// //     })
// //     })
// // }

// const path = require("path")
// exports.createPages = async ({ graphql, actions }) => {
// const { createPage } = actions

// const { data } = await graphql(`
//     {
//         get_lollies {
//             getVCard {
//             c1
//             c2
//             c3
//             link
//             sender
//             rec
//             msg
//             }
//         }
//     }
// `)

// data.get_lollies.getVCard.forEach(node => {
//     createPage({
//         path: `showLolly/${node.link}`,
//         component: path.resolve("./src/templates/sendingTemp.js"),
//         context: {
//             c1: node.c1,
//             c2: node.c2,
//             c3: node.c3,
//             link: node.link,
//             msg: node.msg,
//             sender: node.sender,
//             rec: node.rec,
//         },
//     })
// })
// }
