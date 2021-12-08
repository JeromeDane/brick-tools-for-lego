import colors from './colors.json'

export default colors.reduce((acc, color) =>
  Object.assign(acc, {[color.id]: color}),
  {}
)