import yargs from 'yargs/yargs'

const {hideBin} = require('yargs/helpers') // TODO: Figure out why this won't work as an import
const argv = yargs(hideBin(process.argv)).argv

export const downloadData = !argv.noDownload

export const downloadBrickset = !argv.noBrickset
