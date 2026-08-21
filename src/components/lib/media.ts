const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg|mov)(?:[?#]|$)/i;

export function isVideoFile(src: string): boolean {
  return VIDEO_FILE_PATTERN.test(src);
}
