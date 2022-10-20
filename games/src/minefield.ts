/**
 * adjacent empty mine flag open
 *   000     0    0    0    0
 */
export enum Tile{
	Opened = 0b00001,
	Flagged = 0b00010,
	Mine = 0b00100,
	/**
	 * has no mine around
	 */
	Empty = 0b01000,
	Adjacent = 0b10000,
}

export type TileType = {
	opened: number,
	flagged: number,
	mine: number,
	empty: number,
	adjacent: number,
}

export const totile = (t: number) => ({
	opened: t & Tile.Opened,
	flagged: t & Tile.Flagged,
	mine: t & Tile.Mine,
	empty: t & Tile.Empty,
	adjacent: ((t / Tile.Adjacent) | 0) + 1,
} as TileType);

/**
 * shuffle LAST n items in a using Fisher-Yates shuffle algorithm
 * https://bost.ocks.org/mike/shuffle/
 * @param a
 * @param n
 */
function shuffle(a: any[], n: number){
	let len = a.length, i: number;
	while(n--){
		// pick a remaining element and swap them
		i = Math.floor(Math.random() * len--);
		[a[i], a[len]] = [a[len], a[i]];
	}
}

export class Minefield{
	width: number;
	height: number;
	density: number;
	// number of non-mines
	count: number = 0;
	dead = false;
	won = false;
	field: number[];
	delta: number[];

	constructor(w: number, h: number, d: number){
		// avoid invalid density
		d = Math.abs(d % 100);

		[this.width, this.height, this.density] = [w, h, d];
		this.delta = [-w - 1, -w, -w + 1, -1, 1, w - 1, w, w + 1];
		// init empty field
		this.field = Array(this.width * this.height).fill(0);
	}

	/**
	 * get adjacent tiles
	 */
	adjacent(at: number, cond: (t: number, i: number) => boolean | number){
		let t: number;
		return this.delta.map(d => at + d).filter(i => {
			// if at is (0, y) and delta is going left
			if(at % this.width == 0 && i % this.width == this.width - 1) return false;
			// if at is (width - 1, y) and delta is going right
			if(at % this.width == this.width - 1 && i % this.width == 0) return false;

			return (t = this.field[i]) !== undefined && cond(t, i);
		});
	}

	/**
	 * generate mines at index
	 * @param at start position
	 * @return number of non-mine tiles
	 */
	generate(at: number): number{
		const n = ((this.width * this.height - 9) * this.density / 100) | 0;
		// generate indices expect the 3x3 at clicked index
		const safe: Set<number> = new Set([
			at,
			...this.delta.map(d => at + d)
		]);
		// generate potential mine coords
		const indices: number[] = [...Array(this.width * this.height).keys()].filter(i => !safe.has(i));
		shuffle(indices, n);
		const mines: Set<number> = new Set(indices.slice(indices.length - n));
		// set mines
		this.field.forEach((_, i) => this.field[i] |= +mines.has(i) * Tile.Mine);
		// count adjacent mines
		let adj: number;
		this.field.forEach((tile, i) => {
			if(tile & Tile.Mine) return;
			if((adj = this.adjacent(i, (t, _) => t & Tile.Mine).length)){
				// console.log(adj, ((adj - 1) * Tile.Adjacent).toString(2));
				this.field[i] |= (adj - 1) * Tile.Adjacent;
			}else{
				this.field[i] |= Tile.Empty;
			}
		});

		return this.width * this.height - n;
	}

}
