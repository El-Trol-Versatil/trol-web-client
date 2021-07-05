export const prodConfig = {
  "$environment": {
    "name": "Production",
    "isProduction": true
  },
  "appInfo": {
    "id": "com.etv.front"
  },
  "html5BaseHref": "/",
  "$apiConfig": {
    "domainURLEndPoint": "localhost:3000",
    "isHttpsProtocol": false,
    "apiBaseEndpoint": "api/",
    "apiVersion": "",
    "jwtBlacklistedRoutes": []
  }
}

export const devConfig = {
  "$environment": {
    "name": "Development",
    "isProduction": false
  },
  "appInfo": {
    "id": "com.etv.front.dev"
  },
  "html5BaseHref": "/",
  "$apiConfig": {
    "domainURLEndPoint": "localhost:3000",
    "isHttpsProtocol": false,
    "apiBaseEndpoint": "api/",
    "apiVersion": "",
    "jwtBlacklistedRoutes": []
  }
}