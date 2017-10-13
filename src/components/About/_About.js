import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  background: white;
  padding: 20px;
`

const Headline = styled.p`
  font-size: 25px;
  line-height: 1.5;
  text-align: center;
`

// const Text = styled.p`
//   font-size: 20px;
//   font-weight: 300;
//   line-height: 1.5;
// `

class About extends Component {
  static defaultProps = {
    title: '<pkg> radar'
  }

  render() {
    const { title } = this.props;

    return (
      <Container>
        <Headline>
          <strong>{title}</strong> is a search and discovery tool for open source software that also allows users to
          segment their favorite packages into four categories: Backlog, Trial, Production, Archive.
        </Headline>
        {/* <Text>
          Adopting an open source library into a production environment is an important process.
        </Text>
        <Text>
          Finding the right library can be challenging.  A simple search for "javascript frontend frameworks" brings back the following results on Google:
        </Text> */}
      </Container>
    )
  }
}

export default About