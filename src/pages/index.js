import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import numeral from "numeral"

const data = require("../data.json")

const dataDetails = require("../dataDetails.json")

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
    <h1>Attention is All You Need!</h1>
    <p>We're interested in the ratio of 🟥/(🟦 + 🟥).</p>
    <ul style={{padding: 0}}>
      {
        sortedData.map((d, i) => {
          return <li style={{listStyle: `none`}}>
            <b>ID={d.filename}</b> | ratio {numeral(d.ratio).format('1.00')} | {dataDetails[d.filename]["orgType"]} | {dataDetails[d.filename]["type"]}
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
