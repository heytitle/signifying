import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import numeral from "numeral"

const data = require("../data.json")

const IndexPage = () => {
  const sortedData = data.map(d => {
    return {
      ratio: d["red"] / (d["red"] + d["blue"]),
      ...d,
    }
  })

  sortedData.sort((a, b) => b.ratio - a.ratio)

  return <Layout>
    <SEO title="Home" />
    <h1>It's all about signs!</h1>
    <p>We're interested in the ratio of 🟥/(🟦 + 🟥).</p>
    <ul>
      {
        sortedData.map((d, i) => {
          return <li>
            <b>{i+1} : {d.filename} | ratio {numeral(d.ratio).format('1.00')}</b>
            <div>
            <img style={{verticalAlign: "top"}} width="200px" src={`./sign-images/${d.filename}-original.jpg`}/>
            <img style={{verticalAlign: "top"}} width="200px" src={`./sign-images/${d.filename}-mask.jpg`}/>
            </div>
          </li>
        })
      }
    </ul>
  </Layout>
}

export default IndexPage
