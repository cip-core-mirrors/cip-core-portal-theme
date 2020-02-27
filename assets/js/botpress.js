window.addEventListener("load", function() {

    console.log('load');
    console.log(document.getElementById('mainContainer'))

    if (window.botpressWebChat) {
        window.botpressWebChat.init({
            host: "https://botpress.apps.ocp.lab-nxtit.com",
            botId: "botin"
        })
  
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }
  
        const pageType = "homePage" // or whatever you want, like : "homePage", "contactPage", etc...
  
        window.addEventListener("message", function(event) {
            
            if (event.data.name === 'webchatLoaded') {
          // Reset session
                window.botpressWebChat.sendEvent({ type: "session_reset"}) 

            } else if (event.data.message_type === "visit") {
                
                const firstEvent = {}
                firstEvent.type = pageType

                if (pageType !== 'loginPage') {
                    // Read Keycloak token
                    const token = getCookie('keycloak_token')
                    if (token) {
                        // Connected
                        firstEvent.type = "keycloak_jwt"
                        firstEvent.value = token
                    }
                }
  
                // Send first event that is going to trigger welcome message
                window.botpressWebChat.sendEvent(firstEvent)
            }
        })
    }
})