import React from 'react'
import {
    Grid,
    Container,

 } from '@material-ui/core'

export default function Home() {
    return (
        <div>
            <Container>
                <Grid container spacing={3} m={2} justify='center' style={{ marginTop : 50 }}>
                <h1> Mangamee </h1>
                </Grid>
            </Container>
            
        </div>
    )
}
