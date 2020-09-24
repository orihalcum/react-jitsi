import React, { useState, useEffect } from 'react';

function VideoConference() {

  const jitsiContainerId = 'jitsi-container-id'
  const [jitsi, setJitsi] = useState({})

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise(resolve => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => resolveLoadJitsiScriptPromise(true);
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  }

  const initJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
      parentNode: document.getElementById(jitsiContainerId)
    });

    setJitsi(_jitsi);
  }

  useEffect(() => {
    initJitsi()
    return () => jitsi?.dispose?.()
  }, [])

  return <div id={jitsiContainerId} style={{ height: '100vh', width: "100%" }} />;
}

export default VideoConference;
