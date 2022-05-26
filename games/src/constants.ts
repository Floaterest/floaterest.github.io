const material = (id: string) => `<span class="material-icons">${id}</span>`;
const bootstrap = (id: string) => `<i class="bi bi-${id}"></i>`;

export const config = {
	key: 'games',
	storage: {
		Minesweeper: {
			width: 10,
			height: 10,
			density: 10,
		}
	}
};

export const navs = {
	top: {
		Games: {
			icon: material('sports_esports'),
			swap: true,
			style: 'color: var(--accent)',
			href: '/',
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
