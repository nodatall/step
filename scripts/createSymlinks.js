import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'

const LINK_DIR = path.resolve( __dirname, '../node_modules/sym' )
const LINK_TARGET_DIR = path.resolve( __dirname, '..' )

const SYMLINK_NAMES = [
  'configuration',
  'source'
]

console.log( 'Deleting dir:', LINK_DIR ) // eslint-disable-line
rimraf.sync( LINK_DIR )

console.log( 'Creating dir:', LINK_DIR ) // eslint-disable-line
fs.mkdirSync( LINK_DIR )

console.log( 'Creating symlinks' ) // eslint-disable-line
SYMLINK_NAMES.forEach( linkName => {
  const linkPath = `${LINK_DIR}/${linkName}`
  const linkTarget = `${LINK_TARGET_DIR}/${linkName}`
  console.log( 'linkPath:', linkPath ) // eslint-disable-line
  console.log( 'linkTarget:', linkTarget ) // eslint-disable-line
  fs.symlinkSync( linkTarget, linkPath, 'dir' )
})
