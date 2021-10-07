'use strict'
  /**
   * Credit: jfriend00 (https://github.com/jfriend00/docReady)
   */
  ; (function (funcName, baseObj) {
    funcName = funcName || 'docReady'
    baseObj = baseObj || window
    var readyList = []
    var readyFired = false
    var readyEventHandlersInstalled = false

    function ready() {
      if (!readyFired) {
        readyFired = true
        for (var i = 0; i < readyList.length; i++) {
          readyList[i].fn.call(window, readyList[i].ctx)
        }
        readyList = []
      }
    }

    function readyStateChange() {
      if (document.readyState === 'complete') {
        ready()
      }
    }

    baseObj[funcName] = function (callback, context) {
      if (typeof callback !== 'function') {
        throw new TypeError('callback for docReady(fn) must be a function')
      }
      if (readyFired) {
        setTimeout(function () {
          callback(context)
        }, 1)
        return
      } else {
        readyList.push({ fn: callback, ctx: context })
      }
      if (
        document.readyState === 'complete' ||
        (!document.attachEvent && document.readyState === 'interactive')
      ) {
        setTimeout(ready, 1)
      } else if (!readyEventHandlersInstalled) {
        if (document.addEventListener) {
          document.addEventListener('DOMContentLoaded', ready, false)
          window.addEventListener('load', ready, false)
        } else {
          document.attachEvent('onreadystatechange', readyStateChange)
          window.attachEvent('onload', ready)
        }
        readyEventHandlersInstalled = true
      }
    }
  })('docReady', window)

docReady(function () {
  var body = document.getElementsByTagName('body')[0]
  var head = document.getElementsByTagName('head')[0]
  var div = document.createElement('div')
  var iframe = document.createElement('iframe')
  var link = document.createElement('link')
  const PRACTICE_ID = 'f4809143-cfa4-43b3-a0e0-b27c6aac1b3e'
  var widgetOrigin = 'https://ows-widget.ngrok.io'
  div.id = 'ows-widget'
  body.classList.add('ows-widget', 'ows-widget__closed')

  iframe.setAttribute('src', `https://ows-widget.ngrok.io/?practice_id=${PRACTICE_ID}`)
  iframe.setAttribute('frameborder', '0')
  iframe.setAttribute('allowTransparency', 'true')
  iframe.setAttribute('scrolling', 'no')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', 'https://ows-widget.ngrok.io/widget.css')

  window.addEventListener('message', receiveMessage, false)
  function receiveMessage(event) {
    var origin = event.origin || event.originalEvent.origin
    if (origin !== widgetOrigin) {
      return
    }

    if (event.data === 'widget open') {
      body.classList.toggle('ows-widget__closed')
      body.classList.toggle('ows-widget__open')
    }

    if (event.data === 'widget close') {
      body.classList.toggle('ows-widget__closed')
      body.classList.toggle('ows-widget__open')
    }
  }
  div.appendChild(iframe)
  body.appendChild(div)
  head.appendChild(link)
})
