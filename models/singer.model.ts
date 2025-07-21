import mongoose from "mongoose";
import slug from "mongoose-slug-updater"


mongoose.plugin(slug)
const singerSchema = new mongoose.Schema(
    {
        fullName: String,
        avatar: String,
        status: String,
        slug: String,
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const Singer = mongoose.model("Singer", singerSchema, "singer");

export default Singer;