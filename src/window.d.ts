declare global {
  interface Window {
    gtag: (key: string, trackingId: string, config: any) => void
  }
}

export {};