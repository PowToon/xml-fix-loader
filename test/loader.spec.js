var fs = require('fs')
var path = require('path')
var assign = require('object-assign')
var expect = require('expect.js')
var webpack = require('webpack')
var rimraf = require('rimraf')

var xmlFixLoader = require('../index')

describe('xml-fix-loader', function () {
  'use strict'

  this.timeout(10000)

  var outputDir = path.resolve(__dirname, './output')
  var bundleFileName = 'bundle.js'
  var bundleFileSrc = path.join(outputDir, bundleFileName)

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
          extensions: ['.js', 'svg'],
          modules: ['node_modules']
        },
        module: {
          rules: [
            {
              test: /\.svg/,
              use: [
                { loader: 'file-loader' },
                xmlFixLoader
              ]
            }
          ]
        }
      }

      webpack(config, function (err) {
        expect(err).to.be(null)
        done()
        // fs.readFile(defaultAssetListFile, function(err, fileListData){
        //   fileListData = fileListData.toString()
        //   var fileListLines = fileListData.split('\n')
        //
        //   expect(fileListLines.length).to.be(2)
        //
        //   fs.readFile(bundleFileSrc, function(err, bundleFileData){
        //     bundleFileData = bundleFileData.toString()
        //
        //     fileListLines.forEach(function(line){
        //
        //       expect(line.indexOf('.png')).to.not.be(-1)
        //
        //       expect(bundleFileData.indexOf(line)).to.not.be(-1)
        //
        //     })
        //
        //     done()
        //   })
        // })
      })
    })
  })
})