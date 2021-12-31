import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import numeral from "numeral"


import { useQueryParam, StringParam } from 'use-query-params'


const data = require("../data.json")

const dataDetails = require("../dataDetails.json")
const categories = [
  // [key, desc]
  ["all", "All"],
  ["covid19", "Covid 19"],
  ["bangkok", "Bangkok"],
  ["kmitl", "KMITL"],
]
// this is for testing.
const includeDummy = false


const getQueryFromLocation = () => {
  if(typeof window !== 'undefined' && window) {
    return "" // useQueryParam will parse query params automatically
  } else {
    return "?dummy-param"
  }
}


const Bubble = ({ text }) => {
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

const AreaSymbol = ({ color }) => {
  return <span style={{ display: `inline-block`, background: color, width: `10px`, height: `10px` }}>
    {` `}
  </span>
}

const IndexPage = () => {
  const [queryCategory, setQueryCategory] = useQueryParam(
    "category",
    StringParam,
    getQueryFromLocation()
  )

  const [category, setCategory] = useState()

  const setCategoryValue = (v) => {
    setQueryCategory(v)
    setCategory(v)
  }

  useEffect(() => {
    if (queryCategory !== undefined) {
      setCategory(queryCategory.toLowerCase())
    } else {
      setCategory("covid19")
    }
  }, [])


  const sortedData = data
    .filter(d => d.filename !== "dummy").map(d => {
      const details = dataDetails[d.filename]
      return {
        ratio: d["red"] / (d["red"] + d["blue"]),
        ...d,
        details: details,
        tagsLowerCase: details.tags.map(t => t.toLowerCase())
      }
    })
    .filter(d => {
      if (category !== undefined) {
        return d.tagsLowerCase.includes(category.toLowerCase()) || category === "all"
      }
      return true
    })

  sortedData.sort((a, b) => b.ratio - a.ratio)

  return <Layout>
    <SEO title="Home" />
    <div style={{ width: `650px` }}>
      <h1>Signifying!</h1>
      <p>When signboards of some Thai organizations signify the presence of their executives.</p>
      <p style={{ fontStyle: `italic` }}>
        <b>Remark:</b> Samples below are selected from the internet without any properly predefined selection criteria; hence, <b>statistics derived from them are not respresentative of the population and must be carefully considered when interpreting.</b>
      </p>
      <p style={{ background: `aliceblue` }}>
        <b>Area Utilization Ratio (AUR)</b> is the ratio between the area <AreaSymbol color="red" /> consumed by the features fo executives and the actual area <AreaSymbol color="blue" /> of each sign.
      </p>
      <b>Category</b>{` `}<select value={category} onChange={e => setCategoryValue(e.target.value)}>
        { categories.map( ([k, desc]) => <option value={k}>{desc}</option>)}
      </select> ({sortedData.length}/ {data.length - 1})
      <br /> <br />
      <ul style={{ padding: 0, marginLeft: `0px` }}>
        {
          sortedData.map((d, i) => {
            return <li style={{ listStyle: `none`, textAlign: `left`, marginLeft: `0px`, marginBottom: `30px` }}>
              ID: <Bubble text={d.filename} />
              <a href={d.details.src}>[Source]</a>
              {/* {` | `} */}
              <div style={{ marginTop: `5px`, marginBottom: `5px` }}>
                AUR:<Bubble text={numeral(d.ratio).format('1.00')} /> {`  `}
                Organization type:<Bubble text={d.details.orgType} /> {`  `}
                Format:<Bubble text={d.details.type} />
              </div>
              <div style={{ display: `inline-block` }}>
                <img style={{ verticalAlign: "top", marginBottom: 0 }} width="325px" src={`./sign-images/${d.filename}-original.jpg`} />
                <img style={{ verticalAlign: "top", marginBottom: 0 }} width="325px" src={`./sign-images/${d.filename}-mask.jpg`} />
              </div>
              {d.details.remark && <div style={{ fontStyle: 'italic' }}>
                Remark: {d.details.remark}
              </div>
              }
            </li>
          })
        }
      </ul>
    </div>
  </Layout >
}

export default IndexPage
