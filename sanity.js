import { createClient } from "@sanity/client";
import imageBuilderUrl from "@sanity/image-url";

const client = createClient({
  projectId: "cgqwdj0z",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = imageBuilderUrl(client);
export const urlFor = (source) => builder.image(source);
export default client;
