import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    {{#each fields}}
    {{#if this.name}}
    {{this.name}}: { type: {{~#toFUpperCase~}}{{~this.type~}}{{~/toFUpperCase~}} },
    {{/if}}
    {{/each}}
    deletedAt: Date

  },
  { collection: '{{#toLowerCase}}{{filename}}{{/toLowerCase}}s',timestamps: true }
);



const User = mongoose.model("User", userSchema);
export default User;
