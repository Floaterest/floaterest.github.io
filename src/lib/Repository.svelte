<script lang="ts">
    import type { Repo } from './repo';
    import { Cell } from '@smui/layout-grid';

    export let repo: Repo;
    const {
        full_name, description,
        html_url: href, homepage
    } = repo;
    const [user, name] = full_name.split('/');
    const target = '_blank';
    const title = 'Homepage';
</script>


<Cell class="mdc-elevation--z24">
    <div class="links">
        <a {href} {target}><span class="user">{user}/</span>{name}</a>
        {#if homepage}
            <a href={homepage} {title} {target} class="material-icons-round">launch</a>
        {/if}
    </div>
    <div>{description}</div>
</Cell>

<style lang="sass">
    @use '../colors' as *
    .user
        color: var(--dark)
    .links
        display: flex
        width: 100%
        :not(.material-icons-round)
            flex: 1
    .material-icons-round
        color: unset
        &:hover
            text-decoration: none
</style>

