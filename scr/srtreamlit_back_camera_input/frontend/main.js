// The `Streamlit` object exists because our html file includes
// `streamlit-component-lib.js`.
// If you get an error about "Streamlit" not being defined, that
// means you're missing that file.

function sendValue(value) {
    Streamlit.setComponentValue(value)
  }
  
  /**
   * The component's render function. This will be called immediately after
   * the component is initially loaded, and then again every time the
   * component gets new data from Python.
   */
  function onRender(event) {
    // Only run the render code the first time the component is loaded.
    if (!window.rendered) {
      // You most likely want to get the data passed in like this
      var { height, width } = event.detail.args;
      
      Streamlit.setFrameHeight(height);
      
      let video = document.getElementById('video');
      let canvas = document.getElementById('canvas');
  
      video.setAttribute('width', '100%');
      video.setAttribute('height', 'auto');
      
      const constraints =  { facingMode: 'environment', advanced : [{focusMode: "continuous"}]};
      navigator.mediaDevices.getUserMedia({ video: constraints })
        .then(function(stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function(err) {
          console.log("An error occurred: " + err);
        });
  
      function takePicture() {
        let context = canvas.getContext('2d');
        width = video.srcObject.getVideoTracks()[0].getSettings().width;
        height = video.srcObject.getVideoTracks()[0].getSettings().height;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);      
        var data = canvas.toDataURL('image/png');
        sendValue(data);
      }      
      
      video.addEventListener('click', takePicture);
      window.rendered = true
    }
  }
  
  // Render the component whenever python send a "render event"
  Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
  // Tell Streamlit that the component is ready to receive events
  Streamlit.setComponentReady()
  // Don't actually need to display anything, so set the height to 0
  Streamlit.setFrameHeight(0)
  