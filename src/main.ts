import App from './CollabApp.svelte';

let app: App;

export async function bootstrap(props: any): Promise<void> {
  // Bootstrap logic
}

export async function mount(props: any): Promise<void> {
  app = new App({
    target: props.domElement || document.getElementById('single-spa-container') || document.body,
    props: {
        name: props.name
    }
  });
}

export async function unmount(props: any): Promise<void> {
  if (app) {
    app.$destroy();
  }
}
