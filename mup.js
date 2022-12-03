
module.exports = {
  servers: {
      one: {
          // TODO: set host address, username, and authentication method
          host: '84.46.246.156',
          username: 'root',
          password:"Esger2048"
          // pem: './path/to/pem'
          // password: 'Asim-211'
          // or neither for authenticate from ssh-agent
      },

  },

  meteor: {
      // ssl: {
      //     crt: './bundle.crt', // this is a bundle of certificates
      //     key: './private.key', // this is the private key of the certificate
      //     port: 443 // 443 is the default value and it's the standard HTTPS port
      // },
      // TODO: change app name and path
      name: 'app',
      path: './',

      servers: {
          one: {}
      },

      buildOptions: {
          serverOnly: true,
      },
      // "scripts": {"meteor": "MONGO_URL=mongodb://<USER>:<PASSWORD>@<SERVER>:<PORT>/<DB> meteor"}

      env: {
          // TODO: Change to your app's url
          // If you are using ssl, it needs to start with https://
          ROOT_URL: 'https://84.46.246.156',
          PORT: 3000,
          MONGO_URL: 'mongodb://84.46.246.156:27017/bms',
      },

      volumes: {
       
      },

      docker: {
          // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
          //  image: 'abernix/meteord:base',
          image: "zodern/meteor:root",
          buildInstructions: [
              'RUN apt-get update && apt-get install -y graphicsmagick'
          ],
          // imagePort: 80, // (default: 80, some images EXPOSE different ports)
          args: [
              '-e',
              'VIRTUAL_HOST=request.cubicsbms.com,landau.cubicsbms.com'
          ]
      },

      // This is the maximum time in seconds it will wait
      // for your app to start
      // Add 30 seconds if the server has 512mb of ram
      // And 30 more if you have binary npm dependencies.
      deployCheckWaitTime: 90,
      deployCheckPort: 3000,
      // Show progress bar while uploading bundle to server
      // You might need to disable it on CI servers
      enableUploadProgressBar: true
  }
};