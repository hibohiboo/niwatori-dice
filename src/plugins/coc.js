const { createVerbose } = require('../index')

module.exports = {
  'ccb<=': {
    priority: -1,
    fn(a) {
      const { rand, verbose } = this;
      const res = rand.next().value % 100 + 1
      let text = ''
      if (res <= 5) {
        text = 'Critical!!'
      }
      if (res <= a * 0.1) {
        text = 'Special!'
      }
      if (res >= 96) {
        text = 'Fumble!!'
      }
      verbose.push(createVerbose(
        'dice',
        `ccb<=${a}`,
        res,
        text
      ))
      return res <= a
    }
  },
  'res': {
    priority: -1,
    fn(_a) {
      const { rand, verbose } = this;
      const a =  50 + _a * 5
      const b = rand.next().value % 100 + 1
      verbose.push(createVerbose(
        'evaluation',
        `res(${_a})`,
        a >= b,
        `${a}%`
      ))
      return a >= b
    }
  }
}