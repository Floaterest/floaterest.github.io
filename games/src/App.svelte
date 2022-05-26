<script lang="ts">
	import { config, navs } from './constants';

	import { LocalStorage as Settings, Nav } from '@floaterest/sv';
	import Minesweeper from './Minesweeper.svelte';
	import Games from './Games.svelte';

	import '../node_modules/@floaterest/sv/src/monokai.css';
	import '../node_modules/@floaterest/sv/src/icons.css';


	const components = {
		Minesweeper,
		Games,
		Settings,
	};

	let selected = components[0];

	if(!(config.key in localStorage)){
		localStorage.setItem(config.key, JSON.stringify(config.storage));
	}

	function props(s: string){
		if(s === 'Settings'){
			return { ...config, style: 'font-family: consolas, monospace;' };
		}else{
			return JSON.parse(localStorage.getItem(config.key))[selected];
		}
	}
</script>

<main>
    <Nav {...navs} bind:selected/>
    <svelte:component {...props(selected)} this="{components[selected]}"/>
</main>
