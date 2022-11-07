<script lang="ts">
    import type { Repo } from './repo';
    import { Cell } from '@smui/layout-grid';

    export let repo: Repo;
    const { full_name, description, html_url: href } = repo;
    const [user, name] = full_name.split('/');
</script>


<Cell class="mdc-elevation--z24">
    <a {href} target="_blank"><span class="user">{user}/</span>{name}</a>
    <div>{description}</div>
</Cell>

<style lang="sass">
    @use '../colors' as *
    .user
        color: $dark
</style>

