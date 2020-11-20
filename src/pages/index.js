import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const data = require("../data.json")

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Ratio of 🟥/🟦.</p>
    <ul>
      {
        data.map((d, i) => {
          return <li>
            <b>{i+1} : {d.filename} | ratio {d["red"]/ d["blue"]}</b>
            <div>
            <img style={{verticalAlign: "top"}} width="200px" src={`./sign-images/${d.filename}-original.jpg`}/>
            <img style={{verticalAlign: "top"}} width="200px" src={`./sign-images/${d.filename}-mask.jpg`}/>
            </div>
          </li>
        })
      }
    </ul>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage
