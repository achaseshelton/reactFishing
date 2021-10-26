import React, { useState, useEffect } from 'react'
import { Form, Row, Button, Col, Container } from 'react-bootstrap'
import axios from 'axios'
import statedata from '../data/statedata.json'

export default function Shipping() {
    // const [state, setstate] = useState(initialState)
    const [shipping, setShipping] = useState([])
    const [customer, setCustomer] = useState({})
    const cart = [
        { item: "Spin Jig", price: 124 }, { item: "Medium Fishing Pole", price: 58 }, { item: "Golden Reel", price: 131 }
    ];

    const total = 333

    const digits_only = string => [...string].every(c => '0123456789'.includes(c));

    const zipValidation = () => {
        if (customer.zip) {
            if (digits_only(customer.zip) && customer.zip.length === 5) {
                return true
            } else {
                return false
            }
        }
    }

    const taxes = () =>{ 
        
        
        let taxValue = statedata.reduce((prev, current) => {
        console.log(prev)
        if(current.abrev === customer.state) {
            return current.tax + prev
        } return prev
    },0);
    let taxtotal = ((customer.shipping + total) * taxes()).toFixed(2)
    console.log(customer.shipping, total, taxes())
    console.log(taxtotal)
    return taxtotal


}


    const apiCall = () => {
        axios.get("https://port-3000-aincbootcampapi-ianrios529550.codeanyapp.com/api/store/shippings")
            .then(function (response) {
                setShipping(response.data);
            })
            .catch(function (error) {
            })
            .then(function () {
            });
    }

    const handleChange = e => {
        setCustomer(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
        console.log(customer)
    }
    useEffect(apiCall, [])
    return (
        <Form className="m-5 border border-dark border-2 p-3">
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="name" placeholder="First Name" id="firstName" value={customer.firstName || ""} onChange={handleChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="name" placeholder="Last Name" id="lastName" value={customer.lastName || ""} onChange={handleChange} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" id="address" value={customer.address || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" id="address2" value={customer.address2 || ""} onChange={handleChange} />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control id="city" value={customer.city || ""} onChange={handleChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue="Choose..." id="state" value={customer.state || ""} onChange={handleChange} >
                        <option>Choose...</option>
                        {statedata.map(state => <option>{state.abrev}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control className={zipValidation() ? "is-valid" : "is-invalid"} id="zip" value={customer.zip || ""} onChange={handleChange} />
                    <div className="invalid-feedback">Enter a Valid Zip Code</div>
                </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Shipping</Form.Label>
                <Form.Select id="shipping" value={customer.shipping || -1} onChange={handleChange}>
                    <option value={-1}>Choose Shipping...</option>
                    {shipping.map(item => <option value={item.cost}>{item.name} - ${item.cost}</option>)}
                </Form.Select>
            </Form.Group>
            <Container className="m-2 border border-dark border-2">
                <Row>
                    <Col className="fw-bold col-9">Total:</Col>
                    <Col className="col-3">${total.toFixed(2)}</Col>
                </Row>
                <Row>
                    <Col className="fw-bold col-9">Shipping:</Col>
                    <Col className="col-3">${customer.shipping}</Col>
                </Row>
                <Row>
                    <Col className="fw-bold col-9">Taxes:</Col>
                    <Col className="col-3">${taxes()}</Col>
                </Row>
                <Row>
                    <Col className="fw-bold col-9"> Grand Total:</Col>
                    <Col className="col-3"></Col>
                </Row>
            </Container>

            <Button variant="primary" type="submit" className="m-2">
                Payment
            </Button>
        </Form>
    )
}

