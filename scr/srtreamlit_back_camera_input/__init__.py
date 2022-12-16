import base64
from io import BytesIO
from pathlib import Path
from typing import Optional

import streamlit as st
import streamlit.components.v1 as components

# Tell streamlit that there is a component called camera_input_live,
# and that the code to display that component is in the "frontend" folder
frontend_dir = (Path(__file__).parent / "frontend").absolute()
_component_func = components.declare_component(
    "back_camera_input", path=str(frontend_dir)
)


def back_camera_input(
    height: int = 450,
    width: int = 500,
    key: Optional[str] = None,    
) -> Optional[BytesIO]:
    """
    Add a descriptive docstring
    """
    b64_data: Optional[str] = _component_func(
        height=height,
        width=width,
        key=key,
    )

    if b64_data is None:
        return None

    raw_data = b64_data.split(",")[1]  # Strip the data: type prefix

    component_value = BytesIO(base64.b64decode(raw_data))

    return component_value


def main():
    st.write("## Example")

    image = back_camera_input()

    if image is not None:
        st.image(image)


if __name__ == "__main__":
    main()
