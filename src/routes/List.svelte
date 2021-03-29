<script>

    import { info, path } from '../stores.js';

    import Button from '../components/Button.svelte';
    console.log("Hello");
    export let params = {};
    console.log(params);
    
    path.set(params.wild);
    
    if (!params.wild)
        path.set("");
    
    console.log($path);
    async function getList(path) {
        // console.log(path);
        const data = {
            "directory": path
        }
        console.log(data);
        let resp = await fetch(
            'http://192.168.93.128/cgi-bin/list.py', 
            {
                method: 'POST',
                body: JSON.stringify(data)
            }
        );
        let output = await resp.text();
        output = JSON.parse(output);
        return output;
    }

    let data = getList($path);
    // data.then(console.log(value));


    function handleClick(dir) {
        path.update( path => path + "/" + dir);
		data = getList($path);
	}

    function handleSubmit(itemList, dir) {
        // path.update( path => path);
        setInfo(itemList);
    }

    function setInfo(itemList) {
        console.log($path);
        // console.log(itemList);
        info.set(itemList);
        // console.log($info);
    }
</script>

<p>List</p>


{#await data}
    <p>Fetching Data...</p>

{:then data}

    {#if data.hasDirectories}
        <div class="options-grid">
            {#each data.list as item (item)}
                <button on:click={() => handleClick(item.directory)}>
                    {item.key}
                </button>
            {/each}
        </div>
    {:else}
        <div class="options-grid">
            {#each data.list as item (item)}
                <button on:click={() => handleSubmit(item)}>
                    <Button href="#/form/" name={item.key}/>
                </button>
            {/each}
        </div>
    {/if}

{:catch error}
	<p style="color: yellow">{error.message}</p>
{/await}

<style>
    .options-grid {
    margin: auto;
    display: grid;
    justify-content: space-around;
    grid-gap: 75px 75px;
    grid-template-columns: 175px 175px 175px 175px 175px  ;
    /* background-color: #2196F3; */
    padding: 20px;
    }
</style>