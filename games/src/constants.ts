import Games from './Games.svelte';
import Minesweeper from './Minesweeper.svelte';
import Settings from './Settings.svelte';

export const key = 'games';

export const storage = {
	Minesweeper: {
		width: 10,
		height: 10,
		density: 10,
	}
};

const material = (id: string) => `<span class="material-icons">${id}</span>`;
const bootstrap = (id: string) => `<i class="bi bi-${id}"></i>`;

export const navs = {
	top: {
		Games: {
			icon: material('sports_esports'),
			swap: true,
			style: 'color: var(--accent)'
		},
		Minesweeper: {
			icon: material('settings_applications')
		},
		Arithmetic: {
			icon: material('calculate')
		},
		Flip: {
			icon: material('flip')
		},
	},
	bottom: {
		Settings: {
			icon: material('storage')
		},
		GitHub: {
			icon: bootstrap('github'),
			href: 'https://github.com/Floaterest/'
		}
	}
};

export const components = {
	Games,
	Minesweeper,
	Settings,
};
