<script lang="ts">
    import type { Repo } from './lib/repo';
    import Repository from './lib/Repository.svelte';
    import LayoutGrid from '@smui/layout-grid';

    export let user: string;
    const url = `https://api.github.com/users/${user}/repos`;

    async function api(){
        const res = await fetch(url);
        const repos: Repo[] = await res.json();
        if(res.ok){
            return repos.sort((a, b) => Number(a.pushed_at < b.pushed_at));
        }else{
            throw new Error(JSON.stringify(repos));
        }
    }
</script>

<main>
    {#await api()}
        waiting
    {:then repos}
        <LayoutGrid>
            {#each repos as repo}
                <Repository {repo}/>
            {/each}
        </LayoutGrid>
    {:catch err}
        {err.message}
    {/await}
</main>

<style lang="sass">
</style>
