import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'

import { version } from '../../package.json'
import { getReleasePageUrl, openExternalUrl } from '../utils/url'
import { GlobalConsumer } from '../contexts'
import Modal from './Modal'
import LogoSvg from './LogoSvg'
import Button from './Button'
import VersionString from './VersionString'

const HEIGHT = '600px'

const StyledModal = styled(Modal)`
  background-color: ${(p: any) => p.theme.aboutModal.bgColor};
  color: ${(p: any) => p.theme.aboutModal.textColor};
`

const Container = styled.div`
  ${flex({ direction: 'column', justify: 'space-around', align: 'center' })};
  padding: 2rem 1rem;
`

const logoWidth = 100

const Logo = styled(LogoSvg)`
  width: ${logoWidth}px;
  height: ${logoWidth * 1.96}px;
`

const Title = styled.h1`
  ${(p: any) => p.theme.font('header', 'bold')};
  font-size: 2rem;
  margin: 0.5rem 0;

  & + button {
    font-size: 1.2rem;
    padding: 0.5em 0.8em;
  }
`

const StyledVersionString = styled(VersionString)`
  display: block;
  margin: 1rem 0;
  font-size: 1rem;
  ${(p: any) => p.theme.font('body')};
`

const FindUs = styled.h2`
  font-size: 1.1rem;
  margin: 3rem 0 1rem;
`

const SocialButtons = styled.div`
  ${flex({ direction: 'row', justify: 'center', align: 'center' })};

  button {
    font-size: 0.8rem;
    padding: 0.5em 0.8em;
    margin: 1rem;
  }
`

interface Props {
  onRequestClose?: () => void,
  isOpen: boolean,
}

const AboutModal: React.FunctionComponent<Props> = ({ isOpen, onRequestClose }) => {
  const [ numClicksOnLogo, setNumClicksOnLogo ] = useState(0)

  const enableExperimentalFeatures = useCallback(({ 
    experimentalFeaturesEnabled,
    setExperimentalFeaturesEnabled 
  }) => {
    if (experimentalFeaturesEnabled) {
      return
    }

    if (9 === numClicksOnLogo) {
      setExperimentalFeaturesEnabled(true)
      console.log(`Experimental mode activated!`)
    } else {
      const clicksSoFar = numClicksOnLogo + 1
      console.log(`${10 - clicksSoFar} more needed to enable experimental mode...`)
      setNumClicksOnLogo(clicksSoFar)
    }
  }, [ numClicksOnLogo ])

  const viewReleaseNotes = useCallback(() => {
    openExternalUrl(getReleasePageUrl(version))
  }, [])

  const openWebsite = useCallback(() => {
    openExternalUrl('https://sting.erd.dev')
  }, [])

  const openTwitter = useCallback(() => {
    openExternalUrl('https://twitter.com/erd_dev')
  }, [])

  const openGithub = useCallback(() => {
    openExternalUrl('https://github.com/erdDEVcode/sting')
  }, [])

  return (
    <GlobalConsumer>
      {ctx => (
        <StyledModal isOpen={isOpen} width='640px' height={HEIGHT} onRequestClose={onRequestClose}>
          <Container>
            <Logo onClick={() => enableExperimentalFeatures(ctx)} />
            <Title>Sting</Title>
            <StyledVersionString />
            <Button onClick={viewReleaseNotes}>View release notes</Button>
            <FindUs>Find us:</FindUs>
            <SocialButtons>
              <Button icon='web' onClick={openWebsite}>Website</Button>
              <Button icon='twitter' onClick={openTwitter}>Twitter</Button>
              <Button icon='github' onClick={openGithub}>Github</Button>
            </SocialButtons>
          </Container>
        </StyledModal>
      )}
    </GlobalConsumer>
  )
}

export default AboutModal
