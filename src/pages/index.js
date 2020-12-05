import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import numeral from "numeral"

const data = require("../data.json")

const dataDetails = require("../dataDetails.json")
const includeDummy = false

const Bubble = ({text}) => {
  return <b style={{
      borderRadius: `5px`,
      background: `lightgray`,
      padding: `0px 5px`,
      display: `inline-block`,
      verticalAlign: `middle`,
      margin: `0px 5px`,
    }}>
    {text}
  </b>
}

const IndexPage = () => {
  const sortedData = data.filter(d => d.filename !== "dummy").map(d => {
    return {
      ratio: d["red"] / (d["red"] + d["blue"]),
      ...d,
    }
  })

  sortedData.sort((a, b) => b.ratio - a.ratio)

  return <Layout>
    <SEO title="Home" />
    <div style={{width: `650px`}}>
      <h1>Signifying!</h1>
      <p>When signboards of some Thai organizations signify the presence of their executives.</p>
      <p stle={{background: `lightgray`}}>
        <b>Remark:</b> Samples below are selected from the internet without any properly predefined selection criteria; hence, <b>statistics derived from them are not respresentative of the population and must be carefully considered when interpreting.</b>
      </p>
      <ul style={{padding: 0, marginLeft: `0px`}}>
        {
          sortedData.map((d, i) => {
            return <li style={{listStyle: `none`, textAlign: `left`, marginLeft: `0px`, marginBottom: `20px`}}>
              <b>
                Ratio <span style={{fontSize: `12px`, verticalAlign: `center`}}>🟥/(🟦 + 🟥)</span>:
              </b> {` `}
              <Bubble text={numeral(d.ratio).format('1.00')}/>
              {` | `}
              <a href={dataDetails[d.filename]["src"]}>Source(id={d.filename})</a>
              <div style={{display: `inline-block`}}>
                <img style={{verticalAlign: "top", marginBottom: 0}} width="325px" src={`./sign-images/${d.filename}-original.jpg`}/>
                <img style={{verticalAlign: "top", marginBottom: 0}} width="325px" src={`./sign-images/${d.filename}-mask.jpg`}/>
                <div style={{marginTop: `5px`, display:`inline-block`}}>
                  Organization type: <Bubble text={dataDetails[d.filename]["orgType"]}/> 
                  Format: <Bubble text={dataDetails[d.filename]["type"]}/>
                </div>
              </div>
            </li>
          })
        }
      </ul>
    </div>
  </Layout>
}

export default IndexPage
