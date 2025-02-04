/// <reference types="vite/client" />
// env.d.ts
export { }

declare global {
    interface Window {
        __PINIA?: string
    }
}

