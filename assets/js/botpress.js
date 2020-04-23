window.addEventListener("load", function() {
  if (window.botpressWebChat) {
    window.botpressWebChat.init({
      host: "https://botpress.apps.ocp.lab-nxtit.com",
      botId: "botpress-stable",
    })

    function getScript() {
      return document.getElementById('botpress-widget');
    }

    window.addEventListener("message", function(event) {
      if (event.data.name === 'webchatLoaded') {
        // Do nothing
      } else if (event.data.message_type === "visit") {
        // Reset session
        window.botpressWebChat.sendEvent({ type: "session_reset" }) 

        const thisScript = getScript();
        if (thisScript) {
          // Build first event object
          const firstEvent = {}

          const pageType = thisScript.getAttribute('pageType') || 'homePage';
          if (pageType === 'loginPage') {
            firstEvent.type = pageType
          } else {
            // Read Keycloak token
            const subject = thisScript.getAttribute('subject');
            if (subject) {
              // Connected
              firstEvent.type = "keycloak_connect"
              firstEvent.value = subject
            } else {
              firstEvent.type = "keycloak_disconnect"
            }
          }

          // Send first event that is going to trigger welcome message
          window.botpressWebChat.sendEvent(firstEvent)
        }
      }
    })
  }
})