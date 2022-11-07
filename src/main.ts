import './app.sass';
import App from './App.svelte';

export default new App({
    target: document.body,
    props: { user: 'floaterest' }
});
