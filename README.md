# IM531 Vue project

## Description

We want to build a crypto dashboard by talking to the various apis provided in the web. There are varius 
open source projects for building GraphQL apis on top of existing crypto rest apis. We intent to use one
of those projects to integrate GraphQL.

The dashboard should provide an overview over all available crypto-currencies. Each currency should have 
a detail page that shows more detailed informations.

This application is also a PWA and it looks as good on mobile devices as on the desktop.

## Backend
For out backend we forked the basic implementation of https://github.com/Onra/graphql-coinmarketcap and 
extended it to our needs. Additionally we also switched the backend to use the newer API of coinarketcap
to ensure the project would also work after november, when v1 of the api gets put out of service.

Our fork can be found at: https://github.com/mayrmax/graphql-coinmarketcap

## Frontend
A working version of our Frontend is available under: https://cryptodash.zaunermax.at

### Contributors

Maximilian [Lucas Manfred] Mayr|Zauner
