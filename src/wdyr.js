import React from 'react'

if (!window.inProductionMode) {
    console.log('Setting up why-did-you-render ...')

    const whyDidYouRender = require('@welldone-software/why-did-you-render')
    
    whyDidYouRender(React, {
        trackAllPureComponents: true,
    })
}

