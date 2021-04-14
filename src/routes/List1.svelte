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
        filters = output.list;
        return output;
    }

    let filters;

    let data = getList(path);

    function handleSubmit(itemList, path) {
        formPath.set(path);
        setInfo(itemList);
    }

    function setInfo(itemList) {
        console.log(path);
        info.set(itemList);
    }

    // Filters

    let currentFilter="All";

    function updateFilter(list, filter) {
        console.log(filter);
        currentFilter = filter;
        if (filter === 'All')
            filters = list;
        else
            filters = list.filter((data) => data.group === filter);
    }

    // data.then(val => {
    //     // console.log(val);
    //     filters = val.groups;
    // });

</script>

<Navbar/>

<!-- {#if path === ""}
    <div class="main">
        <Navbar/>
        <Hero/>
    </div>

    <Card/>
{/if} -->


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
                    href={"#/list2/" + path + "/" + item.directory} 
                    color={color+1}
                />
            {/each}
        <!-- </div> -->
    {:else}
        <!-- <div class="options-grid"> -->
            {#each data.groups as group (group)}
                <!-- <button on:click={() => handleSubmit(item, path)}>
                    <Button href="#/form/" name={item.key}/>
                </button> -->
                <!-- class="filter {group}" -->
                <button class="btn" class:active={currentFilter === group} on:click={() => updateFilter(data.list, group)}>
                    {group}
                </button>
            {/each}
            <!-- {filters}
            {currentFilter} -->
            <!-- {filters} -->

            {#each filters as item (item)}
                <button on:click={() => handleSubmit(item, path)}>
                    <Button href="#/form/" name={item.key}/>
                </button>
            {/each}
            

            <!-- {#each data.list as item (item)}
                <button on:click={() => handleSubmit(item, path)}>
                    <Button href="#/form/" name={item.key}/>
                </button>
            {/each} -->
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