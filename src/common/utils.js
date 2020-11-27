exports.makeConstants = a => a.reduce((m, v) => {
  m[v] = v
  return m
}, {})

