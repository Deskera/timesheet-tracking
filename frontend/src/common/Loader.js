import React from 'react';
import styled from 'styled-components';
import { images } from '../common/CommonUtils';

const ParentLoader = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
`
function Loader() {
    return(
        <ParentLoader>
            <img src={images["loader.svg"].default} className="" width="50" style={{opacity: '1'}} />
        </ParentLoader>
    )
}

export default Loader;