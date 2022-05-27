<script lang="ts">
	import { config, navs } from './constants';

	import { LocalStorage as Settings, Nav } from '@floaterest/sv';
	import Minesweeper from './Minesweeper.svelte';
	import Games from './Games.svelte';

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

	console.log(navs);
</script>

<Nav {...navs} bind:selected/>
<svelte:component {...props(selected)} this="{components[selected]}"/>

<style lang="sass">
    @use '../node_modules/@floaterest/sv/src/styles/icons'
    @use '../node_modules/@floaterest/sv/src/styles/html'
</style>
