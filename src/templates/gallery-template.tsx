import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { config, animated, useSpring, useTrail } from 'react-spring'
import { ChildImageSharp } from '../types'
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';

const Grid = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr)); 
`

type Props = {
  data: {
    instagram: {
      nodes: {
        caption?: string
        id: string
        timestamp: number
        likes: number
        localFile: ChildImageSharp
      }[]
    }
  }
}

const Instagram: React.FunctionComponent<Props> = ({
  data: {
    instagram: { nodes: instagram },
  },
}) => {
  
  const pageAnimation = useSpring({
    config: config.default,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  const trail = useTrail(instagram.length, {
    
  })

  return (
    <section>  
    <Layout>
      <Sidebar />
      <Page>
      <Grid style={pageAnimation}>
        {trail.map((style, index) => {
          // Grab everything before the first hashtag (because I write my captions like that)
          const post = instagram[index]
          
      
          return (
            <div key={post.id}>  
              <Img fluid={post.localFile.childImageSharp.fluid} />                    
            </div>
          )
        })}
      </Grid>
      </Page>
    </Layout>
    </section>
  )
}

export default Instagram

export const query = graphql`
  query Instagram {
    instagram: allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 30) {
      nodes {
        caption
        id
        timestamp
        likes
        localFile {
          childImageSharp {
            fluid(quality: 100, maxWidth: 600, maxHeight: 600) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
