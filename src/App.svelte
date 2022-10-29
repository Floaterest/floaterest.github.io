<script lang="ts">

    async function get(){
        const res = await fetch('https://api.github.com/users/floaterest/repos');
        const json = await res.json();
        if(res.ok){
            return json;
        }else{
            throw new Error(json);
        }
    }
</script>

<main>
    {#await get()}
        waiting
    {:then json}
        <ul>
            {#each json as { name, description }}
                <li>{name}: {description}</li>
            {/each}
        </ul>
    {:catch err}
        {err.message}
    {/await}
</main>

<style lang="sass">
</style>
