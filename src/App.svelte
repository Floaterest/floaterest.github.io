<script lang="ts">
    import type { Repo } from './lib/repo';
    import Repository from './lib/Repository.svelte';
    import LayoutGrid from '@smui/layout-grid';

    export let user: string;
    const url = `https://api.github.com/users/${user}/repos`;
    let title = 'Floaterest';
    let params = '';
    window.onblur = () => [title, params] = ['( ･ิ ω ･ิ )', '?duration=10',];
    window.onfocus = () => [title, params] = ['Floaterest', ''];

    async function api(){
        const res = await fetch(url);
        const repos: Repo[] = await res.json();
        if(res.ok){
            return repos.sort((a, b) => Number(a.pushed_at < b.pushed_at));
        }else{
            throw new Error(JSON.stringify(repos, null, 4));
        }
    }

    $: href = `https://pentadecagon.vercel.app/api${params}`;
</script>

<svelte:head>
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" {href}/>
</svelte:head>
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
        <pre class="err">{err.message}</pre>
    {/await}
</main>

<style lang="sass">
    .err
        color: var(--pink)
</style>
