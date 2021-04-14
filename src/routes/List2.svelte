<script>
    import { info, formPath } from '../stores.js';
    import Button from '../components/Button.svelte';
    import Navbar from "../components/Navbar.svelte";
    import Card from "../components/Card.svelte";
    
    export let params = {};
    
    let path = params.wild;
    
    if (!path) {
        path = "";
    }
    
    console.log(path);
    console.log("etest");

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

    let data = getList(path);


    // function handleClick(dir) {
    //     path = path + "/" + dir;
	// 	data = getList(path);
	// }

    function handleSubmit(itemList) {
        formPath.set(path);
        setInfo(itemList);
    }

    function setInfo(itemList) {
        console.log(path);
        // console.log(itemList);
        info.set(itemList);
        // console.log($info);
    }
</script>

<Navbar/>

{#await data}
    <p>Fetching Data...</p>

{:then data}

    {#if data.hasDirectories}
        <!-- <div class="options-grid"> -->
            {#each data.list as item, color (item)}
                <!-- <a href={"#/list2/" + path + "/" + item.directory}>
                    {item.key}
                </a> -->
                <Card
                    name={item.key}
                    description={item.description} 
                    href={"#/list1/" + path + "/" + item.directory} 
                    color={color+1}
                />
            {/each}
        <!-- </div> -->
    {:else}
        <!-- <div class="options-grid"> -->
            {#each data.list as item (item)}
                <button on:click={() => handleSubmit(item, path)}>
                    <Button href="#/form/" name={item.key}/>
                </button>
            {/each}
        <!-- </div> -->
    {/if}

{:catch error}
	<p style="color: yellow">{error.message}</p>
{/await}

<!-- <style>

    .options-grid {
    margin: auto;
    display: grid;
    justify-content: space-around;
    grid-gap: 75px 75px;
    grid-template-columns: 175px 175px 175px 175px 175px  ;
    /* background-color: #2196F3; */
    padding: 20px;
    }
</style> -->