import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function Home() {
    return (
        <Container>
            <Row>
                <Col className="fw-bold display-3 text-center">
                    Welcome to Cat Steve's!
                </Col>
            </Row>
            <Row>
                <Col className="h4 text-center">
                    We're here for all your fishing needs!
                </Col>
            </Row>
        </Container>
    )
}
