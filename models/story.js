const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StorySchema = new Schema({
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    note: {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  });
  
  const Story = mongoose.model("Story", StorySchema);
  
  module.exports = Story;