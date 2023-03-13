# mxinfo Configuration App

Frontend appliation for managing application configuration.

## Depends on

- mxinfo.Configuration.QueryAPI - read endpoints
- mxinfo.Configuration.ManagementAPI - create, update and delete endpoints

## Authentication Setup

The appliation uses Azure AD Authentication

### Install the required NPM packages

```
npm install @azure/msal-browser @azure/msal-react

```

### Create Azure AD App Registration with Terraform

The app registration is in the mxinfo.Configuration.API repository
