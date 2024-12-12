module.exports = {
  apps: [{
    name: "arboloteca-be",
    cwd: "./server",
    script: "npm",
    args: "run start",
    env: {
      NODE_ENV: "production"
    }
  },
  {
    name: "plantateca-fe",
    cwd: "./client",
    script: "npm",
    args: "run preview --host",
    env: {
      NODE_ENV: "production"
    }
  }
  ]
}
