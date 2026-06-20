export function unsplashUrl(photoId: string, width: number = 800): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}
