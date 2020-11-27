import React, { useCallback, useMemo } from 'react'
import styled from '@emotion/styled'
import parse from 'remark-parse'
import unified from 'unified'
import remark2react from 'remark-react'

import { openExternalUrl } from '../utils/url'
import _ from '../utils/lodash'

const Container = styled.div`
  ${(p: any) => p.theme.font('body')};
  font-size: 1rem;
  line-height: 1.5em;

  h2 {
    ${(p: any) => p.theme.font('header')};
    margin-top: 2.5rem;
  }

  strong, b {
    font-weight: bolder;
  }

  em, i {
    font-style: italic;
  }

  ol, ul {
    margin: 1rem 0 1.5rem 1rem;
    list-style-type: disc;

    li {
      margin: 0.5rem 0;
    }
  }

  ol {
    list-style-type: decimal;
  }

  img {
    max-width: 100%;
  }

  pre {
    font-size: 1em;
  }
`

const P = styled.p`
  margin: 1rem 0;

  &:first-of-type {
    margin-top: 0;
  }
`

const ImgDiv = styled.div`
  margin: 2rem 0;
  text-align: center;

  & > img, & > div {
    display: block;
    margin: 0;
  }

  em {
    margin-top: 0.2rem;
    font-size: 90%;
  }
`

interface RenderParagraphArgs {
  children: any,
}

const RenderParagraph = ({ children }: RenderParagraphArgs) => {
  const imgSrc = _.get(children, '0.props.src', '')
  const dotPos = imgSrc.lastIndexOf('.')
  const ext = (dotPos ? imgSrc.substring(dotPos + 1) : '').toLowerCase()

  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'png':
    case 'bmp':
      return <ImgDiv>{children}</ImgDiv>
    default:
      return <P>{children}</P>
  }
}

interface RenderImageArgs {
  src: string,
  title?: string,
  alt?: string,
}

const RenderImage = (args: RenderImageArgs) => {
  const { src, alt, title } = args

  return <img src={src} alt={alt} title={title} />
}

interface RenderAnchorArgs {
  href: string,
  children: any,
  title: string,
}

const RenderAnchor = ({ href, title, children }: RenderAnchorArgs) => {
  const c = (Array.isArray(children) ? children.join(', ') : children)

  const onClick = useCallback(e => {
    e.preventDefault()
    openExternalUrl(href)
  }, [ href ])

  return <a href={href} title={title} onClick={onClick}>{c}</a>
}


interface Props {
  children: string,
  className?: string,
}

const Markdown: React.FunctionComponent<Props> = ({ children: markdown, className }) => {
  const output = useMemo(() => {
    const ret = unified()
      .use(parse)
      .use(remark2react, {
        remarkReactComponents: {
          p: RenderParagraph,
          img: RenderImage,
          a: RenderAnchor,
        }
      })
      .processSync(markdown).result

    return ret as any
  }, [markdown])

  return (
    <Container className={className}>{output}</Container>
  )
}

export default Markdown