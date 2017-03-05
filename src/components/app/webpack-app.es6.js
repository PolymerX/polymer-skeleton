'use strict'

// ===== Main library
import Polymer from './../polymer'

// ===== Behaviors
// import {AppBehaviors} from './../_behaviors/script.es6'

// ===== Pages

class WebpackApp {

  /**
   * Behaviors required by the component
   */
  get behaviors() {
    return []
  }

  /**
   * Component name, propertiers, behaviors and declared listeners
   */
  beforeRegister() {
    this.is = 'webpack-app'
    this.properties = {
      /** Name of the application */
      name: {
        type: String,
        value: 'This is a Polymer Webpack App'
      }
    }

    /** Observers */
    this.observers = []
  }

  created() {
    this.removeAttribute('unresolved')
  }

  attached() {
    console.info('My App Now Attacched!')
  }

  ready() {
    window.dispatchEvent(new Event('WebpackAppReady'))
  }
}

export default WebpackApp
/* eslint-disable new-cap */
Polymer(WebpackApp)
