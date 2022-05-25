<script lang="ts">
	import { Minefield, Tile, totile } from './minefield';

	export let width = 10;
	export let height = 10;
	export let density = 10;

	const f = new Minefield(width, height, density);
	const row = [...Array(height)];
	const col = [...Array(width)];

	async function open(at: number){
		// do nothing if game over or already open
		if(f.dead || f.won || f.field[at] & Tile.Opened) return;
		// generate mines if not yet
		if(!f.count) f.count = f.generate(at);

		// bfs
		const queue = [at];
		let tile: number;
		while(queue.length){
			at = queue.shift()!;
			tile = f.field[at];
			// open tile
			await new Promise(r => setTimeout(r, 100));
			f.field[at] |= Tile.Opened;
			// if touches mine
			if(tile & Tile.Mine){
				f.dead = true;
				// open all tiles
				return f.field.forEach((_, i) => f.field[i] |= Tile.Opened);
			}

			// remove flag
			f.field[at] &= ~Tile.Flagged;
			// if all non-mine tiles are opened
			if(!--f.count){
				console.log('won');
				return f.won = true;
			}
			// if no adjacent mines
			if(tile & Tile.Empty){
				queue.push(...f.adjacent(
					at,
					(t, i) => !(queue.includes(i) || t & Tile.Opened || t & Tile.Flagged)
				));
			}
		}
	}

</script>
<svelte:head>
    <title>Minesweeper</title>
</svelte:head>

<div id="field">
    {#each ((i) => row.map(_ => col.map(_ => ({i, ...totile(f.field[i++])}))))(0) as r}
        <div class="row">
            {#each r as {opened, flagged, empty, adjacent, mine, i}}
                <code class="tile" on:click={()=>open(i)}
                      class:mine class:opened class:flagged>
                    {empty ? '' : adjacent}
                </code>
            {/each}
        </div>
    {/each}
</div>

<style lang="less">
    #field{
        border: var(--accent) 1px solid;
        display: inline-flex;
        flex-direction: column;
    }

    .row{
        display: inherit;
    }

    .tile{
        user-select: none;
        width: var(--icon-size);
        height: var(--icon-size);

        display: flex;
        justify-content: center;
        align-items: center;

        &.mine.opened{
            color: var(--red);
            background-color: var(--red);
        }

        &:not(.opened):not(.flagged){
            background-color: var(--accent);
            color: var(--accent);
        }
    }
</style>
