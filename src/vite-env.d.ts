/// <reference types="vite/client" />
// env.d.ts
export { }

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare global {
    interface Window {
        __PINIA_STATE__?: Record<string, any>
    }
}


interface ImportMetaEnv {
    readonly VITE_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}å