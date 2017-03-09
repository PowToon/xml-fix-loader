var fs = require('fs')
var path = require('path')
var assign = require('object-assign')
var expect = require('expect.js')
var webpack = require('webpack')
var rimraf = require('rimraf')

describe('xml-fix-loader', function () {
  'use strict'

  this.timeout(10000)

  var outputDir = path.resolve(__dirname, './output')
  var bundleFileName = 'bundle.js'
  var bundleFileSrc = path.join(outputDir, bundleFileName)

  beforeEach(function (done) {
    rimraf(outputDir, done)
  })

  describe('simple usage', function () {
    it('should fix a svg without attribute quotes', function (done) {
      var config = {
        context: path.resolve(__dirname, '../'),
        entry: './test/input/test.js',
        output: {
          path: outputDir,
          filename: bundleFileName
        },
        resolve: {
          extensions: ['.js', '.svg'],
          modules: ['node_modules']
        },
        module: {
          rules: [
            {
              test: /\.svg$/,
              use: [
                { loader: 'file-loader' },
                { loader: '.' }
              ]
            }
          ]
        }
      }

      webpack(config, function (err) {
        expect(err).to.be(null)

        fs.readdir(outputDir, function(err, folder){
          expect(err).to.be(null)

          var svgs = folder.filter(function(fileName){
            return /\.svg$/.test(fileName)
          })

          expect(svgs.length).to.be(1)

          fs.readFile(path.join(outputDir, svgs[0]), function(err, file){
            expect(err).to.be(null)

            expect(/width="20px"/.test(file)).to.be(true)

            done()
          })
        })
      })
    })
  })
})