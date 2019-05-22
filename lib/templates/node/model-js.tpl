const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var {{#toLowerCase}}{{filename}}{{/toLowerCase}}Schema = new Schema({

    {{#each fields}}
    {{#if this.name}}
    {{this.name}}: { type: {{~#toFUpperCase~}}{{~this.type~}}{{~/toFUpperCase~}} },
    {{/if}}
    {{/each}}
    deletedAt: Date

},{ collection: '{{#toLowerCase}}{{filename}}{{/toLowerCase}}s', timestamps: true  });


module.exports = mongoose.model('{{#toFUpperCase}}{{filename}}{{/toFUpperCase}}', {{#toLowerCase}}{{filename}}{{/toLowerCase}}Schema);
