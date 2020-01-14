import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { config, animated, useSpring, useTrail } from 'react-spring'
import { ChildImageSharp } from '../types'
import Layout from '../components/Layout';
import { Flex } from '../components/elements'
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';

const Grid = styled(animated.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 2;
  opacity: 0;
  transition: all 0.4s ease 0s;
`

const Title = styled.div`
  color: white;
  font-weight: 700;  
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 25px;
  text-align: center;
  transition: all 0.4s ease 0s;
  opacity: 0;
`

const Item = styled(animated.a)`
  position: relative;
  overflow: hidden;
  > div img {
    transition: all 0.3s ease 0s !important;
  }
  &:hover {
    > div img {
      transform: scale(1.3);
    }

  &:hover {
    ${Overlay} {
      opacity: 1;
    }

    ${Title} {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const Content = styled(Flex)`
z-index: 10;
position: absolute;
left: 0;
top: 0;
right: 0;
bottom: 0;
padding: 30px;
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
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  const trail = useTrail(instagram.length, {    
  })


  return (
    <section>  
    <Layout>
      <Sidebar />
      <Page title="Gallery">
      <Grid style={pageAnimation}>
        {trail.map((style, index) => {
          // Grab everything before the first hashtag (because I write my captions like that)
          const post = instagram[index]
          const title = post.caption ? post.caption.split('#')[0] : ''
          const date = new Date(post.timestamp * 1000).toLocaleDateString('de-DE')    
      
          return (
            <Item style={style} href={`https://www.instagram.com/p/${post.id}/`} key={post.id}>
              <Overlay />
              <Img fluid={post.localFile.childImageSharp.fluid} />
              <Content flexDirection="column" flexWrap="nowrap" justifyContent="space-around" alignItems="center">
                <Title>{title}</Title>
              </Content>
              </Item>
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
