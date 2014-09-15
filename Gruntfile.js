module.exports = function(grunt) {
    
    var config={
      jsonlint: {
          sample: {
              src: ['mock/**/*.json']
          }
      },
      tv4: {
          applicationSchema: {
              options: { 
                  root: grunt.file.readJSON('schema/vnd.ozp-application-v1+json.json'),
                  multi: true,
                  schemas: {
                      "http://ozoneplatform.org/jsonschema/hal-schema.json" : grunt.file.readJSON('schema/hal-schema.json'),
                      "http://ozoneplatform.org/jsonschema/ozp-iwc-base.json" : grunt.file.readJSON('schema/ozp-iwc-base.json')
                  }
              },
              src: 'mock/api/application/v1/*/*.json'
          }
      }
    };
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig(config);

    // Default task(s).
    grunt.registerTask('default', ['jsonlint','tv4']);

};
