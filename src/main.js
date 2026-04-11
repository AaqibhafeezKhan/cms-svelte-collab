import App from './CollabApp.svelte';

let app;

export async function bootstrap(props) {
}

export async function mount(props) {
  app = new App({
    target: props.domElement || document.getElementById('single-spa-container') || document.body,
    props: {
        name: props.name
    }
  });
}

export async function unmount(props) {
  if (app) {
    app.$destroy();
  }
}
