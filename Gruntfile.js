module.exports = function(grunt) {
    var makeTv4Options=function(baseSchema) {
        var fs=require('fs');
        return {
                  root: grunt.file.readJSON(baseSchema),
                  multi: true,
                  add: grunt.file.expand("schema/*.json").map(function(d) { return grunt.file.readJSON(d);})
//                  schemas: {
//                      "http://ozoneplatform.org/jsonschema/hal-schema.json" : grunt.file.readJSON('schema/hal-schema.json'),
//                      "http://ozoneplatform.org/jsonschema/ozp-iwc-base.json" : grunt.file.readJSON('schema/ozp-iwc-base.json')
//                  }
              };
    };
    var config={
      jsonlint: {
          sample: {
              src: ['mock/**/*.json','schema/**/*.json']
          }
      },
      tv4: {
          validateSchemas: {
            //validate that the schema documents themselves are valid
            options: {
                root: grunt.file.readJSON('schema/json-schema-draft-04.json'),
                schemas: {
                    'http://json-schema.org/draft-04/schema#': grunt.file.readJSON('schema/json-schema-draft-04.json')
                },
                banUnknown: false
            },
            src: 'schema/*.json'
          },
          applicationSchema: {
              options: makeTv4Options('schema/vnd.ozp-application-v1+json.json'),
              src: 'mock/api/application/v1/*/*.json'
          },
          dataSchema: {
              options: makeTv4Options('schema/vnd.ozp-iwc-data-object-v1+json.json'),
              src: ['mock/api/data/**/*.json','!mock/api/data/v1/exampleUser/index.json']
          },
          intentSchema: {
              options: makeTv4Options('schema/vnd.ozp-iwc-intent-handler-v1+json.json'),
              src: 'mock/api/intents/v1/*/*/*/index.json'
          },
          applicationLibrarySchema: {
              options:makeTv4Options('schema/vnd.ozp-library-v1+json.json'),
              src: 'mock/api/profile/*/library/vnd.ozp-library-v1+json.json'
          },
          applicationLibraryEntrySchema: {
              options:makeTv4Options('schema/vnd.ozp-library-entry-v1+json.json'),
              src: 'mock/api/profile/*/library/vnd.ozp-library-entry-v1+json.json'
          },
          applicationLibraryEntriesSchema: {
              options:makeTv4Options('schema/vnd.ozp-library-entries-v1+json.json'),
              src: 'mock/api/profile/*/library/vnd.ozp-library-entries-v1+json.json'
          },
          profileSchema: {
              options:makeTv4Options('schema/vnd.ozp-profile-v1+json.json'),
              src: 'mock/api/profile/*/vnd.ozp-profile-v1+json.json'
          },
          profilesSchema: {
              options:makeTv4Options('schema/vnd.ozp-profiles-v1+json.json'),
              src: 'mock/api/profile/vnd.ozp-profiles-v1+json.json'
          },
          organizationsSchema: {
              options:makeTv4Options('schema/vnd.ozp-organizations-v1+json.json'),
              src: 'mock/api/profile/*/stewarded-organizations/vnd.ozp-organizations-v1+json.json'
          },
          organizationSchema: {
              options:makeTv4Options('schema/vnd.ozp-organization-v1+json.json'),
              src: 'mock/api/profile/*/stewarded-organizations/vnd.ozp-organization-v1+json.json'
          },
          itemCommentsSchema: {
              options:makeTv4Options('schema/vnd.ozp-listing-comments-v1+json.json'),
              src: 'mock/api/listing/*/itemComment/vnd.ozp-listing-comments-v1+json.json'
          },
          itemCommentSchema: {
              options:makeTv4Options('schema/vnd.ozp-listing-comment-v1+json.json'),
              src: 'mock/api/listing/*/itemComment/vnd.ozp-listing-comment-v1+json.json'
          },
          listingActivitiesSchema: {
              options:makeTv4Options('schema/vnd.ozp-listing-activities-v1+json.json'),
              src: 'mock/api/listing/**/vnd.ozp-listing-activities-v1+json.json'
          },
          imageSchema: {
              options:makeTv4Options('schema/vnd.ozp-image-ref-v1+json.json'),
              src: 'mock/api/image/**/vnd.ozp-image-ref-v1+json.json'
          },
          listingSchema: {
              options:makeTv4Options('schema/vnd.ozp-listing-v1+json.json'),
              src: 'mock/api/listing/**/vnd.ozp-listing-v1+json.json'
          },
          listingsSchema: {
              options:makeTv4Options('schema/vnd.ozp-listings-v1+json.json'),
              src: 'mock/api/listing/**/vnd.ozp-listings-v1+json.json'
          },
          filteredListingsSchema: {
              options:makeTv4Options('schema/vnd.ozp-listings-filtered-v1+json.json'),
              src: 'mock/api/listing/**/vnd.ozp-listings-filtered-v1+json.json'
          }
      }
    };
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig(config);

    // Default task(s).
    grunt.registerTask('default', ['jsonlint','tv4']);

};
