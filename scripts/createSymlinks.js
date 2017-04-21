import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'

const LINK_DIR = path.resolve( __dirname, '../node_modules/sym' )
const LINK_TARGET_DIR = path.resolve( __dirname, '..' )

const SYMLINK_NAMES = [
  'configuration',
  'source'
]

rimraf.sync( LINK_DIR )
fs.mkdirSync( LINK_DIR )

SYMLINK_NAMES.forEach( linkName => {
  const linkPath = `${LINK_DIR}/${linkName}`
  const linkTarget = `${LINK_TARGET_DIR}/${linkName}`
  fs.symlinkSync( linkTarget, linkPath, 'dir' )
})
