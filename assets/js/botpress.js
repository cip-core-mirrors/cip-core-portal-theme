function idGenerator() {
  const c4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (c4()+c4()+"-"+c4()+"-"+c4()+"-"+c4()+"-"+c4()+c4()+c4());
}

window.addEventListener("load", function() {
  if (window.botpressWebChat) {
    window.botpressWebChat.init({
      host: '{{--BOTPRESS_URL--}}',
      botId: '{{--BOTPRESS_NAME--}}',
      userId: idGenerator(),
    })

    let subject;
    window.addEventListener("message", function(event) {
      if (event.data.subject) {
        subject = event.data.subject;
      } else if (event.data.name === 'webchatLoaded') {
        // Do nothing
      } else if (event.data.message_type === "visit") {
        // Reset session
        //window.botpressWebChat.sendEvent({ type: "session_reset" })

        window.botpressWebChat.sendEvent(subject ? {type: 'keycloak_connect', value: subject}: {type: 'keycloak_disconnect'})
        setTimeout(function() {
          window.botpressWebChat.sendEvent({type: 'message', text: 'Hello'})
        }, 1000)
      }
    })
  }
})
