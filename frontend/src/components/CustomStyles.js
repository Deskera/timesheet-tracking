import React from 'react';
import styled from 'styled-components';
// import logo1 from '/assets/images/logo.png'

const Centered = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.alone ? '38vw' : '70vw'};
    max-width: ${props => props.alone ? '800px' : '1200px'};
    ${'' /* max-height: 70vh; */}
    ${'' /* background-color: blue; */}
    ${'' /* padding: 100px; */}

    @media only screen and (max-width: 960px) {
        width: ${props => props.alone ? '60vw' : '90vw'};
    }
`

const ParentCard = styled.div`
    ${'' /* background-color: red; */}
    box-shadow: 10px 10px 20px #888888;
    border-radius: 20px;
    ${'' /* width: ${props => props.alone ? '40vw' : ''}; */}
    margin: 0 auto;
`

const Card = styled.div`
    border-radius: ${props => props.left ? '20px 0px 0px 20px' : props.right ? '0px 20px 20px 0px' : '20px'};
    ${'' /* opacity: ${props => props.right ? '0.5' : '1'}; */}
    background-image: ${props => props.left ? '' : 'linear-gradient(to right, #98fcbd, #9cdaf8)'};
`

const Panel = styled.h2`
    font-size: min(2.8vw, 30px);
    font-family: Cursive;
`

const FieldFeedback = styled.div`
    position: absolute;
    font-size: 14px;
    color: red;
`

const WrapperInput = styled.div`
    height: 45px;
    border-radius: 4px;
    box-shadow: ${props => props.valid ? '0 0 0 1pt green' : props.invalid ? '0 0 0 1pt red' : ''};
`

function LogoCard(props) {

    return (

        <Card left className="col-6 text-center bg-white d-flex flex-column justify-content-center align-items-center">
            <img src="/assets/images/logo-red.png" alt="Deskera logo"
                className="mt-3 mb-5"
                style={{ width: "70%", maxWidth: '400px', height: '70px', objectFit: 'cover' }}
            />
            {
                props.login ?
                    <div className="px-5">
                        <h3 className="display-6" style={{ fontSize: '25px', fontWeight: "400" }}>
                            Make Every Customer Interaction Profitable
                        </h3>
                        <ul className="display-6 mb-5" style={{ fontSize: '20px', textAlign: 'left' }}>
                            <li>Powerful and intuitive suite of business solutions.</li>
                            <li>Makes digital transformation simple</li>
                        </ul>
                    </div>
                    :
                    <div className="px-5">
                        <h3 className="display-6" style={{ fontSize: "25px", fontWeight: "400" }}>
                            All-in-One Platform to Run Your Business.
                        </h3>
                        <h4 className="display-6 mb-5" style={{ fontSize: '20px' }}>
                            Integrated Accounting, CRM & HR Software for Business Growth
                        </h4>
                    </div>


            }
            <Panel className="mb-4">Admin Panel</Panel>
        </Card>
    );
}

export default LogoCard;
export { Centered, ParentCard, Card, FieldFeedback, WrapperInput };