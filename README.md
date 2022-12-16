# streamlit_back_camera_input
Custome camera input with back camera as default


## Installation instructions

```sh
pip install streamlit-back-camera-input
```

## Usage instructions

```python
import streamlit as st

from streamlit_back_camera_input import back_camera_input

image = back_camera_input()

st.image(image)
```
