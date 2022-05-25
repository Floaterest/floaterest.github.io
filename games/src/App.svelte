<script lang="ts">
	import { Nav } from '@floaterest/sv';
	import Games from './Games.svelte';
	import Minesweeper from './Minesweeper.svelte';

	import '../node_modules/@floaterest/sv/src/monokai.css';
	import '../node_modules/@floaterest/sv/src/icons.css';


	const material = (id: string) => `<span class="material-icons">${id}</span>`;
	const bootstrap = (id: string) => `<i class="bi bi-${id}"></i>`;

	const top = {
		key: 'Games',
		icon: material('sports_esports'),
		swap: true,
		style: 'color: var(--accent)'
	};
	const items = [
		{
			key: 'Minesweeper',
			icon: material('settings_applications')
		},
		{
			key: 'Arithmetic',
			icon: material('calculate')
		},
		{
			key: 'Flip',
			icon: material('flip')
		},
		{
			key: 'GitHub',
			icon: bootstrap('github'),
			last: true,
			href: 'https://github.com/Floaterest/'
		}
	];

	const components = {
		Games,
		Minesweeper,
	};
	let selected = 'Games';
	selected = 'Minesweeper';
	$: component = components[selected];
</script>

<main>
    <Nav {top} {items} bind:selected/>
    <svelte:component this="{component}"/>
</main>
