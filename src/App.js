/* global chrome */

import React, { Component } from 'react';
import { renderToString } from 'react-dom/server'
import Ad from './components/Ad';
import './App.css';
class App extends Component {
  constructor(props, context) {
    super(props,context);

    this.state = {
      domSelector: 'body',
      ads: [
          {id: 1, caption: 'My Triplelift Ad #1'},
          {id: 2, caption: 'My Triplelift Ad #2'}
      ]
    };

    this.embedAd = this.embedAd.bind(this);
    this.applyDOMSelector = this.applyDOMSelector.bind(this);
  }

  getAdById(ads, id) {
      const ad = ads.filter(ad => ad.id === id);
      if (ad.length) {
          return ad[0];
      }
      return null;
  }

  embedAd(adId) {
      const ad = this.getAdById(this.state.ads, adId),
          adString = renderToString(<Ad caption={ad.caption} key={ad.id} />),
          data = {
              adString,
              container: this.state.domSelector
          };

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {data});
      });
  }

  applyDOMSelector(event) {
      this.setState({
          domSelector: event.target.value
      });
  }

  render() {
      return (
          <div className="app">
              <h1>Ad Preview Tool</h1>
              <ol>
                  <li>
                      Please specify a DOM selector to which your Ad will be appended:

                      <input type="text" className="txtDomSelector" onChange={this.applyDOMSelector} value={this.state.domSelector} />
                  </li>
                  <li>
                      Click on the Ad you wish to preview on your currently active tab:

                      {this.state.ads.map(ad => (
                          <div onClick={() => this.embedAd(ad.id)}>
                                <Ad key={ad.id} caption={ad.caption}  />
                          </div>
                      ))}

                  </li>
              </ol>
          </div>
      );
  }
}

export default App;
