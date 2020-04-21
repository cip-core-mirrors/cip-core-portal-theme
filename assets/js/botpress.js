window.addEventListener("load", function() {
    if (window.botpressWebChat) {
      window.botpressWebChat.init({
        host: "https://botpress.apps.ocp.lab-nxtit.com",
        botId: "botpress-stable",
        //extraStylesheet: "http://website.com/custom.css",
      })
  
      function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
      }
  
      const pageType = 'homePage'
  
      window.addEventListener("message", function(event) {
        if (event.data.name === 'webchatLoaded') {
          // Do nothing
        } else if (event.data.message_type === "visit") {
          // Reset session
          window.botpressWebChat.sendEvent({ type: "session_reset" }) 
          
          // Build first event object
          const firstEvent = {}
          firstEvent.type = pageType
          if (pageType !== 'loginPage') {
            // Read Keycloak token
            const token = getCookie('kc-access')
            if (token) {
              // Connected
              firstEvent.type = "keycloak_jwt"
              firstEvent.value = token
            } else {
              firstEvent.type = "keycloak_disconnect"
            }
          }
  
          // Send first event that is going to trigger welcome message
          window.botpressWebChat.sendEvent(firstEvent)
        }
      })
    }
  })