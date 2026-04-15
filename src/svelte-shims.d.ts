declare module "*.svelte" {
    import { SvelteComponentTyped } from "svelte";
    export default class extends SvelteComponentTyped<any, any, any> {
        constructor(options: any);
        $destroy(): void;
    }
}
