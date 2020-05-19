import React, { useState, useRef, useEffect } from 'react'
import Carousel from 'react-elastic-carousel'
import ImageSlide from './ImageSlide'
import WrongNetworkGif from '../../assets/gifs/wrong-network.gif'
import DespositGif from '../../assets/gifs/deposit.gif'
import ActionsGif from '../../assets/gifs/actions.gif'
import TwitterImage from '../../assets/images/twitter-share.png'
import LogoHandshake from '../../assets/images/logo-handshake.png'

import { Link } from '../../theme'
import TweetButton from '../NavigationTabs/TweetButton'
import styled from 'styled-components'

const TweetSpan = styled.span`
  *{
    display: inline;
    position: relative;
  }
`

const carouselContainerStyle = {
  width: '95%',
  position: 'relative',
  height: '450px',
  display: 'flex',
  'flex-direction': 'column',
  'justify-content': 'space-around'
}

function WelcomeCarousel() {
  const carouselRef = useRef(null)

  const [autoPlayEnabled, setAutoPlay] = useState(true)
  const disableAutoPlay = () => setAutoPlay(false)

  function handleArrowPress(e) {
    e.stopPropagation()
    switch (e.keyCode) {
      case 37:
        carouselRef.current.slidePrev()
        disableAutoPlay()
        break
      case 39:
        carouselRef.current.slideNext()
        disableAutoPlay()
        break
      default:
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleArrowPress)
    return () => {
      document.removeEventListener('keydown', handleArrowPress)
    }
  }, [handleArrowPress])

  const config = {
    enableAutoPlay: autoPlayEnabled,
    autoPlaySpeed: 7000,
    itmesToShow: 1
  }
  return (
    <Carousel
      onNextStart={disableAutoPlay}
      onPrevStart={disableAutoPlay}
      {...config}
      ref={carouselRef}
      style={carouselContainerStyle}
    >
      <ImageSlide
        text={ <span> Welcome to Arbiswap, a layer 2 implementation of the Uniswap Exchange using Arbitrum rollup technology! 
          Once you get some funds on the rollup chain, you can use it just like you would layer 1 Uniswap.<br/><br/>
          Let’s get started!

           </span>}
        imageUrl={LogoHandshake}
      />
      <ImageSlide
        text={
          <span>
            First, make sure you have,{' '}
            <Link target="_blank" href="https://metamask.io/download.html">
              MetaMask installed,
            </Link>{' '}
            and that you are connected to the Ropsten test network. 
            </span>
        }
        imageUrl={WrongNetworkGif}
      />
      <ImageSlide
        text={<span>Now you’ll need to get some funds onto our rollup sidechain. If you already have Ropsten ETH or any Ropsten ERC20 token, you can deposit via the “Deposit/Withdrawal” tab.</span>}
        imageUrl={DespositGif}
      />
      <ImageSlide
        text={<TweetSpan><span>Alternatively,</span> <TweetButton/> <span> at us and we’ll send some ETH and Arbiswap test token directly to you on the layer 2 chain.</span></TweetSpan>}
        imageUrl={TwitterImage}
      />
      <ImageSlide
        text={<span>Once you have funds on layer 2, you can use it just like you would uniswap on layer 1; send, swap, add liquidity, etc.</span>}
        imageUrl={ActionsGif}
      />
            <ImageSlide
        text={<span>For more info, checkout our <Link href="https://medium.com/offchainlabs" target="_blank">blog</Link> and our <Link href="https://developer.offchainlabs.com/docs/Developer_Quickstart/" target="_blank">docs</Link>. 
        
          <br/>          <br/>
        Happy swapping!
        </span>}
        imageUrl={LogoHandshake}
      />
    </Carousel>
  )
}

export default WelcomeCarousel
