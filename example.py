import streamlit as st
from streamlit_back_camera_input import back_camera_input

image = back_camera_input()

if image:
    st.image(image)
    
    
