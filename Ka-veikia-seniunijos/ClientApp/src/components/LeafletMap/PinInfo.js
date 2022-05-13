import React,{Component, useState} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class PinInfo extends Component{
    constructor(props){
        super(props);
    }

    

    render(){     

        const customStyles = {
            backdrop: 'static',
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          };
        return (
            <div className="container">
            <Modal 
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            style={customStyles}
            centered

            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.type+": " +this.props.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.description}</p>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>

            </Modal>

            </div>
        )
    }
}