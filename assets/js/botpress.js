window.addEventListener("load", function() {
  if (window.botpressWebChat) {
    window.botpressWebChat.init({
      host: "https://botpress.apps.ocp.lab-nxtit.com",
      botId: "botpress-stable",
    })

    let subject;
    window.addEventListener("message", function(event) {
      if (event.data.subject) {
        subject = event.data.subject;
      } else if (event.data.name === 'webchatLoaded') {
        // Do nothing
      } else if (event.data.message_type === "visit") {
        // Reset session
        window.botpressWebChat.sendEvent({ type: "session_reset" })

        window.botpressWebChat.sendEvent(subject ? {type: 'keycloak_connect', value: subject}: {type: 'keycloak_disconnect'})
      }
    })
  }
})