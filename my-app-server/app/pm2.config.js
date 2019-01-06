module.exports = {
  apps : [
      {
        name: "myapp",
        script: "./server/index.js",
        watch: true,
        env: {
            "NODE_ENV": "localhost"
        },
        env_development: {
          "NODE_ENV": "development"
        },
        env_production: {
            "NODE_ENV": "production",
        }
      }
  ]
}