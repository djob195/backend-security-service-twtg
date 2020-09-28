const { asValue } = require('awilix');
const {FirebaseConfig } = require("configs-twtg");
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert({
        type: 'service_account',
        project_id: 'fir-1cf45',
        private_key_id: 'f298cd76eed65240bf0479fb5357ec92ffb13308',
        private_key: '-----BEGIN PRIVATE KEY-----\n' +
          'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9wMdB8L27LL8c\n' +
          '6+IMwu0gG3Dbyq3gNnywJ1ols6HMcK7DbWi4jhj7suMFghQ+p7mgkKR9oePigI3g\n' +
          'QqAsndsW6cTPGxwpdiKIlP/KhXCQ9thGh1wj3BRHG99MDdW4e/eGcP2Y+lnLy3di\n' +
          'p5gYrlSE8+EXgIOvZp8JeUzyXvPCRTcSt0rTSf3RWbK4/k7VmAk/FcGv9Gaxlv+Y\n' +
          'IlyIdFrYmXqYB++htqoA2WFYHcnwxoZGdWh1PIrtWeVwq8TCrqL4c7sBKatdzPI2\n' +
          'UB2NccRgXR+jqyIfGSTAwJz8I8JJZr2QhfNf80WKPK/4hQlKCnsbH5m26nSUaGe7\n' +
          'xRbL6N5FAgMBAAECggEATE6hEshwVDwrYsMNNZqR506BtTGteLQQsnowy2aQk3lh\n' +
          'Hl/6M/WY4GdQ2l80KvoiMQrZy1f2H5kY9O12IlscxvsdVTgOvDGws4JP1y6QVQuf\n' +
          'b8VxbU5MrUftJVWO89COevcnVISg5c6d5QOGq643ePvmMiBRVJENNa8dHX7HwgCH\n' +
          'uaGsnmRYfpdVF+lIjtCRTfZaliLeg65sxbpKOrZFVpZL7luKSfySvC84OBo+couR\n' +
          'fHrAycx4mwuzVtcKDgDPYeBK9n3D4EH54RKMgiyIlbyqD5UecKwwoaQS819MyxEl\n' +
          'JzgGzWYboyJOmO8LHddQSBd2zqgg0ya4nZP+gbIlRQKBgQDwF9FxolXw/YJRwr8S\n' +
          'IeWMJsU6miPHuAxp1bPsu2YNAGlt8Y7snY+6+/tvl3o2qrfUg88NSkahH5XvVhre\n' +
          'npXB4pWPtcyjc3rCBQnXIBnftHB8WHFw1lxloTbPI6owRpNf1CJJoy8ClyRMJc/G\n' +
          '7O4Jz5cmCxsTUtx50Yos2qHPYwKBgQDKUyasjpKYa9SfiLktGd9iJ3sO0TkpTzmW\n' +
          '1hJQZauB3xt2H4Sh8Z65PNE8MZ9JSauxnTsit5csYBFQ7gGinLYbvR5WlvTq8wkX\n' +
          'tsNrJZ5FJMmQdPjsKOtb3MA+HrOFB7tIwErav2jbXLiAJ7Rz2HWBM63XFoELm/Hx\n' +
          'bahu2w5wNwKBgQCudzBcGbHHv//d990uiPEsKdQyJGYRsB1dHsxzHy4mDoGOQfUw\n' +
          '3cHfB1KLoZBOfzm8NNfVeX7fgHtMgs5drPF4BXXXCy2cLMMsj8q5x3rlw1HmGcK9\n' +
          'UxerRj30wZ7fG7nl7dnIlssHX9shdmyIygyjlnToUTOolBLgdrKoq2rfrwKBgBuY\n' +
          'qd7Bd5dYpeC4umE/dSujLPLBcOWEi9taCZdztqf5MXq0I9ge58JmXDe0oQBTDxsj\n' +
          '0gwTNIh19gau4AQ5EdHIwtmWr4NYcPYOFKuJrwPJV8DfY5B6qFeYTZRrhZrwiggL\n' +
          'Smp5zyiUhgnc4I0oiiZ8UQrUY/ecZqzCg0XTlS2TAoGAG3wR3nVvpeejOXqSv8iJ\n' +
          'cflrzppKBE1iaZU0pb7NzcJKBOAFJwb6mIobXyubum/dpitn6oG/Ps4OMEaWkIqR\n' +
          'wRgI/H1rXDaYJ0UmpFKdbW8+mY/TO04eEJ6/ICeNjeBypIJtjrD/EBaXCEv9mzFv\n' +
          'hRwESM7O4oHxHhleZpsNfTg=\n' +
          '-----END PRIVATE KEY-----\n',
        client_email: 'firebase-adminsdk-k5vti@fir-1cf45.iam.gserviceaccount.com',
        client_id: '113327620737020490274',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k5vti%40fir-1cf45.iam.gserviceaccount.com'     
      }
      ),
    databaseURL: FirebaseConfig.databaseURL
});
  
module.exports = function(container){
    container.register({
        adminfb: asValue(admin)
    });
}