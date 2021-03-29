<script>
    import Button from '../components/Button.svelte'
        let menus = [
		{ href: '#/list/', name: 'List' },
		{ href: '#/lvm_list', name: 'About' },
        // { href: '#/', name: 'Docker' },
        { href: '#/does/not/exist', name: 'Not found' }
	];
</script>

<div id="main">
    <div class="menu-grid">
        {#each menus as { href, name }}
            <Button href={href} name={name}/>
        {/each}
    </div>
</div>
    





<style>

    /* #main {
        background-color: black;
        background: url("bg.svg") no-repeat;
        background-size: cover;
        padding-bottom: 500px; 
    } */

   
    .menu-grid {
    display: grid;
    justify-content: space-around;
    grid-gap: 150px 50px;
    grid-template-columns: 200px 200px;
    /* background-color: #2196F3; */
    padding: 20px;
    }

</style>