# streamlit_back_camera_input
Streamlit camera input with back camera as default  
Just touch on video area to take a picture


## Installation instructions

```sh
pip install streamlit-back-camera-input
```

## Usage instructions

```python
import streamlit as st

from streamlit_back_camera_input import back_camera_input

image = back_camera_input()
if image:
    st.image(image)
```
