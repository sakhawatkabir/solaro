import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for:", file.url);
      return { uploadedBy: metadata.uploadedBy };
    }),

  productGallery: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
  })
    .middleware(async () => {
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Gallery upload complete for:", file.url);
      return { uploadedBy: metadata.uploadedBy };
    }),
};

export default ourFileRouter;
