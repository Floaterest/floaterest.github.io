<script lang="ts">
	function cube(n: number): boolean{
		// i ∈ ℕ
        // (i-1)³ < n
        // b = 3i² - 3i
        // c = i³
		let [c, b, i] = [0, 0, 0];
		while(c < n){
			b += 6 * i;
			c += b + 1;
			i++;
		}
		return n == c;
	}

	let value = '0';
	$: valid = value && Number.isInteger(+value);
</script>

<input type="text" bind:value> is
{#if !valid || !cube(+value)} not{/if}
{#if valid} a cube{:else} an integer{/if}

<style lang="sass">
    @use '../vars' as *
    input
        font-family: $mono
        width: 3em
        border: 1px solid $white
        padding: 0.2em
        margin-right: 0.2em
</style>