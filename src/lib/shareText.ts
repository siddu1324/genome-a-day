import type { Specimen } from "@/types/specimen";

export function getLinkedInPost(specimen: Specimen): string {
  return specimen.linkedInPost;
}

export function getLinkedInShareUrl(url: string): string {
  const shareUrl = new URL("https://www.linkedin.com/sharing/share-offsite/");
  shareUrl.searchParams.set("url", url);
  return shareUrl.toString();
}
