<script lang="ts">
	import { components, key, navs, storage } from './constants';

	import { Nav } from '@floaterest/sv';

	import '../node_modules/@floaterest/sv/src/monokai.css';
	import '../node_modules/@floaterest/sv/src/icons.css';


	let selected = components[0];

	function config(subkey: string): string{
		if(!(key in localStorage)) localStorage.setItem(key, JSON.stringify(storage));
		return JSON.parse(localStorage.getItem(key))[subkey];
	}
</script>

<main>
    <Nav {...navs} bind:selected/>
    <svelte:component {...config(selected)} this="{components[selected]}"/>
</main>
